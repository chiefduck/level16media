import React, { useState, useEffect, useRef } from 'react';

export function ChatPreview() {
  const [messages, setMessages] = useState([
    { type: 'bot', text: "👋 Hi! I'm your AI assistant. Ask me anything about marketing, lead gen, or AI voice tools." },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [threadId, setThreadId] = useState<string | null>(null);
  const [isInAssistantMode, setIsInAssistantMode] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const triggerWords = ['yes', 'interested', 'book', 'try it', 'let\'s do it', 'sounds good', 'demo'];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { type: 'user', text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    const messageText = input.toLowerCase();

    // Check for trigger words
    const shouldSwitch = triggerWords.some((word) => messageText.includes(word));

    if (!isInAssistantMode && shouldSwitch) {
      console.log('🧠 Switching to Assistant API...');
      setIsInAssistantMode(true);
      await handleAssistant(input);
    } else if (isInAssistantMode) {
      await handleAssistant(input);
    } else {
      await handleFastGPT(input);
    }

    setIsTyping(false);
  };

  const handleFastGPT = async (msg: string) => {
    try {
      const res = await fetch('/.netlify/functions/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: msg }),
      });

      const data = await res.json();
      const reply = data.reply || "Hmm, I didn’t quite catch that.";
      setMessages((prev) => [...prev, { type: 'bot', text: reply }]);
    } catch (err) {
      console.error('GPT Error:', err);
      setMessages((prev) => [...prev, { type: 'bot', text: 'Something went wrong. Try again later.' }]);
    }
  };

  const handleAssistant = async (msg: string) => {
    try {
      // Step 1: Start assistant run
      const start = await fetch('/.netlify/functions/start-assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: msg, thread_id: threadId }),
      });

      const { thread_id, run_id } = await start.json();
      if (thread_id && !threadId) setThreadId(thread_id);

      // Step 2: Poll for result
      let status = 'queued';
      let reply = '';
      let retries = 0;

      while (status !== 'completed' && retries < 30) {
        await new Promise((res) => setTimeout(res, 1000));
        retries++;

        const check = await fetch('/.netlify/functions/check-assistant', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ thread_id, run_id }),
        });

        const result = await check.json();
        status = result.status;
        if (result.reply) {
          reply = result.reply;
          break;
        }
      }

      setMessages((prev) => [...prev, { type: 'bot', text: reply || '⚠️ Sorry, that took too long — try again.' }]);
    } catch (err) {
      console.error('Assistant Error:', err);
      setMessages((prev) => [...prev, { type: 'bot', text: '⚠️ Something went wrong with the assistant.' }]);
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
          <div key={idx} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'} fade-in`}>
            <div className={`max-w-[75%] p-3 rounded-2xl ${
              msg.type === 'user'
                ? 'bg-indigo-600 text-white'
                : 'bg-white/20 text-white'
            }`}>
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
        <div ref={messagesEndRef} />
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
