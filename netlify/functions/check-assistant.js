const fetch = require("node-fetch");

exports.handler = async (event) => {
  try {
    const { thread_id, run_id } = JSON.parse(event.body);

    if (!thread_id || !run_id) {
      console.log("❌ Missing thread or run ID");
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Missing thread or run ID" }),
      };
    }

    // Check run status
    const runCheck = await fetch(
      `https://api.openai.com/v1/threads/${thread_id}/runs/${run_id}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          "Content-Type": "application/json",
          "OpenAI-Beta": "assistants=v2",
        },
      }
    );

    const runData = await runCheck.json();
    console.log("🧠 Assistant run status:", runData.status);

    // 🛠 Handle tool call if requested
    if (runData.status === "requires_action" && runData.required_action?.type === "submit_tool_outputs") {
      const toolCalls = runData.required_action.submit_tool_outputs.tool_calls;

      const results = await Promise.all(toolCalls.map(async (tool) => {
        const fnName = tool.function.name;
        const args = JSON.parse(tool.function.arguments);

        console.log("🔧 Tool called:", fnName);
        console.log("📦 Tool args:", args);

        if (fnName === "create_lead") {
          const ghlRes = await fetch(`${process.env.URL}/.netlify/functions/create-lead`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              name: args.name,
              phone: args.phone,
              email: args.email,
            }),
          });

          const ghlData = await ghlRes.json();
          return {
            tool_call_id: tool.id,
            output: `Lead created in GHL with ID: ${ghlData.id}`,
          };
        }

        // Default fallback
        return {
          tool_call_id: tool.id,
          output: "Unknown tool.",
        };
      }));

      // Submit tool outputs back to OpenAI
      await fetch(`https://api.openai.com/v1/threads/${thread_id}/runs/${run_id}/submit_tool_outputs`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          "Content-Type": "application/json",
          "OpenAI-Beta": "assistants=v2",
        },
        body: JSON.stringify({ tool_outputs: results }),
      });

      return {
        statusCode: 200,
        body: JSON.stringify({ status: "submitted_tool_outputs" }),
      };
    }

    // Run still processing
    if (runData.status !== "completed") {
      return {
        statusCode: 200,
        body: JSON.stringify({ status: runData.status }),
      };
    }

    // Run completed – get assistant message
    const msgRes = await fetch(
      `https://api.openai.com/v1/threads/${thread_id}/messages`,
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          "Content-Type": "application/json",
          "OpenAI-Beta": "assistants=v2",
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
    console.error("❌ Assistant check error:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Error checking assistant run" }),
    };
  }
};
