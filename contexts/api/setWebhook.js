// pages/api/setWebhook.js
import axios from 'axios';

const TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const BASE_URL = `https://api.telegram.org/bot${TOKEN}`;

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const url = `https://YOUR_SERVER_URL/api/telegram`; // Replace with your deployed URL

    try {
      await axios.post(`${BASE_URL}/setWebhook`, { url: url });
      res.status(200).json({ status: 'Webhook set' });
    } catch (error) {
      console.error('Error setting webhook:', error);
      res.status(500).json({ error: 'Failed to set webhook' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
