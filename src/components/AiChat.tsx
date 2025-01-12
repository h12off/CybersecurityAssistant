'use client';

import { useEffect, useState } from 'react';

declare global {
  interface Window {
    puter: {
      ai: {
        chat: (prompt: string) => Promise<string>;
      };
      print: (text: string) => void;
    };
  }
}

export function AiChat() {
  const [response, setResponse] = useState<string>('');

  useEffect(() => {
    // Load Puter AI script
    const script = document.createElement('script');
    script.src = 'https://js.puter.com/v2/';
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      // Initialize chat when script loads
      window.puter.ai.chat("How can I help you with cybersecurity today?")
        .then(initialResponse => {
          setResponse(initialResponse);
        })
        .catch(error => {
          console.error('Error initializing AI chat:', error);
        });
    };

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="ai-chat-container">
      <div className="response-container">
        {response && (
          <p className="response-text">{response}</p>
        )}
      </div>
      <style jsx>{`
        .ai-chat-container {
          padding: 1rem;
          background: rgba(0, 255, 0, 0.1);
          border: 1px solid #00ff00;
          border-radius: 4px;
          margin: 1rem;
        }
        .response-container {
          min-height: 100px;
        }
        .response-text {
          color: #00ff00;
          font-family: monospace;
          white-space: pre-wrap;
        }
      `}</style>
    </div>
  );
}
