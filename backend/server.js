import express from 'express';
import cors from 'cors';
import { sequelize } from './src/config/database.js';
import presentationsRouter from './src/routes/presentationRoute.js';
import slidesRouter from './src/routes/slide.js';
import slideVersionsRouter from './src/routes/slideVersions.js';
import { initializeAssociations } from './src/models/associations.js';

// Initialize associations
initializeAssociations();

// Create Express app
const app = express();

// Add CORS middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// Routes
app.get('/', (req, res) => res.send('OK'));
app.use('/presentations', presentationsRouter);
app.use('/presentations/:presentationId/slides', slidesRouter);
app.use('/slides/:slideId/versions', slideVersionsRouter);

// Enhance database initialization
let dbPromise = sequelize.authenticate()
  .then(() => {
    console.log('Database authenticated');
    return sequelize.sync();
  })
  .then(() => {
    console.log('Database synced');
    return true;
  })
  .catch((err) => {
    console.error('Database initialization error:', err);
    return false;
  });

// Improve error handling in handler function
export default async function handler(req, res) {
  try {
    // Wait for database initialization
    console.log('Waiting for DB initialization...');
    await dbPromise;
    console.log('DB initialized, processing request for', req.url);
    
    // Process the request with Express
    return new Promise((resolve, reject) => {
      app(req, res);
      
      // These event handlers ensure the function doesn't hang
      res.on('finish', resolve);
      res.on('error', reject);
    });
  } catch (error) {
    console.error('Serverless function error:', error);
    res.status(500).json({ error: 'Internal server error', message: error.message });
  }
}