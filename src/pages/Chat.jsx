import React, { useState } from 'react';
import style from '../styles/modules/Chat.module.css'; // Ensure this is the correct path

const Chat = () => {
    const initialMessages = [
        { id: 1, sender: 'You', text: '필요한 정보 입력', time: '11:31 AM', sentByUser: true },
        { id: 2, sender: 'You', text: 'Anyone on for lunch today', time: '11:31 AM', sentByUser: true },
        { id: 3, sender: 'Jav', text: '결과 분석중...', time: '11:35 AM', sentByUser: false },
    ];

    const [messages, setMessages] = useState(initialMessages);
    const [inputValue, setInputValue] = useState('');

    const handleSendMessage = () => {
        if (inputValue.trim() !== '') {
            const newMessage = {
                id: messages.length + 1,
                sender: 'You',
                text: inputValue,
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                sentByUser: true,
            };
            setMessages([...messages, newMessage]);
            setInputValue('');
        }
    };

    return (
        <div className={style.Chat}>
            <div className={style.chatHeader}>교수님에 대해 인픽과 대화하세요</div>
            <div className={style.chatMessages}>
                {messages.map((msg) => (
                    <div
                        key={msg.id}
                        className={`${style.messageBubble} ${msg.sentByUser ? style.sent : style.received}`}
                    >
                        <div className={style.senderName}>{!msg.sentByUser ? `${msg.sender} | Engineering` : ''}</div>
                        <span className={style.messageText}>{msg.text}</span>
                        <span className={style.messageTime}>{msg.time}</span>
                    </div>
                ))}
            </div>
            <div className={style.chatInput}>
                <input
                    type="text"
                    placeholder="Type a message..."
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                />
                <div onClick={handleSendMessage}>Send</div>
            </div>
        </div>
    );
};

export default Chat;
