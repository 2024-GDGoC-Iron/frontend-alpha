// src/components/chat/MessageBubble.jsx
import React from 'react';

export const ChatMessage = ({ message, isUser }) => {
  const { text, time } = message;
  
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} items-start gap-3 mb-4`}>
      {!isUser && (
        <div className="flex-shrink-0">
          <img
            src="/api/placeholder/40/40"
            alt="IN!PICK AI"
            className="w-10 h-10 rounded-full"
          />
        </div>
      )}
      
      <div className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}>
        {!isUser && (
          <div className="text-sm font-semibold mb-1 text-gray-700">
            IN!PICK AI
          </div>
        )}
        
        <div className="flex flex-col gap-1">
          <div 
            className={`rounded-2xl px-4 py-2 max-w-xl ${
              isUser 
                ? 'bg-[#4461F2] text-white rounded-tr-none' 
                : 'bg-[#F8F9FB] text-gray-900 rounded-tl-none'
            }`}
          >
            {text}
          </div>
          <div className={`text-xs text-gray-400 ${isUser ? 'text-right' : 'text-left'}`}>
            {time || new Date().toLocaleTimeString('ko-KR', {
              hour: '2-digit',
              minute: '2-digit',
              hour12: false
            })}
          </div>
        </div>
      </div>
    </div>
  );
};