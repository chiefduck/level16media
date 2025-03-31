const fetch = require("node-fetch");

exports.handler = async (event) => {
  try {
    const { thread_id, run_id } = JSON.parse(event.body);

    let runData;
    let status = "in_progress";
    let reply = null;

    console.log("🔎 Checking Assistant:", { thread_id, run_id });

    while (status === "queued" || status === "in_progress") {
      await new Promise((r) => setTimeout(r, 1500));

      const checkRes = await fetch(`https://api.openai.com/v1/threads/${thread_id}/runs/${run_id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          "Content-Type": "application/json",
          "OpenAI-Beta": "assistants=v2",
        },
      });

      runData = await checkRes.json();
      status = runData.status;

      console.log("🧠 Assistant run status:", status);

      // 🛠 Handle tool calls
      if (status === "requires_action" && runData.required_action?.type === "submit_tool_outputs") {
        const toolCalls = runData.required_action.submit_tool_outputs.tool_calls;

        const results = await Promise.all(toolCalls.map(async (tool) => {
          const fnName = tool.function.name;
          const args = JSON.parse(tool.function.arguments || "{}");

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
            console.log("📬 GHL Response:", ghlData);

            return {
              tool_call_id: tool.id,
              output: `Lead created in CRM. ID: ${ghlData.id || "unknown"}`,
            };
          }

          if (fnName === "initiate_demo_call") {
            const callRes = await fetch(`${process.env.URL}/.netlify/functions/initiate-call`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                name: args.name,
                phone_number: args.phone,
              }),
            });

            const callData = await callRes.json();
            console.log("📞 Call Response:", callData);

            return {
              tool_call_id: tool.id,
              output: `Call started: ${callData.call_id || "unknown"}`,
            };
          }

          // Fallback if unknown tool
          return {
            tool_call_id: tool.id,
            output: "⚠️ Unknown tool requested.",
          };
        }));

        // Submit outputs back to OpenAI
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
    }

    // ✅ If complete, return reply
    if (status === "completed") {
      reply = runData.last_response?.message?.content;

      console.log("🗣 Final Assistant Reply:", reply);

      return {
        statusCode: 200,
        body: JSON.stringify({
          status: "completed",
          reply: reply || "✅ You're all set!",
        }),
      };
    }

    // ❌ Fallback
    console.error("🛑 Assistant fallback triggered", {
      status,
      thread_id,
      run_id,
      runData,
    });

    return {
      statusCode: 200,
      body: JSON.stringify({
        status: "failed",
        reply: "⚠️ Sorry, that took too long — try again.",
      }),
    };
  } catch (err) {
    console.error("❌ Assistant Error:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({
        status: "error",
        reply: "⚠️ Something went wrong while processing your request.",
      }),
    };
  }
};

