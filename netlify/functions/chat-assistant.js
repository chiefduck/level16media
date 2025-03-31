const fetch = require("node-fetch");

const ASSISTANT_ID = "asst_kMhvTxX20l0UAP61tmkki7kC"; // Replace with your actual Assistant ID

exports.handler = async (event) => {
  try {
    const { message, thread_id } = JSON.parse(event.body);

    // Step 1: Create thread if needed
    let threadId = thread_id;
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

    // Step 2: Post message to the thread
    await fetch(`https://api.openai.com/v1/threads/${threadId}/messages`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ role: "user", content: message }),
    });

    // Step 3: Run the assistant
    const runRes = await fetch(`https://api.openai.com/v1/threads/${threadId}/runs`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ assistant_id: ASSISTANT_ID }),
    });

    const runData = await runRes.json();
    const runId = runData.id;

    // Step 4: Poll until run completes or function call required
    let runStatus = "queued";
    let runResult;

    while (runStatus !== "completed" && runStatus !== "requires_action") {
      await new Promise((res) => setTimeout(res, 1000));
      const checkRes = await fetch(
        `https://api.openai.com/v1/threads/${threadId}/runs/${runId}`,
        {
          headers: {
            Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
            "Content-Type": "application/json",
          },
        }
      );
      runResult = await checkRes.json();
      runStatus = runResult.status;
    }

    // Step 5: If function call is requested
    if (runStatus === "requires_action") {
      const funcCall = runResult.required_action.submit_tool_outputs.tool_calls[0];
      const { name, arguments: args } = funcCall.function;
      const parsedArgs = JSON.parse(args);

      // Only handle `create_lead` for now
      if (name === "create_lead") {
        const res = await fetch("/.netlify/functions/create-lead", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(parsedArgs),
        });

        const result = await res.json();

        // Step 6: Submit tool output back to OpenAI
        await fetch(`https://api.openai.com/v1/threads/${threadId}/runs/${runId}/submit_tool_outputs`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            tool_outputs: [
              {
                tool_call_id: funcCall.id,
                output: `Lead successfully ${result.id ? "created" : "updated"} in GHL.`,
              },
            ],
          }),
        });

        // Wait for assistant to respond after tool output
        let followUp = "queued";
        while (followUp !== "completed") {
          await new Promise((res) => setTimeout(res, 1000));
          const res2 = await fetch(
            `https://api.openai.com/v1/threads/${threadId}/runs/${runId}`,
            {
              headers: {
                Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
                "Content-Type": "application/json",
              },
            }
          );
          const nextCheck = await res2.json();
          followUp = nextCheck.status;
        }
      }
    }

    // Step 7: Get latest assistant message
    const msgRes = await fetch(`https://api.openai.com/v1/threads/${threadId}/messages`, {
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
    });

    const msgData = await msgRes.json();
    const last = msgData.data.reverse().find((m) => m.role === "assistant");

    return {
      statusCode: 200,
      body: JSON.stringify({
        reply: last?.content?.[0]?.text?.value || "No response.",
        thread_id: threadId,
      }),
    };
  } catch (err) {
    console.error("Assistant Error:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Internal Server Error" }),
    };
  }
};
