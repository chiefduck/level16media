import axios from 'axios';

// API configuration
const BLAND_API_KEY = import.meta.env.VITE_BLAND_API_KEY;
const BLAND_API_URL = 'https://api.bland.ai/v1';

/**
 * Makes an AI-powered phone call using the Bland.ai API
 * @param phoneNumber - The phone number to call
 * @returns Promise with the call response data
 * @throws Error if the API call fails
 */
export async function makePhoneCall(phoneNumber: string) {
  try {
    const response = await axios.post(`${BLAND_API_URL}/calls`, {
      phone_number: phoneNumber,
      // Voice configuration
      voice_id: 'rachel',  // Natural-sounding female voice
      task: 'demo_call',   // Task identifier for analytics
      
      // Initial message and context
      initial_message: "Hi! I'm Rachel from Level 16 Media. I'm calling to give you a quick demo of our AI voice assistant. This is exactly how our system would interact with your potential clients. Would you like to hear more about how this could work for your business?",
      model: "gpt-4-turbo",
      temperature: 0.7,
      context: "You are Rachel, a friendly AI assistant from Level 16 Media. Your goal is to demonstrate the capabilities of our AI voice system in a natural, engaging way. Keep responses concise and focus on showing how the system handles real conversations.",
      
      // Performance optimization
      reduce_latency: true,
      end_call_after_silence: 3000,
    }, {
      headers: {
        'Authorization': `Bearer ${BLAND_API_KEY}`,
        'Content-Type': 'application/json'
      }
    });

    return response.data;
  } catch (error) {
    console.error('Error making Bland.ai call:', error);
    throw error;
  }
}