// start-demo-call.js (or initiate-call.js if you choose option 2)
// Netlify serverless function to initiate Bland.ai calls

const axios = require('axios');

exports.handler = async (event, context) => {
  // Only accept POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ message: 'Method Not Allowed' })
    };
  }

  try {
    // Parse the incoming request
    const requestData = JSON.parse(event.body);
    const { phone_number, name, email, pathway_id } = requestData;
    
    if (!phone || !/^\d{10}$/.test(phone)) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: "Phone number is required and must be 10 digits." })
      };
    }
    
    const formattedPhone = `+1${phone}`;
    
    
    // Create or update contact in GHL
    await createOrUpdateGHLContact(phone_number, name, email);
    
    // Initiate call with Bland.ai
    const callResponse = await initiateBlankAICall(phone_number, pathway_id);
    
    return {
      statusCode: 200,
      body: JSON.stringify({ 
        message: 'Call initiated successfully',
        success: true,
        status: "success",
        call_id: callResponse.call_id
      })
    };
  } catch (error) {
    console.error('Error initiating call:', error);
    
    return {
      statusCode: 500,
      body: JSON.stringify({ 
        message: 'Error initiating call', 
        error: error.message,
        success: false
      })
    };
  }
};

async function initiateBlankAICall(phoneNumber, pathwayId) {
  const BLAND_AI_API_KEY = process.env.BLAND_AI_API_KEY;
  const WEBHOOK_URL = process.env.WEBHOOK_URL || 'https://your-netlify-site.netlify.app/.netlify/functions/bland-webhook';
  
  if (!BLAND_AI_API_KEY) {
    throw new Error('BLAND_AI_API_KEY is not configured');
  }
  
  try {
    // Build the call payload
    const callPayload = {
      phone_number: phoneNumber,
      voice: "julie",
      wait_for_greeting: true,
      record: true,
      reduce_latency: true,
      webhook_url: WEBHOOK_URL,
      metadata: {
        source: "website_demo",
        phone: phoneNumber
      }
    };
    
    // If pathway_id is provided, use it instead of a task
    if (pathwayId) {
      callPayload.pathway_id = pathwayId;
    } else {
      // Default task if no pathway is specified
      callPayload.task = "You're calling from [CompanyName] to demonstrate our AI phone service. Keep the call brief and explain that this is just a demo of our AI voice technology. Ask if they have any questions about how the technology works, and answer any basic questions about AI phone systems. Thank them for their time.";
    }
    
    const response = await axios.post(
      'https://api.bland.ai/v1/calls',
      callPayload,
      {
        headers: {
          'Authorization': `Bearer ${BLAND_AI_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );
    
    console.log('Bland.ai call initiated:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error calling Bland.ai API:', error);
    throw error;
  }
}

async function createOrUpdateGHLContact(phoneNumber, name, email) {
  const GHL_API_KEY = process.env.GHL_API_KEY;
  
  if (!GHL_API_KEY) {
    throw new Error('GHL_API_KEY is not configured');
  }
  
  try {
    // First, search for the contact by phone number
    const searchResponse = await axios.get(
      `https://rest.gohighlevel.com/v1/contacts/search?query=${phoneNumber}`,
      {
        headers: {
          'Authorization': `Bearer ${GHL_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );
    
    let contactId;
    
    // Prepare contact data including optional fields
    const contactData = {
      phone: formattedPhone,
      name,
      email,
      source: source || "Voice Demo",
      tags: ["AI Demo"],
      customField: {
        demo_request_date: new Date().toISOString()
      }
    };
    
    
    // Add name and email if provided
    if (name) contactData.name = name;
    if (email) contactData.email = email;
    
    // Check if contact exists
    if (searchResponse.data.contacts && searchResponse.data.contacts.length > 0) {
      contactId = searchResponse.data.contacts[0].id;
      
      // Update existing contact
      await axios.put(
        `https://rest.gohighlevel.com/v1/contacts/${contactId}`,
        contactData,
        {
          headers: {
            'Authorization': `Bearer ${GHL_API_KEY}`,
            'Content-Type': 'application/json'
          }
        }
      );
      
      console.log(`Updated existing GHL contact: ${contactId}`);
    } else {
      // Create new contact (add tags for new contacts)
      contactData.tags = ["AI Demo Request"];
      
      const createResponse = await axios.post(
        'https://rest.gohighlevel.com/v1/contacts/',
        contactData,
        {
          headers: {
            'Authorization': `Bearer ${GHL_API_KEY}`,
            'Content-Type': 'application/json'
          }
        }
      );
      
      contactId = createResponse.data.contact.id;
      console.log(`Created new GHL contact: ${contactId}`);
    }
    
    return contactId;
  } catch (error) {
    console.error('Error managing GHL contact:', error);
    throw error;
  }
}