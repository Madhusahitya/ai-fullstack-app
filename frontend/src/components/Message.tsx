import React from 'react';

export type MessageType = 'user' | 'ai';

interface MessageProps {
  type: MessageType;
  content: string;
  timestamp?: Date;
}

const Message: React.FC<MessageProps> = ({ type, content, timestamp }) => {
  const isUser = type === 'user';
  
  return (
    <div className={`flex w-full ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
      <div 
        className={`max-w-[80%] rounded-lg px-4 py-3 ${
          isUser 
            ? 'bg-primary-600 text-white rounded-br-none' 
            : 'bg-gray-200 text-gray-800 rounded-bl-none'
        }`}
      >
        <div className="whitespace-pre-wrap">{content}</div>
        {timestamp && (
          <div className={`text-xs mt-1 ${isUser ? 'text-primary-100' : 'text-gray-500'}`}>
            {timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Message;
