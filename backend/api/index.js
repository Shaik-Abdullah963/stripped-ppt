// Import the handler from server.js and re-export it
import handler from '../server.js';

// Export the handler for Vercel to use
export default async function apiHandler(req, res) {
  try {
    return await handler(req, res);
  } catch (error) {
    console.error('API handler error:', error);
    res.status(500).send('Internal Server Error');
  }
}