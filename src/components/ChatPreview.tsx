// components/ChatPreview.tsx

import React, { useState } from 'react';

export function ChatPreview() {
  const [messages, setMessages] = useState([
    { type: 'bot', text: "👋 Hi! I'm your AI assistant. Ask me anything about marketing, lead gen, or AI voice tools." },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { type: 'user', text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    try {
      const res = await fetch('/.netlify/functions/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input }),
      });

      const data = await res.json();
      const reply = data.reply || "Hmm, I didn’t quite catch that.";

      setMessages((prev) => [...prev, { type: 'bot', text: reply }]);
    } catch (err) {
      console.error('AI chat error:', err);
      setMessages((prev) => [
        ...prev,
        { type: 'bot', text: 'Uh oh, something went wrong. Please try again!' },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSend();
  };

  return (
    <div className="mt-12 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 text-white max-w-3xl mx-auto shadow-2xl">
      <h2 className="text-2xl font-bold mb-6">Try Our Chatbot Demo</h2>

      <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 space-y-4 max-h-[400px] overflow-y-auto">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[75%] p-3 rounded-2xl ${
                msg.type === 'user'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-white/20 text-white'
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex justify-start">
            <div className="max-w-[75%] p-3 rounded-2xl bg-white/20 text-white animate-pulse">
              Typing...
            </div>
          </div>
        )}
      </div>

      <div className="mt-6 flex gap-2">
        <input
          type="text"
          placeholder="Type your question..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 px-4 py-2 rounded-lg border border-white/30 bg-white/10 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white"
        />
        <button
          onClick={handleSend}
          className="px-6 py-2 bg-white text-indigo-700 font-bold rounded-lg hover:bg-gray-100 transition-colors"
        >
          Send
        </button>
      </div>

      <p className="mt-3 text-sm text-white/70 text-center">
        Ask the bot anything — it’s powered by real AI 💬
      </p>
    </div>
  );
}
