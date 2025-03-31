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
        top_p: 1,
        messages: [
          {
            role: "system",
            content:
              "You are an AI chatbot working for a digital marketing agency named Level 16 Media. Be helpful, confident, and focused on lead generation, AI voice assistants, and marketing strategy. If users ask off-topic questions, redirect them back to marketing help.",
          },
          {
            role: "user",
            content: message,
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
