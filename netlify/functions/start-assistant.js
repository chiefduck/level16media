const fetch = require("node-fetch");

const ASSISTANT_ID = "asst_kMhvTxX20l0UAP61tmkki7kC"; // Replace this!

exports.handler = async (event) => {
  try {
    const { message, thread_id } = JSON.parse(event.body);

    let threadId = thread_id;

    // Create new thread if needed
    if (!threadId) {
      const threadRes = await fetch("https://api.openai.com/v1/threads", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          "Content-Type": "application/json",
          "OpenAI-Beta": "assistants=v2", // ✅ this line
        },
        body: JSON.stringify({}),
      });

      const threadData = await threadRes.json();
      threadId = threadData.id;
    }

    // Add message to thread
    await fetch(`https://api.openai.com/v1/threads/${threadId}/messages`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ role: "user", content: message }),
    });

    // Start assistant run
    const runRes = await fetch(`https://api.openai.com/v1/threads/${threadId}/runs`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ assistant_id: ASSISTANT_ID }),
    });

    const runData = await runRes.json();

    return {
      statusCode: 200,
      body: JSON.stringify({
        thread_id: threadId,
        run_id: runData.id,
      }),
    };
  } catch (err) {
    console.error("Start Assistant Error:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Error starting assistant run" }),
    };
  }
};
