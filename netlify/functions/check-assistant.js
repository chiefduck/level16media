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

    let status = "in_progress";
    let reply = null;

    for (let i = 0; i < 20; i++) {
      const runRes = await fetch(
        `https://api.openai.com/v1/threads/${thread_id}/runs/${run_id}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
            "Content-Type": "application/json",
            "OpenAI-Beta": "assistants=v2",
          },
        }
      );

      const runData = await runRes.json();
      console.log("🧪 RAW run response:", JSON.stringify(runData, null, 2));
      console.log("🔄 run status:", runData.status);
console.log("📨 message content:", runData?.last_response?.message?.content);


      status = runData.status;

      // 🛠 If a tool is required
      if (
        status === "requires_action" &&
        runData.required_action?.type === "submit_tool_outputs"
      ) {
        const toolCalls = runData.required_action.submit_tool_outputs.tool_calls;

        const results = await Promise.all(
          toolCalls.map(async (tool) => {
            const fnName = tool.function.name;
            const args = JSON.parse(tool.function.arguments || "{}");

            console.log("🔧 Tool called:", fnName);
            console.log("📦 Tool args:", args);

            if (fnName === "create_lead") {
              const res = await fetch(`${process.env.URL}/.netlify/functions/create-lead`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  name: args.name,
                  phone: args.phone,
                  email: args.email,
                }),
              });

              const data = await res.json();
              return {
                tool_call_id: tool.id,
                output: data?.message || "Lead created.",
              };
            }

            if (fnName === "initiate_demo_call") {
              const res = await fetch(`${process.env.URL}/.netlify/functions/initiate-call`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  name: args.name,
                  phone_number: args.phone,
                }),
              });

              const data = await res.json();
              return {
                tool_call_id: tool.id,
                output: data?.message || "Call triggered.",
              };
            }

            return {
              tool_call_id: tool.id,
              output: "Unknown tool.",
            };
          })
        );

        // Submit back to OpenAI
        await fetch(
          `https://api.openai.com/v1/threads/${thread_id}/runs/${run_id}/submit_tool_outputs`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
              "Content-Type": "application/json",
              "OpenAI-Beta": "assistants=v2",
            },
            body: JSON.stringify({ tool_outputs: results }),
          }
        );

        // Wait before checking again
        await new Promise((r) => setTimeout(r, 1500));
        continue;
      }

      // ✅ Done!
      if (status === "completed") {
        reply = runData?.last_response?.message?.content?.trim();
        break;
      }

      // Wait before next check
      await new Promise((r) => setTimeout(r, 1500));
    }

    return {
      statusCode: 200,
      body: JSON.stringify({
        status,
        reply: reply || "⚠️ Sorry, that took too long — try again.",
      }),
    };
  } catch (err) {
    console.error("Assistant error:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ reply: "⚠️ Something went wrong with the assistant." }),
    };
  }
};
