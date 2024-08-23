// pages/api/telegram.js
import axios from 'axios';

const TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const BASE_URL = `https://api.telegram.org/bot${TOKEN}`;

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { update_id, message } = req.body;
    if (message && message.text) {
      const chatId = message.chat.id;
      const text = `You said: ${message.text}`;

      try {
        await axios.post(`${BASE_URL}/sendMessage`, {
          chat_id: chatId,
          text: text
        });
        res.status(200).json({ status: 'Message sent' });
      } catch (error) {
        console.error('Error sending message:', error);
        res.status(500).json({ error: 'Failed to send message' });
      }
    } else {
      res.status(400).json({ error: 'Invalid message' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
