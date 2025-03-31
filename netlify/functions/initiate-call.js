// netlify/functions/initiate-call.js

const axios = require('axios');

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ message: 'Method Not Allowed' }),
    };
  }

  try {
    const { phone_number, name = "Voice Demo", email = "", pathway_id } = JSON.parse(event.body);

    if (!phone_number || !/^\d{10}$/.test(phone_number)) {
      console.warn("❌ Invalid phone number received:", phone_number);
      return {
        statusCode: 400,
        body: JSON.stringify({ message: "Phone number is required and must be 10 digits." }),
      };
    }

    const formattedPhone = `+1${phone_number}`;

    // Step 1: Create or update contact in GHL
    const contactId = await createOrUpdateGHLContact(formattedPhone, name, email);

    // Step 2: Initiate Bland call
    const callResponse = await initiateBlandAICall(formattedPhone, pathway_id);

    console.log("✅ Bland Call + GHL Contact processed:", {
      contactId,
      callId: callResponse.call_id,
    });

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: 'Call initiated successfully',
        call_id: callResponse.call_id,
        success: true,
        contactId,
      }),
    };
  } catch (err) {
    console.error("❌ initiate-call failed:", err.message);
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: 'Server error during call initiation.',
        error: err.message,
        success: false,
      }),
    };
  }
};

async function createOrUpdateGHLContact(phone, name, email) {
  const GHL_API_KEY = process.env.GHL_API_KEY;
  if (!GHL_API_KEY) throw new Error("GHL_API_KEY is missing in env");

  const headers = {
    Authorization: `Bearer ${GHL_API_KEY}`,
    'Content-Type': 'application/json',
  };

  const baseUrl = "https://rest.gohighlevel.com/v1/contacts";

  // Search for contact
  const searchRes = await axios.get(`${baseUrl}/lookup?phone=${encodeURIComponent(phone)}`, { headers });
  const existing = searchRes.data.contacts?.[0];

  const contactData = {
    phone,
    firstName: name?.split(" ")[0] || "Voice",
    lastName: name?.split(" ").slice(1).join(" ") || "Lead",
    email,
    tags: ["AI Voice Demo"],
    source: "Voice Demo Call",
    customField: {
      demo_request_date: new Date().toISOString(),
    },
  };

  if (existing) {
    console.log("🛠 Updating existing contact:", existing.id);
    await axios.put(`${baseUrl}/${existing.id}`, contactData, { headers });
    return existing.id;
  } else {
    console.log("🆕 Creating new contact...");
    const createRes = await axios.post(baseUrl, contactData, { headers });
    return createRes.data.contact?.id;
  }
}

async function initiateBlandAICall(phoneNumber, pathwayId) {
  const BLAND_AI_API_KEY = process.env.BLAND_AI_API_KEY;
  const WEBHOOK_URL = process.env.WEBHOOK_URL || 'https://your-netlify-site.netlify.app/.netlify/functions/bland-webhook';

  if (!BLAND_AI_API_KEY) throw new Error("BLAND_AI_API_KEY is missing");

  const payload = {
    phone_number: phoneNumber,
    voice: "julie",
    wait_for_greeting: true,
    record: true,
    reduce_latency: true,
    webhook_url: WEBHOOK_URL,
    metadata: {
      source: "Voice Demo Site",
      phone: phoneNumber,
    },
  };

  if (pathwayId) {
    payload.pathway_id = pathwayId;
  } else {
    payload.task = "You're calling from [CompanyName] to demonstrate our AI voice assistant. Keep it brief and explain that this is a live demo.";
  }

  const response = await axios.post("https://api.bland.ai/v1/calls", payload, {
    headers: {
      Authorization: `Bearer ${BLAND_AI_API_KEY}`,
      'Content-Type': 'application/json',
    },
  });

  return response.data;
}
