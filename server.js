// api/send-email.js
import fetch from 'node-fetch';

export default async function handler(req, res) {
  const { firstName, lastName, email, message } = req.body;

  try {
    const response = await fetch('https://send.api.mailtrap.io/api/send', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer YOUR_API_TOKEN',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: {
          email: "your-inbox@inbox.mailtrap.io",
          name: "Legal Shops"
        },
        to: [
          {
            email: "naveensirji25@gmail.com"
          }
        ],
        subject: `New message from ${firstName} ${lastName}`,
        text: message
      })
    });

    const result = await response.json();
    res.status(200).json({ success: true, result });
  } catch (error) {
    console.error('Email API Error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
}
