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
    
    console.log("Request received for phone:", phoneNumber);
    
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
    const blandApiKey = process.env.BLAND_AI_API_KEY;
    const ghlApiKey = process.env.GHL_API_KEY;
    
    console.log("API keys present:", {
      bland: !!blandApiKey,
      ghl: !!ghlApiKey
    });
    
    if (!blandApiKey) {
      console.error("Bland AI API key is missing");
      return {
        statusCode: 500,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
          success: false, 
          error: "Bland AI API key is not configured" 
        })
      };
    }

    // Make the request to Bland.ai
    console.log("Making Bland.ai API request with pathway:", pathwayId);
    
    const blandResponse = await fetch('https://api.bland.ai/v1/calls', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${blandApiKey}`
      },
      body: JSON.stringify({
        phone_number: phoneNumber,
        pathway_id: pathwayId,
        reduce_latency: true,
        voice: "june"
      })
    });
    
    // Log raw response for debugging
    console.log("Bland.ai response status:", blandResponse.status);
    
    const blandData = await blandResponse.json();
    console.log("Bland.ai response data:", JSON.stringify(blandData));
    
    // Handle unsuccessful responses from Bland.ai
    if (!blandResponse.ok) {
      console.error("Bland.ai API error:", blandData);
      return {
        statusCode: blandResponse.status,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          success: false,
          error: blandData.error || "Error from Bland.ai API"
        })
      };
    }
    
    // If we have a GHL API key, create/update contact in Go High Level
    if (ghlApiKey && (blandData.success || blandData.call_id)) {
      try {
        console.log("Starting GHL integration");
        
        // Format phone number for GHL (add +1 prefix for US numbers)
        const formattedPhone = `+1${phoneNumber}`;
        
        // Current timestamp for tracking
        const timestamp = new Date().toISOString();
        
        // First check if contact already exists in GHL
        console.log("Looking up GHL contact with phone:", formattedPhone);
        
        const searchResponse = await fetch(`https://rest.gohighlevel.com/v1/contacts/lookup?phone=${encodeURIComponent(formattedPhone)}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${ghlApiKey}`,
            'Content-Type': 'application/json'
          }
        });
        
        // Log raw GHL search response for debugging
        console.log("GHL search response status:", searchResponse.status);
        
        if (!searchResponse.ok) {
          const errorText = await searchResponse.text();
          console.error("GHL search error:", errorText);
          throw new Error(`GHL search failed: ${searchResponse.status}`);
        }
        
        const searchData = await searchResponse.json();
        console.log("GHL search response:", JSON.stringify(searchData));
        
        let contactId = searchData?.contacts?.[0]?.id;
        let isNewContact = !contactId;
        
        console.log("Contact found in GHL:", !isNewContact, "Contact ID:", contactId);
        
        // Contact data to send to GHL
        const contactData = {
          phone: formattedPhone,
          name: name,
          email: email,
          customField: {
            "last_demo_call": timestamp,
            "demo_call_id": blandData.call_id || ''
          },
          tags: ["Demo Call", "Bland AI Demo"],
          source: "Website Demo"
        };
        
        console.log("Preparing to create/update GHL contact:", JSON.stringify(contactData));
        
        let ghlResponse;
        
        if (isNewContact) {
          // Create new contact
          console.log("Creating new GHL contact");
          
          ghlResponse = await fetch('https://rest.gohighlevel.com/v1/contacts/', {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${ghlApiKey}`,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(contactData)
          });
        } else {
          // Update existing contact
          console.log("Updating existing GHL contact:", contactId);
          
          ghlResponse = await fetch(`https://rest.gohighlevel.com/v1/contacts/${contactId}`, {
            method: 'PUT',
            headers: {
              'Authorization': `Bearer ${ghlApiKey}`,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(contactData)
          });
        }
        
        // Log raw GHL response
        console.log("GHL create/update response status:", ghlResponse.status);
        
        if (!ghlResponse.ok) {
          const errorText = await ghlResponse.text();
          console.error("GHL create/update error:", errorText);
          throw new Error(`GHL operation failed: ${ghlResponse.status}`);
        }
        
        const ghlData = await ghlResponse.json();
        console.log("GHL create/update response:", JSON.stringify(ghlData));
        
        // Add a note about the demo call
        if (contactId || (!isNewContact && ghlResponse.ok)) {
          // If we just created the contact, get the new ID
          if (isNewContact && ghlResponse.ok) {
            const newContactData = ghlData;
            contactId = newContactData?.contact?.id || newContactData?.id;
            console.log("New contact created with ID:", contactId);
          }
          
          if (contactId) {
            // Add a note to the contact
            console.log("Adding note to GHL contact:", contactId);
            
            const noteResponse = await fetch(`https://rest.gohighlevel.com/v1/contacts/${contactId}/notes`, {
              method: 'POST',
              headers: {
                'Authorization': `Bearer ${ghlApiKey}`,
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                body: `Demo call initiated on ${new Date().toLocaleString()}. Call ID: ${blandData.call_id || 'N/A'}`
              })
            });
            
            console.log("GHL note response status:", noteResponse.status);
            
            if (!noteResponse.ok) {
              const errorText = await noteResponse.text();
              console.error("GHL note error:", errorText);
            } else {
              const noteData = await noteResponse.json();
              console.log("GHL note response:", JSON.stringify(noteData));
            }
          }
        }
        
        console.log("GHL integration completed successfully");
      } catch (ghlError) {
        // Log GHL error but don't fail the overall request
        console.error("Error with GHL integration:", ghlError);
      }
    }

    // Add tags to the response for successful debugging
    const responseData = {
      ...blandData,
      ghl_integration_attempted: !!ghlApiKey,
      timestamp: new Date().toISOString()
    };
    
    console.log("Sending final response to client:", JSON.stringify(responseData));

    // Return the response from Bland.ai
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(responseData)
    };

  } catch (error) {
    console.error("Unhandled error in function:", error);
    
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        success: false,
        error: error.message || "An unexpected error occurred while processing your request."
      })
    };
  }
};