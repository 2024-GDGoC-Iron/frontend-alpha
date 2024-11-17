import React, { useState, useRef, useEffect } from 'react';
import { Web_Socket_Key } from '../config';
import Title from '../components/Title';
import style from '../styles/modules/ContactProp.module.css';

const ContactProp = () => {
    const [messages, setMessages] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const chatMessagesRef = useRef(null);
    const ws = useRef(null);

    // WebSocket 연결 설정
    useEffect(() => {
        // 초기 메시지 설정
        setMessages([{
            id: 1,
            sender: '잇픽',
            text: '저와 함께 채팅을 시작해요!',
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            sentByUser: false,
        }]);

        // WebSocket 연결
        ws.current = new WebSocket(Web_Socket_Key);

        // WebSocket 이벤트 리스너 설정
        ws.current.onopen = () => {
            console.log('WebSocket Connected');
        };

        ws.current.onmessage = (event) => {
            console.log('Raw message received:', event.data);
            try {
                if (!event.data) return;

                const response = JSON.parse(event.data);
                console.log('Parsed message:', response);

                // AI 응답 메시지 추가
                if (response && response.message) {
                    const newMessage = {
                        id: Date.now(),
                        sender: '잇픽',
                        text: response.message.replace(/\n/g, '<br/>'),
                        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                        sentByUser: false,
                    };
                    setMessages(prev => [...prev, newMessage]);
                } else {
                    const newMessage = {
                        id: Date.now(),
                        sender: '잇픽',
                        text: "알빠노",
                        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                        sentByUser: false,
                    };
                    setMessages(prev => [...prev, newMessage]);
                }
            } catch (error) {
                console.error('Error handling message:', error);
                console.log('Problematic message data:', event.data);
            }
        };

        ws.current.onerror = (error) => {
            console.error('WebSocket Error:', error);
        };

        ws.current.onclose = (event) => {
            console.log('WebSocket Closed:', event);
        };

        // Cleanup
        return () => {
            if (ws.current) {
                ws.current.close();
            }
        };
    }, []);

    // 스크롤 효과
    useEffect(() => {
        if (chatMessagesRef.current) {
            chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
        }
    }, [messages]);

    // 메시지 전송 함수
    const sendMessage = () => {
        if (!inputValue.trim() || !ws.current) return;

        try {
            // 사용자 메시지 추가
            const newMessage = {
                id: Date.now(),
                sender: 'You',
                text: inputValue,
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                sentByUser: true,
            };
            setMessages(prev => [...prev, newMessage]);

            // WebSocket으로 메시지 전송
            if (ws.current.readyState === WebSocket.OPEN) {
                const messageData = {
                    action: "sendMessage",  // API Gateway에서 요구하는 action 필드 추가
                    sessionId: `session_${Date.now()}`,
                    userId: `user_${Date.now()}`,
                    message: inputValue
                };
                console.log('Sending message:', messageData);
                ws.current.send(JSON.stringify(messageData));
                setInputValue('');
            } else {
                console.error('WebSocket not ready. Current state:', ws.current.readyState);
            }
        } catch (error) {
            console.error('Error in sendMessage:', error);
        }
    };

    return (
        <div className={style.ContactProp}>
            <Title text={"교수님에 대해 인픽과 대화하세요"} />
            <div className={style.chatMessages} ref={chatMessagesRef}>
                {messages.map((msg) => (
                    <div
                        key={msg.id}
                        className={`${style.messageBubble} ${msg.sentByUser ? style.sent : style.received}`}
                    >
                        <div className={style.senderName}>
                            {!msg.sentByUser ? msg.sender : ''}
                        </div>
                        <div
                            className={style.messageText}
                            dangerouslySetInnerHTML={{ __html: msg.text }} // Rendering with HTML
                        ></div>
                        <div className={style.messageTime}>{msg.time}</div>
                    </div>
                ))}
            </div>
            <div className={style.chatInput}>
                <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                    placeholder="메시지를 입력하세요..."
                />
                <div onClick={sendMessage}>
                    전송
                </div>
            </div>
        </div>
    );
};

export default ContactProp;
