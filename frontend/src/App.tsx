import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import './App.css';
import axios from 'axios';

// Define types
interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
}

interface QueryResponse {
  response: string;
}

function App() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isBackendConnected, setIsBackendConnected] = useState(false);

  // Check backend health on component mount
  useEffect(() => {
    const checkBackendHealth = async () => {
      try {
        await axios.get('http://localhost:8000/health');
        setIsBackendConnected(true);
      } catch (err) {
        setError('Could not connect to the backend server. Please make sure it is running.');
        setIsBackendConnected(false);
      }
    };

    checkBackendHealth();
  }, []);

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    // Create and add user message
    const userMessage: Message = {
      id: uuidv4(),
      type: 'user',
      content: inputValue,
      timestamp: new Date(),
    };

    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setIsLoading(true);
    setError(null);
    setInputValue('');

    try {
      // Send query to backend
      const response = await axios.post<QueryResponse>(
        'http://localhost:8000/query',
        { query: userMessage.content }
      );

      // Create and add AI response message
      const aiMessage: Message = {
        id: uuidv4(),
        type: 'ai',
        content: response.data.response,
        timestamp: new Date(),
      };

      setMessages((prevMessages) => [...prevMessages, aiMessage]);
    } catch (err) {
      setError('Failed to get a response from the AI. Please try again.');
      console.error('Error getting AI response:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>AI Chat Assistant</h1>
        <p>Ask me anything and I'll do my best to help you</p>
      </header>

      <div className="chat-container">
        {error && (
          <div className="error-message">
            <p>{error}</p>
            <button onClick={() => setError(null)}>✕</button>
          </div>
        )}

        {!isBackendConnected && (
          <div className="warning-message">
            <p>
              ⚠️ Backend connection failed. Make sure the backend server is running at http://localhost:8000
            </p>
          </div>
        )}

        <div className="messages-container">
          {messages.length === 0 ? (
            <div className="welcome-message">
              <h2>Welcome to AI Chat</h2>
              <p>Start a conversation by typing a message below.</p>
            </div>
          ) : (
            messages.map((message) => (
              <div
                key={message.id}
                className={`message ${message.type === 'user' ? 'user-message' : 'ai-message'}`}
              >
                <div className="message-content">{message.content}</div>
                <div className="message-timestamp">
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            ))
          )}

          {isLoading && (
            <div className="message ai-message">
              <div className="loading-indicator">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          )}
        </div>

        <div className="input-container">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your message here..."
            disabled={isLoading}
          />
          <button
            onClick={handleSendMessage}
            disabled={isLoading || !inputValue.trim()}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
