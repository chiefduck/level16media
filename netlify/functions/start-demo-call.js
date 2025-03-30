// netlify/functions/start-demo-call.js

// Add node-fetch for Node.js environments
const fetch = require('node-fetch');

exports.handler = async function(event, context) {
  // Only allow POST requests
  if (event.httpMethod !== "POST") {
    return { 
      statusCode: 405, 
      body: JSON.stringify({ success: false, error: "Method Not Allowed" })
    };
  }

  console.log("Demo call function invoked");

  try {
    // Parse the request body
    const body = JSON.parse(event.body);
    const phoneNumber = body.phone_number;
    const pathwayId = body.pathway_id;
    const name = body.name || 'Website Visitor';
    const email = body.email || '';
    
    // Validate phone number
    if (!phoneNumber || !/^\d{10}$/.test(phoneNumber)) {
      console.log("Invalid phone number format");
      return {
        statusCode: 400,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
          success: false, 
          error: "Invalid phone number format. Must be 10 digits." 
        })
      };
    }

    // Get the API keys from environment variables
    const aiApiKey = process.env.BLAND_AI_API_KEY;
    const crmApiKey = process.env.GHL_API_KEY;
    
    if (!aiApiKey) {
      console.error("AI service API key is missing");
      return {
        statusCode: 500,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
          success: false, 
          error: "API key is not configured" 
        })
      };
    }

    // Make the request to AI service
    console.log("Initiating outbound call");
    
    const aiResponse = await fetch('https://api.bland.ai/v1/calls', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${aiApiKey}`
      },
      body: JSON.stringify({
        phone_number: phoneNumber,
        pathway_id: pathwayId,
        reduce_latency: true,
        voice: "june"
      })
    });
    
    // Log response status for debugging
    console.log("Service response status:", aiResponse.status);
    
    const callData = await aiResponse.json();
    
    // Handle unsuccessful responses
    if (!aiResponse.ok) {
      console.error("API error occurred");
      return {
        statusCode: aiResponse.status,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          success: false,
          error: callData.error || "Error from API service"
        })
      };
    }
    
    // If we have a CRM API key, create/update contact
    if (crmApiKey && (callData.success || callData.call_id)) {
      try {
        console.log("Starting CRM integration");
        
        // Format phone number for CRM (add +1 prefix for US numbers)
        const formattedPhone = `+1${phoneNumber}`;
        
        // Current timestamp for tracking
        const timestamp = new Date().toISOString();
        
        // First check if contact already exists in CRM
        console.log("Looking up contact in CRM");
        
        const searchResponse = await fetch(`https://rest.gohighlevel.com/v1/contacts/lookup?phone=${encodeURIComponent(formattedPhone)}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${crmApiKey}`,
            'Content-Type': 'application/json'
          }
        });
        
        // Log response status for debugging
        console.log("CRM search status:", searchResponse.status);
        
        if (!searchResponse.ok) {
          console.error("CRM search failed");
          throw new Error(`CRM search failed: ${searchResponse.status}`);
        }
        
        const searchData = await searchResponse.json();
        
        let contactId = searchData?.contacts?.[0]?.id;
        let isNewContact = !contactId;
        
        console.log("Contact status:", isNewContact ? "Creating new" : "Updating existing");
        
        // Contact data to send to CRM
        const contactData = {
          phone: formattedPhone,
          name: name,
          email: email,
          customField: {
            "last_demo_call": timestamp,
            "demo_call_id": callData.call_id || ''
          },
          tags: ["Demo Call", "AI Demo"],
          source: "Website Demo"
        };
        
        let crmResponse;
        
        if (isNewContact) {
          // Create new contact
          crmResponse = await fetch('https://rest.gohighlevel.com/v1/contacts/', {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${crmApiKey}`,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(contactData)
          });
        } else {
          // Update existing contact
          crmResponse = await fetch(`https://rest.gohighlevel.com/v1/contacts/${contactId}`, {
            method: 'PUT',
            headers: {
              'Authorization': `Bearer ${crmApiKey}`,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(contactData)
          });
        }
        
        // Log response status for debugging
        console.log("CRM update status:", crmResponse.status);
        
        if (!crmResponse.ok) {
          console.error("CRM update failed");
          throw new Error(`CRM operation failed: ${crmResponse.status}`);
        }
        
        const crmData = await crmResponse.json();
        
        // Add a note about the demo call
        if (contactId || (!isNewContact && crmResponse.ok)) {
          // If we just created the contact, get the new ID
          if (isNewContact && crmResponse.ok) {
            const newContactData = crmData;
            contactId = newContactData?.contact?.id || newContactData?.id;
            console.log("New contact created");
          }
          
          if (contactId) {
            // Add a note to the contact
            console.log("Adding note to contact");
            
            const noteResponse = await fetch(`https://rest.gohighlevel.com/v1/contacts/${contactId}/notes`, {
              method: 'POST',
              headers: {
                'Authorization': `Bearer ${crmApiKey}`,
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                body: `Demo call initiated on ${new Date().toLocaleString()}.`
              })
            });
            
            console.log("Note creation status:", noteResponse.status);
            
            if (!noteResponse.ok) {
              console.error("Note creation failed");
            }
          }
        }
        
        console.log("CRM integration completed");
      } catch (crmError) {
        // Log CRM error but don't fail the overall request
        console.error("Error with CRM integration");
      }
    }

    // Add tags to the response for successful debugging
    const responseData = {
      ...callData,
      crm_integration_attempted: !!crmApiKey,
      timestamp: new Date().toISOString()
    };

    // Return the response
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(responseData)
    };

  } catch (error) {
    console.error("Unhandled error in function");
    
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        success: false,
        error: "An unexpected error occurred while processing your request."
      })
    };
  }
};