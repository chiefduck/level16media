const fetch = require("node-fetch");

exports.handler = async (event) => {
  try {
    const { thread_id, run_id } = JSON.parse(event.body);

    // Check run status
    const runCheck = await fetch(
      `https://api.openai.com/v1/threads/${thread_id}/runs/${run_id}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );
    const runData = await runCheck.json();

    if (runData.status !== "completed") {
      return {
        statusCode: 200,
        body: JSON.stringify({ status: runData.status }),
      };
    }

    // If completed, fetch messages
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

    return {
      statusCode: 200,
      body: JSON.stringify({
        status: "completed",
        reply: lastMsg?.content?.[0]?.text?.value || "No reply.",
      }),
    };
  } catch (err) {
    console.error("Check Assistant Error:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Error checking assistant run" }),
    };
  }
};
