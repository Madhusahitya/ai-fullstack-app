import React, { useState, KeyboardEvent } from 'react';
import { PaperAirplaneIcon } from '@heroicons/react/24/solid';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  isLoading: boolean;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, isLoading }) => {
  const [message, setMessage] = useState('');

  const handleSubmit = () => {
    if (message.trim() && !isLoading) {
      onSendMessage(message);
      setMessage('');
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="border-t border-gray-200 bg-white p-4">
      <div className="flex items-end space-x-2">
        <textarea
          className="flex-1 resize-none rounded-lg border border-gray-300 p-3 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-200"
          placeholder="Type your message here..."
          rows={1}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={isLoading}
        />
        <button
          className={`rounded-full bg-primary-600 p-2 text-white transition-colors ${
            isLoading || !message.trim() 
              ? 'cursor-not-allowed opacity-50' 
              : 'hover:bg-primary-700'
          }`}
          onClick={handleSubmit}
          disabled={isLoading || !message.trim()}
        >
          <PaperAirplaneIcon className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};

export default ChatInput;
