const fetch = require("node-fetch");

exports.handler = async (event) => {
  try {
    const { name, phone, email } = JSON.parse(event.body);

    const GHL_API_KEY = process.env.GHL_API_KEY; // <-- Add this in Netlify ENV
    const LOCATION_ID = process.env.GHL_LOCATION_ID; // <-- Add this too

    // Check if contact already exists
    const searchRes = await fetch(
      `https://rest.gohighlevel.com/v1/contacts/search?phone=${encodeURIComponent(phone)}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${GHL_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const searchData = await searchRes.json();
    const existing = searchData.contacts?.[0];

    // If exists, update contact
    if (existing) {
      await fetch(`https://rest.gohighlevel.com/v1/contacts/${existing.id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${GHL_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: name.split(" ")[0],
          lastName: name.split(" ").slice(1).join(" ") || "",
          email,
          phone,
        }),
      });

      return {
        statusCode: 200,
        body: JSON.stringify({ message: "Contact updated in GHL." }),
      };
    }

    // Else, create new contact
    const createRes = await fetch("https://rest.gohighlevel.com/v1/contacts/", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${GHL_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstName: name.split(" ")[0],
        lastName: name.split(" ").slice(1).join(" ") || "",
        email,
        phone,
        locationId: LOCATION_ID,
        tags: ["AI Chat Demo"],
        source: "Assistant API",
      }),
    });

    const createData = await createRes.json();

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Contact created", id: createData.contact.id }),
    };
  } catch (err) {
    console.error("GHL Error:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "GHL contact push failed" }),
    };
  }
};
