import React, { useState, useEffect, useRef } from 'react';

export function ChatPreview() {
  const [messages, setMessages] = useState([
    {
      type: 'bot',
      text: "👋 Hi! I'm your AI assistant. Ask me anything about marketing, lead gen, or AI voice tools.",
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [userName, setUserName] = useState('');
  const [userPhone, setUserPhone] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [stage, setStage] = useState<'chat' | 'askName' | 'askPhone' | 'askEmail' | 'completed' | 'blocked'>('chat');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const forbiddenTopics = /(?:weather|color|joke|cat|dog|sky|space|movie|trivia|fun fact|who made you|openai|chatgpt)/i;

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
  }, [messages]);
  

  const fakeEmailPattern = /(?:test|asdf|123|no|fake|none|stupid|example|na|dummy|trash)/i;
  const burnerDomains = ['mailinator.com', 'tempmail.com', '10minutemail.com'];

  const isFakeEmail = (email: string) => {
    if (fakeEmailPattern.test(email)) return true;
    return burnerDomains.some((domain) => email.toLowerCase().endsWith(`@${domain}`));
  };

  const handleSend = async () => {
    if (!input.trim() || stage === 'blocked') return;
  
    const cleanedInput = input.trim().toLowerCase();
    const userMsg = { type: 'user', text: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
  
    const userMessageCount = messages.filter((m) => m.type === 'user').length + 1;
  
    // 🧠 Handle name input
    if (stage === 'askName') {
      setUserName(cleanedInput);
      setStage('askPhone');
      setMessages((prev) => [
        ...prev,
        { type: 'bot', text: `Awesome, ${cleanedInput}! What's the best phone number to reach you at?` },
      ]);
      return;
    }
  
    // 📞 Handle phone input or skip
    if (stage === 'askPhone') {
      if (cleanedInput === 'no' || cleanedInput.includes('no thanks')) {
        setStage('completed');
        setMessages((prev) => [
          ...prev,
          { type: 'bot', text: "No worries — you're all set! Let's get this on your calendar 👇" },
          {
            type: 'bot',
            text: `<a href="https://api.navizio.com/widget/booking/CfTVykAt8qTshxQ42FM4" target="_blank" rel="noopener noreferrer" class="underline font-semibold">📅 Book Your Demo Now</a>`,
          },
        ]);
        return;
      }
  
      setUserPhone(cleanedInput);
      setStage('askEmail');
      setMessages((prev) => [
        ...prev,
        { type: 'bot', text: "Got it! Want a quick confirmation sent to your email too?" },
      ]);
      return;
    }
  
    // 📧 Handle email input or skip
    if (stage === 'askEmail') {
      if (cleanedInput === 'no' || cleanedInput.includes('no thanks')) {
        setStage('completed');
        setMessages((prev) => [
          ...prev,
          { type: 'bot', text: "No worries — you're all set! Here's your booking link 👇" },
          {
            type: 'bot',
            text: `<a href="https://api.navizio.com/widget/booking/CfTVykAt8qTshxQ42FM4" target="_blank" rel="noopener noreferrer" class="underline font-semibold">📅 Book Your Demo Now</a>`,
          },
        ]);
        return;
      }
  
      if (isFakeEmail(cleanedInput)) {
        setStage('blocked');
        setMessages((prev) => [
          ...prev,
          { type: 'bot', text: "🚫 That doesn't look like a real email. Let's pause here — I'm happy to continue when you're ready for results." },
        ]);
        return;
      }
  
      setUserEmail(cleanedInput);
      setStage('completed');
      setMessages((prev) => [
        ...prev,
        { type: 'bot', text: `Thanks, you're all set! Let's get this on your calendar 👇` },
        {
          type: 'bot',
          text: `<a href="https://api.navizio.com/widget/booking/CfTVykAt8qTshxQ42FM4" target="_blank" rel="noopener noreferrer" class="underline font-semibold">📅 Book Your Demo Now</a>`,
        },
      ]);
      return;
    }
  
    // Soft demo CTA after 2 messages
    if (userMessageCount === 2 && stage === 'chat') {
      setStage('askName');
      setMessages((prev) => [
        ...prev,
        { type: 'bot', text: "👀 Want to see how this AI could work in your business? I can schedule a free demo for you. What's your first name?" },
      ]);
      return;
    }
  
    // Fallback CTA if unqualified
    if (userMessageCount >= 5 && stage === 'chat') {
      setMessages((prev) => [
        ...prev,
        { type: 'bot', text: "You've reached the end of this demo — ready to see how this works for *your* business? Let's schedule a free call 👇" },
        {
          type: 'bot',
          text: `<a href="https://api.navizio.com/widget/booking/CfTVykAt8qTshxQ42FM4" target="_blank" rel="noopener noreferrer" class="underline font-semibold">📅 Book Your Demo Now</a>`,
        },
      ]);
      return;
    }
  
    // Off-topic filter
    if (forbiddenTopics.test(cleanedInput)) {
      setMessages((prev) => [
        ...prev,
        { type: 'bot', text: "Let’s stay focused on your business goals. I can help with marketing, automation, and lead gen — ask me anything about that 👇" },
      ]);
      return;
    }
  
    // AI response via Netlify function
    setIsTyping(true);
    try {
      const res = await fetch('/.netlify/functions/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: cleanedInput }),
      });
      const data = await res.json();
      const reply = data.reply || "Hmm, I didn’t quite catch that.";
      setMessages((prev) => [...prev, { type: 'bot', text: reply }]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { type: 'bot', text: 'Something went wrong. Try again later or book a call 👇' },
        {
          type: 'bot',
          text: `<a href="https://api.navizio.com/widget/booking/CfTVykAt8qTshxQ42FM4" target="_blank" rel="noopener noreferrer" class="underline font-semibold">📅 Book a Call</a>`,
        },
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
              className={`max-w-[75%] p-3 rounded-2xl animate-fade-in transition-all duration-300 ${
                msg.type === 'user'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-white/20 text-white'
              }`}
            >
              <span dangerouslySetInnerHTML={{ __html: msg.text }} />
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
          placeholder="Type your message..."
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
