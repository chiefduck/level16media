const fetch = require("node-fetch");

exports.handler = async (event) => {
  try {
    const { message } = JSON.parse(event.body);

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        temperature: 0.7,
        messages: [
          {
            role: "system",
            content:
              "You are an AI chatbot working for a digital marketing agency named Level 16 Media. Be helpful, confident, and focused on lead generation, AI voice assistants, and marketing strategy.",
          },
          {
            role: "system",
            content: `
          You are the AI Assistant for Level 16 Media — a digital marketing agency that helps businesses generate more leads through AI-powered voice assistants, automated funnels, chatbots, and appointment-setting tools.
          
          ONLY answer questions related to:
          - AI marketing tools
          - Lead generation
          - CRM and automation
          - Chatbots
          - Funnels and ads
          - Demo setup and consultation
          
          If someone asks something off-topic (weather, trivia, jokes, etc.), politely redirect the conversation back to how you can help with marketing, automation, or growth.
          
          NEVER mention that you're an AI, ChatGPT, or built by OpenAI. Only refer to yourself as the Level 16 AI Assistant.
          Be confident, clear, and focused on helping the user take action. Always guide them toward booking a demo if appropriate.
          `
          },
        ],
      }),
    });

    const data = await response.json();
    console.log("✅ OpenAI API response:", JSON.stringify(data, null, 2));

    const reply = data?.choices?.[0]?.message?.content?.trim();

    return {
      statusCode: 200,
      body: JSON.stringify({
        reply: reply || "Sorry, I didn’t get that. Can you rephrase it?",
      }),
    };
  } catch (err) {
    console.error("❌ AI Chat Error:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ reply: "Something went wrong. Please try again later." }),
    };
  }
};
