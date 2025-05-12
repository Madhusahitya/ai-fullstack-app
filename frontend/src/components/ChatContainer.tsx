import React, { useEffect, useRef } from 'react';
import Message, { MessageType } from './Message';

export interface ChatMessage {
  id: string;
  type: MessageType;
  content: string;
  timestamp: Date;
}

interface ChatContainerProps {
  messages: ChatMessage[];
  isLoading: boolean;
}

const ChatContainer: React.FC<ChatContainerProps> = ({ messages, isLoading }) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="flex-1 overflow-y-auto p-4">
      {messages.length === 0 ? (
        <div className="flex h-full items-center justify-center">
          <div className="text-center text-gray-500">
            <h2 className="mb-2 text-xl font-semibold">Welcome to AI Chat</h2>
            <p>Start a conversation by typing a message below.</p>
          </div>
        </div>
      ) : (
        <>
          {messages.map((message) => (
            <Message
              key={message.id}
              type={message.type}
              content={message.content}
              timestamp={message.timestamp}
            />
          ))}
          {isLoading && (
            <div className="flex justify-start mb-4">
              <div className="bg-gray-200 text-gray-800 rounded-lg rounded-bl-none px-4 py-3">
                <div className="flex space-x-2">
                  <div className="h-2 w-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0ms' }}></div>
                  <div className="h-2 w-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '300ms' }}></div>
                  <div className="h-2 w-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '600ms' }}></div>
                </div>
              </div>
            </div>
          )}
        </>
      )}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default ChatContainer;
