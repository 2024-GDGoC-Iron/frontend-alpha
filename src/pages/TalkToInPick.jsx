import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage } from '../components/chat/MessageBubble';
import { ChatInput } from '../components/chat/ChatInput';
import { Modal } from '../components/common/Modal';
import { ProfessorMatchCard } from '../components/dashboard/ProfessorMatchCard';
import { ChatSummaryCard } from '../components/dashboard/ChatSummaryCard'; 
import { useWebSocket } from '../hooks/useWebSocket';
import { Web_Socket_Key, Chat_Analyze_URL } from '../config';

const TalkToInPick = () => {
  const [messages, setMessages] = useState([
    { 
      id: Date.now(),
      text: "안녕하세요! 저는 진로와 관련된 모든 고민을 상담해드리는 IN!PICK AI입니다. 어떤 진로나 직무에 관심이 있으신가요?", 
      time: new Date().toLocaleTimeString('ko-KR', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
      }),  
      isUser: false 
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [showMatchModal, setShowMatchModal] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState(null);
  const [retryAttempts, setRetryAttempts] = useState(0);
  const MAX_RETRY_ATTEMPTS = 3;
  const messagesEndRef = useRef(null);
  
  const [sessionId] = useState(`session_${Date.now()}`);
  const [userId] = useState('user_' + Math.random().toString(36).substr(2, 9));
  
  const { socket, isConnected, sendMessage, reconnect } = useWebSocket(
    `${Web_Socket_Key}?userId=${userId}&sessionId=${sessionId}`
  );

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleError = (errorMessage, shouldRetry = true) => {
    setError(errorMessage);
    
    if (shouldRetry && retryAttempts < MAX_RETRY_ATTEMPTS) {
      setRetryAttempts(prev => prev + 1);
      reconnect();
    } else if (retryAttempts >= MAX_RETRY_ATTEMPTS) {
      setError('연결 재시도 횟수를 초과했습니다. 페이지를 새로고침해주세요.');
      setIsAnalyzing(false);
    }
  };

  const handleSend = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    
    if (!isConnected) {
      handleError('연결이 끊어졌습니다. 재연결을 시도합니다.');
      return;
    }

    try {
      const userMessage = {
        id: Date.now(),
        text: inputText,
        time: new Date().toLocaleTimeString('ko-KR', {
          hour: '2-digit',
          minute: '2-digit',
          hour12: false
        }),
        isUser: true
      };

      setMessages(prev => [...prev, userMessage]);
      setInputText('');
      setError(null);

      sendMessage({
        action: 'sendMessage',
        sessionId,
        userId,
        message: inputText
      });
    } catch (error) {
      handleError('메시지 전송 중 오류가 발생했습니다.');
    }
  };

  useEffect(() => {
    if (!socket) return;

    socket.onmessage = (event) => {
      if (!event.data) {
        handleError('빈 메시지가 수신되었습니다.', false);
        return;
      }

      try {
        const response = JSON.parse(event.data);
        console.log('Received WebSocket message:', response);

        if (response.type === 'message' && response.data?.message) {
          const aiMessage = {
            id: Date.now(),
            text: response.data.message,
            time: new Date(response.data.timestamp).toLocaleTimeString('ko-KR', {
              hour: '2-digit',
              minute: '2-digit',
              hour12: false
            }),
            isUser: false
          };
          
          setMessages(prev => [...prev, aiMessage]);
          setError(null);
        } 
        else if (response.type === 'analysis-complete' && response.data) {
          setAnalysisResult(response.data);
          setIsAnalyzing(false);
          setError(null);
        }
        else if (response.type === 'error') {
          handleError(response.data?.message || '서버 오류가 발생했습니다.');
        }
      } catch (error) {
        handleError('메시지 처리 중 오류가 발생했습니다.');
      }
    };

    socket.onerror = (error) => {
      handleError('웹소켓 연결 오류가 발생했습니다.');
    };

    socket.onclose = () => {
      handleError('연결이 종료되었습니다. 재연결을 시도합니다.');
    };
  }, [socket]);

  const handleEndChat = async () => {
    try {
      setIsAnalyzing(true);
      setShowMatchModal(true);
      setError(null);

      const response = await fetch(Chat_Analyze_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          sessionId,
          connectionId: socket?.id
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log(data);

    } catch (error) {
      handleError('분석 요청 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.', false);
      setShowMatchModal(false);
    }
  };

  // Error message component
  const ErrorMessage = ({ message }) => (
    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative mb-4">
      <strong className="font-bold">오류 발생: </strong>
      <span className="block sm:inline">{message}</span>
    </div>
  );

  return (
    <div className="flex flex-col min-h-[calc(100vh-136px)]">
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="relative bg-white rounded-[32px] shadow-lg h-[calc(100vh-200px)] flex flex-col">
          {/* 채팅 제목 & 연결 상태 */}
          <div className="flex justify-between items-center px-8 py-6 border-b">
            <h1 className="text-2xl font-bold">
              <span className="text-[#4B9FD6]">진로 상담</span>에 대해 인픽과 대화하세요
            </h1>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`} />
                <span className="text-sm text-gray-500">
                  {isConnected ? '연결됨' : '연결 끊김'}
                </span>
              </div>
              <button
                onClick={handleEndChat}
                disabled={isAnalyzing || !isConnected}
                className={`text-gray-400 hover:text-gray-600 px-4 py-2 ${(isAnalyzing || !isConnected) ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {isAnalyzing ? '분석중...' : '종료하기'}
              </button>
            </div>
          </div>

          {/* 에러 메시지 표시 */}
          {error && (
            <div className="px-8 mt-4">
              <ErrorMessage message={error} />
            </div>
          )}

          {/* 채팅 메시지 영역 */}
          <div className="flex-1 overflow-y-auto px-8 py-6 space-y-6">
            {messages.map((message) => (
              <ChatMessage 
                key={message.id} 
                message={message} 
                isUser={message.isUser}
              />
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* 입력 영역 */}
          <div className="p-6 border-t">
            <ChatInput
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onSubmit={handleSend}
              disabled={!isConnected || isAnalyzing}
              placeholder={!isConnected ? "연결 중입니다..." : "메시지를 입력하세요"}
            />
          </div>
        </div>
      </main>

      {/* 매칭 결과 모달 */}
      <Modal 
        isOpen={showMatchModal} 
        onClose={() => !isAnalyzing && setShowMatchModal(false)}
      >
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">⚡ 상담 분석 결과</h2>
            <button 
              onClick={() => !isAnalyzing && setShowMatchModal(false)}
              className={`text-gray-500 hover:text-gray-700 ${isAnalyzing ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={isAnalyzing}
            >
              닫기
            </button>
          </div>

          <div className="space-y-6">
            {/* 모달 내 에러 메시지 */}
            {error && <ErrorMessage message={error} />}

            {isAnalyzing ? (
              <div className="text-center py-8">
                <p className="text-lg text-gray-600">분석 중입니다...</p>
              </div>
            ) : analysisResult ? (
              <>
                <div className="mb-8">
                  <h3 className="text-lg font-semibold mb-4">💬 상담 내용 분석</h3>
                  <ChatSummaryCard 
                    chat={{
                      professorImage: "/api/placeholder/40/40",
                      professorName: "상담 분석 결과",
                      department: analysisResult.analysis?.academic?.major || "전공 정보 없음",
                      date: new Date().toLocaleDateString(),
                      summary: analysisResult.analysis?.overallAnalysis || "분석 결과가 없습니다."
                    }}
                  />
                </div>

                {analysisResult.match && (
                  <div>
                    <h3 className="text-lg font-semibold mb-4">🎯 추천 교수님</h3>
                    <div className="space-y-4">
                      <ProfessorMatchCard
                        professor={{
                          id: analysisResult.match.professorId,
                          name: analysisResult.match.name,
                          department: analysisResult.match.department,
                          period: "2024.03 - 2024.06",
                          availability: true,
                          matchScore: analysisResult.match.matchScore || 95,
                          image: "/api/placeholder/80/80",
                          researchAreas: analysisResult.match.researchAreas || []
                        }}
                        onSelect={() => setShowMatchModal(false)}
                      />
                    </div>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-8">
                <p className="text-lg text-gray-600">분석 결과를 불러올 수 없습니다.</p>
              </div>
            )}

            <div className="flex justify-end gap-4 mt-8 pt-4 border-t">
              <button 
                className={`px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg ${isAnalyzing ? 'opacity-50 cursor-not-allowed' : ''}`}
                onClick={() => !isAnalyzing && setShowMatchModal(false)}
                disabled={isAnalyzing}
              >
                계속 상담하기
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default TalkToInPick;