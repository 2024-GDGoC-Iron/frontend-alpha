import React, { useState, useEffect, useRef } from 'react';
import Title from '../components/Title';
import style from '../styles/modules/ContactProp.module.css';

const ContactProp = () => {
    const initialMessages = [
        { id: 1, sender: '잇픽', text: '저와 함께 채팅을 시작해요!', time: 'just now', sentByUser: false, read: true },
    ];

    const [messages, setMessages] = useState(initialMessages);
    const [inputValue, setInputValue] = useState('');

    const chatMessagesRef = useRef(null); // Ref for the chat container

    // Scroll to the bottom whenever messages change
    useEffect(() => {
        if (chatMessagesRef.current) {
            chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
        }
    }, [messages]);

    const handleSendMessage = async () => {
        if (inputValue.trim() !== '') {
            // Create the new message object
            const newMessage = {
                id: messages.length + 1,
                sender: 'You',
                text: inputValue,
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                sentByUser: true,
                read: false, // New message is read by default
            };

            // Update messages with the new user message
            setMessages((prevMessages) => [...prevMessages, newMessage]);

            // Send the message to the backend asynchronously
            try {
                // Make a POST request to your backend with the message as JSON
                const response = await fetch('https://your-backend-api-url.com/message', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        text: inputValue,
                    }),
                });

                if (response.ok) {
                    const data = await response.json();

                    // Assuming the backend sends a message response
                    const receivedMessage = {
                        id: messages.length + 2, // Increment ID for new message
                        sender: '잇픽', // or another name based on your backend response
                        text: data.response, // Response message from backend
                        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                        sentByUser: false,
                        read: true, // Backend message is read by default
                    };

                    // Update the messages with the backend response
                    setMessages((prevMessages) => [...prevMessages, receivedMessage]);
                } else {
                    // Handle the case when the response status is not OK
                    const errorMessage = {
                        id: messages.length + 2,
                        sender: '잇픽',
                        text: '죄송합니다. 서버에서 오류가 발생했습니다. 다시 시도해주세요.',
                        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                        sentByUser: false,
                        read: true,
                    };
                    setMessages((prevMessages) => [...prevMessages, errorMessage]);
                }
            } catch (error) {
                console.error('Error sending message:', error);

                // Send an error message to the chat if there's an error in the request
                const errorMessage = {
                    id: messages.length + 2,
                    sender: '잇픽',
                    text: '죄송합니다. 서버에 연결할 수 없습니다. 나중에 다시 시도해주세요.',
                    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                    sentByUser: false,
                    read: true,
                };

                setMessages((prevMessages) => [...prevMessages, errorMessage]);
            }

            // Clear the input field
            setInputValue('');
        }
    };

    const toggleReadStatus = (id) => {
        setMessages((prevMessages) =>
            prevMessages.map((message) =>
                message.id === id && !message.sentByUser // Only toggle read for messages sent by opponent
                    ? { ...message, read: true }
                    : message
            )
        );
    };

    return (
        <div className={style.ContactProp}>
            <Title text={"교수님에 대해 인픽과 대화하세요"} />
            <div className={style.chatMessages} ref={chatMessagesRef}>
                {messages.map((msg) => (
                    <div
                        key={msg.id}
                        className={`${style.messageBubble} ${msg.sentByUser ? style.sent : style.received} ${msg.read ? style.read : style.unread}`}
                        onClick={() => msg.sentByUser ? null : toggleReadStatus(msg.id)} // Only allow the opponent's messages to be marked as read
                    >
                        <div className={style.senderName}>{!msg.sentByUser ? `${msg.sender}` : ''}</div>
                        <span className={style.messageText}>{msg.text}</span>
                        <div className={style.messageFooter}>
                            <span className={style.messageTime}>{msg.time}</span>
                            {msg.sentByUser && (
                                <span className={`${style.readStatus} ${msg.read ? style.read : style.unread}`}>
                                    {msg.read ? 'Read' : 'Unread'}
                                </span>
                            )}
                        </div>
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

export default ContactProp;
