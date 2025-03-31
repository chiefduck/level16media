const fetch = require("node-fetch");

exports.handler = async (event) => {
  try {
    const { thread_id, run_id } = JSON.parse(event.body);

    // 🔍 Step 1: Log the thread/run we're checking
    console.log("🔎 Checking Assistant:", { thread_id, run_id });

    // Step 2: Check run status
    const runCheck = await fetch(
      `https://api.openai.com/v1/threads/${thread_id}/runs/${run_id}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          "Content-Type": "application/json",
          "OpenAI-Beta": "assistants=v2", // ✅ this line
        },
      }
    );

    const runData = await runCheck.json();

    console.log("🧠 Assistant run status:", runData.status);

    if (runData.status !== "completed") {
      return {
        statusCode: 200,
        body: JSON.stringify({ status: runData.status }),
      };
    }

    // Step 3: Get messages
    const msgRes = await fetch(
      `https://api.openai.com/v1/threads/${thread_id}/messages`,
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const msgData = await msgRes.json();
    const lastMsg = msgData.data.reverse().find((m) => m.role === "assistant");

    console.log("✅ Assistant replied:", lastMsg?.content?.[0]?.text?.value);

    return {
      statusCode: 200,
      body: JSON.stringify({
        status: "completed",
        reply: lastMsg?.content?.[0]?.text?.value || "No reply.",
      }),
    };
  } catch (err) {
    console.error("❌ Assistant check error:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Error checking assistant run" }),
    };
  }
};
