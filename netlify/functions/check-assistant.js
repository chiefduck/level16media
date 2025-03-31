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
                try {
                  const blandRes = await fetch(`${process.env.URL}/.netlify/functions/initiate-call`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                      name: args.name,
                      phone: args.phone,
                      email: args.email || "",
                      pathway_id: args.pathway_id || "",
                      source: "AI Chatbot"
                    }),
                  });
              
                const blandData = await blandRes.json();

                console.log("📞 Bland response:", blandData);

                if (!blandRes.ok) {
                  throw new Error(`Bland call failed: ${JSON.stringify(blandData)}`);
                }

                return {
                  tool_call_id: tool.id,
                  output: `Call initiated successfully: ${blandData.call_id || "no ID"}`,
                };
              } catch (err) {
                console.error("❌ Error in initiate_demo_call:", err);
                return {
                  tool_call_id: tool.id,
                  output: `Error starting call: ${err.message}`,
                };
              }
            }

            return {
              tool_call_id: tool.id,
              output: `Unknown tool: ${fnName}`,
            };
          })
        );

        // 🔁 submit tool outputs and continue the loop naturally
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

        await new Promise((r) => setTimeout(r, 1500));
        // continue is now implicit by letting the loop proceed
        continue; // <-- you can remove this safely
      }

      if (status === "completed") {
        reply = runData?.last_response?.message?.content?.trim();
        break;
      }

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


