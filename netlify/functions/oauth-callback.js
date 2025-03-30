const fetch = require('node-fetch');

exports.handler = async (event) => {
  const code = event.queryStringParameters.code;

  const response = await fetch('https://marketplace.gohighlevel.com/oauth/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      grant_type: 'authorization_code',
      code: code,
      client_id: process.env.GHL_CLIENT_ID,
      client_secret: process.env.GHL_CLIENT_SECRET,
      redirect_uri: 'https://level16media.com/.netlify/functions/oauth-callback'
    })
  });

  const data = await response.json();

  // 💾 Store tokens somewhere (Netlify environment vars, DB, etc.)
  console.log('GHL OAuth Token Response:', data);

  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'OAuth Success!', tokens: data })
  };
};
