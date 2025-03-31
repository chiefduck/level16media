const fetch = require("node-fetch");

exports.handler = async (event) => {
  try {
    const { thread_id, run_id } = JSON.parse(event.body);

    if (!thread_id || !run_id) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Missing thread_id or run_id" }),
      };
    }

    const runRes = await fetch(`https://api.openai.com/v1/threads/${thread_id}/runs/${run_id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json",
        "OpenAI-Beta": "assistants=v2",
      },
    });

    const runData = await runRes.json();
    console.log("🧪 RAW run response:", JSON.stringify(runData, null, 2));

    const status = runData.status;

    // 🛠 Handle tool call if requested
    if (status === "requires_action" && runData.required_action?.type === "submit_tool_outputs") {
      const toolCalls = runData.required_action.submit_tool_outputs.tool_calls;

      const results = await Promise.all(toolCalls.map(async (tool) => {
        const fnName = tool.function.name;
        const args = JSON.parse(tool.function.arguments);

        console.log("🔧 Tool called:", fnName);
        console.log("📦 Tool args:", args);

        // Handle create_lead
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

        // Handle initiate_demo_call
        if (fnName === "initiate_demo_call") {
          const callRes = await fetch(`${process.env.URL}/.netlify/functions/initiate-call`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              phone_number: args.phone,
              name: args.name,
              email: args.email || "",
              pathway_id: process.env.BLAND_PATHWAY_ID || "",
            }),
          });

          const callData = await callRes.json();
          return {
            tool_call_id: tool.id,
            output: `Call initiated with ID: ${callData.call_id}`,
          };
        }

        // Default fallback
        return {
          tool_call_id: tool.id,
          output: "Unknown tool.",
        };
      }));

      // 🧠 Grab name for personalization
      const firstArgs = toolCalls?.[0]?.function?.arguments
        ? JSON.parse(toolCalls[0].function.arguments)
        : {};
      const leadName = firstArgs.name?.split(" ")[0] || "there";

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

      // Custom response after tool run
      return {
        statusCode: 200,
        body: JSON.stringify({
          status: "completed",
          reply: `Thanks, ${leadName}! You're all set. Let me know if you'd like a live AI Voice Demo or want to book a strategy call.`,
        }),
      };
    }

    // Return default status if not complete
    if (status === "completed") {
      return {
        statusCode: 200,
        body: JSON.stringify({
          status: "completed",
          reply: runData.last_response?.message?.content || "✅ Done.",
        }),
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ status }),
    };
  } catch (err) {
    console.error("❌ Assistant error:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Assistant check failed." }),
    };
  }
};
