import React, { useState, useEffect } from 'react';
import { MessageSquare, X, Minimize2, Bot } from 'lucide-react';

/**
 * Demo conversation flow for the chat preview
 * Each message includes:
 * @property type - 'bot' or 'user' to determine message styling
 * @property text - The actual message content
 */
const messages = [
  { type: 'bot', text: "👋 Hi! I'm your AI assistant. How can I help you today?" },
  { type: 'user', text: "I'm interested in the AI voice assistant." },
  { type: 'bot', text: "Great choice! Our AI voice assistant can handle calls 24/7, qualify leads, and book appointments automatically. Would you like to see a quick demo?" },
  { type: 'user', text: "Yes, please!" },
  { type: 'bot', text: "I'll schedule a personalized demo for you. What's the best time for a 15-minute call this week?" }
];

/**
 * ChatPreview Component
 * Floating chat widget that demonstrates AI conversation capabilities
 * Features:
 * - Animated message sequence
 * - Minimize/maximize functionality
 * - Mobile-responsive design
 */
export function ChatPreview() {
  // State for chat visibility and animation
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [currentMessage, setCurrentMessage] = useState(0);

  useEffect(() => {
    if (isOpen && currentMessage < messages.length - 1) {
      const timer = setTimeout(() => {
        setCurrentMessage(prev => prev + 1);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isOpen, currentMessage]);

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-8 right-8 bg-indigo-600 text-white p-4 rounded-full shadow-lg shadow-indigo-600/20 hover:bg-indigo-700 transition-all duration-300 hover:scale-110 z-40"
      >
        <MessageSquare className="h-6 w-6" />
      </button>
    );
  }

  return (
    <div
      className={`fixed bottom-8 right-8 w-96 bg-white rounded-2xl shadow-2xl border border-indigo-100 overflow-hidden z-40 transition-all duration-300 ${
        isMinimized ? 'h-16' : 'h-[500px]'
      }`}
    >
      <div className="bg-indigo-600 p-4 flex items-center justify-between">
        <div className="flex items-center gap-2 text-white">
          <Bot className="h-5 w-5" />
          <span className="font-medium">AI Assistant</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsMinimized(!isMinimized)}
            className="text-white/80 hover:text-white transition-colors"
          >
            <Minimize2 className="h-5 w-5" />
          </button>
          <button
            onClick={() => setIsOpen(false)}
            className="text-white/80 hover:text-white transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      </div>

      {!isMinimized && (
        <>
          <div className="h-[380px] overflow-y-auto p-4 space-y-4">
            {messages.slice(0, currentMessage + 1).map((message, idx) => (
              <div
                key={idx}
                className={`flex ${
                  message.type === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-2xl ${
                    message.type === 'user'
                      ? 'bg-indigo-600 text-white'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  {message.text}
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 border-t">
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Type your message..."
                className="flex-1 px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:border-indigo-300"
              />
              <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
                Send
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}