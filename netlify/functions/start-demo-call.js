// netlify/functions/start-demo-call.js

exports.handler = async function(event, context) {
    // Only allow POST requests
    if (event.httpMethod !== "POST") {
      return { statusCode: 405, body: "Method Not Allowed" };
    }
  
    try {
      // Parse the request body
      const body = JSON.parse(event.body);
      const phoneNumber = body.phone_number;
      const pathwayId = body.pathway_id;
      // Optional additional contact info if provided
      const name = body.name || 'Website Visitor';
      const email = body.email || '';
      
      // Validate phone number
      if (!phoneNumber || !/^\d{10}$/.test(phoneNumber)) {
        return {
          statusCode: 400,
          body: JSON.stringify({ 
            success: false, 
            error: "Invalid phone number format. Must be 10 digits." 
          })
        };
      }
  
      // Get the API keys from environment variables
      const blandApiKey = process.env.BLAND_AI_API_KEY;
      const ghlApiKey = process.env.GHL_API_KEY;
      
      if (!blandApiKey) {
        return {
          statusCode: 500,
          body: JSON.stringify({ 
            success: false, 
            error: "Bland AI API key is not configured" 
          })
        };
      }
  
      // Make the request to Bland.ai
      const response = await fetch('https://api.bland.ai/v1/calls', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${blandApiKey}`
        },
        body: JSON.stringify({
          phone_number: phoneNumber,
          // If you're using a pathway ID instead of direct configuration
          pathway_id: "9a8707c9-35e6-4a4e-a1d3-4a5c445697ff",
          // If you need to specify any additional parameters
          reduce_latency: true
        })
      });
  
      const data = await response.json();
      
      // If we have a GHL API key, create/update contact in Go High Level
      if (ghlApiKey && data.success) {
        try {
          // Format phone number for GHL (add +1 prefix for US numbers)
          const formattedPhone = `+1${phoneNumber}`;
          
          // Current timestamp for tracking
          const timestamp = new Date().toISOString();
          
          // First check if contact already exists in GHL
          const searchResponse = await fetch(`https://rest.gohighlevel.com/v1/contacts/lookup?phone=${formattedPhone}`, {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${ghlApiKey}`,
              'Content-Type': 'application/json'
            }
          });
          
          const searchData = await searchResponse.json();
          let contactId = searchData?.contacts?.[0]?.id;
          let isNewContact = !contactId;
          
          // Contact data to send to GHL
          const contactData = {
            phone: formattedPhone,
            name: name,
            email: email,
            customField: {
              "last_demo_call": timestamp,
              "demo_call_id": data.call_id || ''
            },
            tags: ["Demo Call", "Bland AI Demo"],
            source: "Website Demo"
          };
          
          let ghlResponse;
          
          if (isNewContact) {
            // Create new contact
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
            ghlResponse = await fetch(`https://rest.gohighlevel.com/v1/contacts/${contactId}`, {
              method: 'PUT',
              headers: {
                'Authorization': `Bearer ${ghlApiKey}`,
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(contactData)
            });
          }
          
          // Add a note about the demo call
          if (contactId || (!isNewContact && ghlResponse.ok)) {
            // If we just created the contact, get the new ID
            if (isNewContact && ghlResponse.ok) {
              const newContactData = await ghlResponse.json();
              contactId = newContactData?.contact?.id;
            }
            
            if (contactId) {
              // Add a note to the contact
              await fetch(`https://rest.gohighlevel.com/v1/contacts/${contactId}/notes`, {
                method: 'POST',
                headers: {
                  'Authorization': `Bearer ${ghlApiKey}`,
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                  body: `Demo call initiated on ${new Date().toLocaleString()}. Call ID: ${data.call_id || 'N/A'}`
                })
              });
            }
          }
          
          console.log('GHL integration completed successfully');
        } catch (ghlError) {
          // Log GHL error but don't fail the overall request
          console.error('Error with GHL integration:', ghlError);
        }
      }
  
      // Return the response from Bland.ai
      return {
        statusCode: response.status,
        body: JSON.stringify(data)
      };
    } catch (error) {
      console.error('Error:', error);
      
      return {
        statusCode: 500,
        body: JSON.stringify({
          success: false,
          error: "An error occurred while processing your request."
        })
      };
    }
  };