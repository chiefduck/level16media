// netlify/functions/bland-webhook.js
// Webhook handler for Bland.ai events

const fetch = require('node-fetch');

exports.handler = async (event, context) => {
  // Only accept POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ message: 'Method Not Allowed' })
    };
  }
  
  // Verify webhook signature if signing secret is configured
  const BLAND_WEBHOOK_SECRET = process.env.BLAND_WEBHOOK_SECRET;
  if (BLAND_WEBHOOK_SECRET) {
    const signature = event.headers['x-bland-signature'];
    if (!signature) {
      console.error('Missing Bland.ai webhook signature');
      return {
        statusCode: 401,
        body: JSON.stringify({ message: 'Missing webhook signature' })
      };
    }
    
    // Verify the signature (basic validation - you can implement more secure verification)
    // For production, implement proper HMAC validation with crypto
    if (signature !== BLAND_WEBHOOK_SECRET) {
      console.error('Invalid Bland.ai webhook signature');
      return {
        statusCode: 401,
        body: JSON.stringify({ message: 'Invalid webhook signature' })
      };
    }
    
    console.log('Bland.ai webhook signature verified');
  }

  console.log("Bland.ai webhook received");

  try {
    // Parse the incoming webhook payload
    const webhookData = JSON.parse(event.body);
    
    console.log('Received webhook from Bland.ai:', JSON.stringify(webhookData));
    
    // Extract important information from the webhook
    const { event_type, call_id, phone_number } = webhookData;
    
    // Process based on event type
    switch (event_type) {
      case 'call.started':
        await handleCallStarted(webhookData);
        break;
      case 'call.ended':
        await handleCallEnded(webhookData);
        break;
      case 'recording.available':
        await handleRecordingAvailable(webhookData);
        break;
      case 'transcription.available':
        await handleTranscriptionAvailable(webhookData);
        break;
      default:
        console.log(`Unhandled event type: ${event_type}`);
    }

    // Send successful response back to Bland.ai
    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Webhook received successfully' })
    };
  } catch (error) {
    console.error('Error processing webhook:', error);
    
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Error processing webhook', error: error.message })
    };
  }
};

// Handle when a call is initiated
async function handleCallStarted(data) {
  const { call_id, phone_number } = data;
  
  try {
    // Format phone for GHL (add +1 prefix for US numbers)
    const formattedPhone = phone_number.startsWith('+') ? phone_number : `+1${phone_number.replace(/\D/g, '')}`;
    
    // Update GHL with call started status
    await updateGHLContact(formattedPhone, {
      customField: {
        "call_status": "active",
        "call_id": call_id,
        "call_start_time": new Date().toISOString()
      }
    });
    
    // Add a note about the call starting
    await addGHLNote(formattedPhone, `Call started at ${new Date().toLocaleString()}. Call ID: ${call_id}`);
    
    console.log(`Call started with ID ${call_id} to ${phone_number}`);
  } catch (error) {
    console.error('Error handling call.started event:', error);
  }
}

// Handle when a call is completed
async function handleCallEnded(data) {
  const { call_id, phone_number, call_duration, outcome } = data;
  
  try {
    // Format phone for GHL
    const formattedPhone = phone_number.startsWith('+') ? phone_number : `+1${phone_number.replace(/\D/g, '')}`;
    
    // Update GHL with call ended status and duration
    await updateGHLContact(formattedPhone, {
      customField: {
        "call_status": "completed",
        "call_id": call_id,
        "call_end_time": new Date().toISOString(),
        "call_duration": call_duration,
        "call_outcome": outcome || "completed"
      }
    });
    
    // Add a note about the call ending
    await addGHLNote(
      formattedPhone, 
      `Call ended at ${new Date().toLocaleString()}. Duration: ${call_duration} seconds. Outcome: ${outcome || "completed"}`
    );
    
    console.log(`Call ended with ID ${call_id} to ${phone_number}, duration: ${call_duration}s`);
  } catch (error) {
    console.error('Error handling call.ended event:', error);
  }
}

// Handle when a recording becomes available
async function handleRecordingAvailable(data) {
  const { call_id, phone_number, recording_url } = data;
  
  try {
    // Format phone for GHL
    const formattedPhone = phone_number.startsWith('+') ? phone_number : `+1${phone_number.replace(/\D/g, '')}`;
    
    // Update GHL with recording URL
    await updateGHLContact(formattedPhone, {
      customField: {
        "call_id": call_id,
        "recording_url": recording_url
      }
    });
    
    // Add a note with the recording URL
    await addGHLNote(
      formattedPhone, 
      `Call recording available: ${recording_url}`
    );
    
    console.log(`Recording available for call ID ${call_id}: ${recording_url}`);
  } catch (error) {
    console.error('Error handling recording.available event:', error);
  }
}

// Handle when a transcription becomes available
async function handleTranscriptionAvailable(data) {
  const { call_id, phone_number, transcription } = data;
  
  try {
    // Format phone for GHL
    const formattedPhone = phone_number.startsWith('+') ? phone_number : `+1${phone_number.replace(/\D/g, '')}`;
    
    // Add a note with the transcription
    await addGHLNote(
      formattedPhone, 
      `Call Transcription:\n\n${transcription}`
    );
    
    // Extract lead name from transcription
    const extractedName = extractNameFromTranscription(transcription);
    
    if (extractedName) {
      console.log(`Extracted name from transcription: ${extractedName}`);
      
      // Update GHL contact with the extracted name
      await updateGHLContact(formattedPhone, {
        name: extractedName
      });
      
      await addGHLNote(
        formattedPhone,
        `Lead name extracted from call: ${extractedName}`
      );
    }
    
    console.log(`Transcription available for call ID ${call_id}`);
  } catch (error) {
    console.error('Error handling transcription.available event:', error);
  }
}

// Function to extract name from transcription
function extractNameFromTranscription(transcription) {
  if (!transcription) return null;
  
  // Common patterns for name extraction in a conversation
  const namePatterns = [
    /my name is ([A-Z][a-z]+ [A-Z][a-z]+)/i,
    /my name is ([A-Z][a-z]+)/i,
    /I'm ([A-Z][a-z]+ [A-Z][a-z]+)/i,
    /I am ([A-Z][a-z]+ [A-Z][a-z]+)/i,
    /this is ([A-Z][a-z]+ [A-Z][a-z]+)/i,
    /this is ([A-Z][a-z]+)/i,
    /call me ([A-Z][a-z]+ [A-Z][a-z]+)/i,
    /call me ([A-Z][a-z]+)/i,
    /speaking with ([A-Z][a-z]+ [A-Z][a-z]+)/i,
    /speaking with ([A-Z][a-z]+)/i
  ];
  
  // Try each pattern
  for (const pattern of namePatterns) {
    const match = transcription.match(pattern);
    if (match && match[1]) {
      return match[1]; // Return the captured name
    }
  }
  
  // Try looking for a more generic name pattern near the beginning of the conversation
  // This is less precise but can catch cases like "Hi, John here"
  const lines = transcription.split('\n').slice(0, 10); // Check first 10 lines
  for (const line of lines) {
    // Look for text that might be a greeting followed by a name
    const match = line.match(/(?:hi|hello|hey|this is)[,.\s]+([A-Z][a-z]+(?: [A-Z][a-z]+)?)/i);
    if (match && match[1]) {
      return match[1];
    }
  }
  
  return null; // No name found
}

// Helper function to update contact in Go High Level
async function updateGHLContact(phoneNumber, updateData) {
  const GHL_API_KEY = process.env.GHL_API_KEY;
  
  if (!GHL_API_KEY) {
    throw new Error('GHL_API_KEY is not configured');
  }
  
  try {
    // First, lookup contact by phone number
    const searchResponse = await fetch(
      `https://rest.gohighlevel.com/v1/contacts/lookup?phone=${encodeURIComponent(phoneNumber)}`,
      {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${GHL_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );
    
    if (!searchResponse.ok) {
      console.error(`GHL lookup failed: ${searchResponse.status}`);
      const errorText = await searchResponse.text();
      console.error("GHL error details:", errorText);
      throw new Error(`GHL search failed: ${searchResponse.status}`);
    }
    
    const searchData = await searchResponse.json();
    
    // Check if contact exists
    if (searchData?.contacts?.length > 0) {
      const contactId = searchData.contacts[0].id;
      
      // Update the contact with call information
      const updateResponse = await fetch(
        `https://rest.gohighlevel.com/v1/contacts/${contactId}`,
        {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${GHL_API_KEY}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            ...updateData,
            lastUpdate: new Date().toISOString()
          })
        }
      );
      
      if (!updateResponse.ok) {
        console.error(`GHL update failed: ${updateResponse.status}`);
        const errorText = await updateResponse.text();
        console.error("GHL error details:", errorText);
        throw new Error(`GHL update failed: ${updateResponse.status}`);
      }
      
      console.log(`Updated GHL contact: ${contactId} with call data`);
      return contactId;
    } else {
      console.log(`No GHL contact found for phone number: ${phoneNumber}`);
      return null;
    }
  } catch (error) {
    console.error('Error updating GHL contact:', error);
    throw error;
  }
}

// Helper function to add a note to a contact in GHL
async function addGHLNote(phoneNumber, noteText) {
  const GHL_API_KEY = process.env.GHL_API_KEY;
  
  if (!GHL_API_KEY) {
    throw new Error('GHL_API_KEY is not configured');
  }
  
  try {
    // First, lookup contact by phone number
    const searchResponse = await fetch(
      `https://rest.gohighlevel.com/v1/contacts/lookup?phone=${encodeURIComponent(phoneNumber)}`,
      {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${GHL_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );
    
    if (!searchResponse.ok) {
      throw new Error(`GHL search failed: ${searchResponse.status}`);
    }
    
    const searchData = await searchResponse.json();
    
    // Check if contact exists
    if (searchData?.contacts?.length > 0) {
      const contactId = searchData.contacts[0].id;
      
      // Add note to the contact
      const noteResponse = await fetch(
        `https://rest.gohighlevel.com/v1/contacts/${contactId}/notes`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${GHL_API_KEY}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            body: noteText
          })
        }
      );
      
      if (!noteResponse.ok) {
        throw new Error(`GHL note creation failed: ${noteResponse.status}`);
      }
      
      console.log(`Added note to GHL contact: ${contactId}`);
      return true;
    } else {
      console.log(`No GHL contact found for phone number: ${phoneNumber}`);
      return false;
    }
  } catch (error) {
    console.error('Error adding GHL note:', error);
    throw error;
  }
}