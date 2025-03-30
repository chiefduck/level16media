const fetch = require("node-fetch");

exports.handler = async (event) => {
  const { message } = JSON.parse(event.body);

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content:
            "You are an AI assistant for a digital marketing agency named Level 16 Media. Be helpful, friendly, and conversion-focused.",
        },
        { role: "user", content: message },
      ],
    }),
  });

  const data = await response.json();
  console.log("OpenAI API response:", data);

  const reply = data.choices?.[0]?.message?.content?.trim();

  return {
    statusCode: 200,
    body: JSON.stringify({
      reply: reply || "Hmm, I didn't catch that — try rephrasing?",
    }),
  };
};