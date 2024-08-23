import fetch from 'node-fetch';

// Load the Telegram bot token from environment variables
const TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const BASE_URL = `https://api.telegram.org/bot${TOKEN}`;

// Function to send a message to a specific Telegram chat
const sendMessage = async (chatId, text) => {
  const url = `${BASE_URL}/sendMessage`;
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      chat_id: chatId,
      text,
    }),
  });

  return response.json();
};

// Function to handle incoming webhook updates
export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { message } = req.body;

    if (message && message.text) {
      const chatId = message.chat.id;
      const text = 'Hello, this is your bot speaking!';

      try {
        await sendMessage(chatId, text);
        res.status(200).send('Message sent!');
      } catch (error) {
        console.error('Error sending message:', error);
        res.status(500).send('Failed to send message');
      }
    } else {
      res.status(200).send('No message to respond to');
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
