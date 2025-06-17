import express from 'express';
import cors from 'cors';
import { sequelize } from './config/database.js';
import presentationsRouter from './routes/presentationRoute.js';
import slidesRouter from './routes/slide.js';
import slideVersionsRouter from './routes/slideVersions.js';
import { initializeAssociations } from './models/associations.js';

// Initialize database associations
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

// Health check endpoint
app.get('/', (req, res) => res.send('OK'));
app.use('/presentations', presentationsRouter);
app.use('/presentations/:presentationId/slides', slidesRouter);
app.use('/slides/:slideId/versions', slideVersionsRouter);

// Initialize database on cold start
let isDbInitialized = false;

async function initializeDb() {
  if (!isDbInitialized) {
    try {
      await sequelize.authenticate();
      await sequelize.sync();
      isDbInitialized = true;
      console.log('Database connected and synced');
    } catch (err) {
      console.error('Database initialization error:', err);
      // Don't exit process in serverless
    }
  }
}

// For local development server only
if (process.env.NODE_ENV !== 'production' && process.env.NODE_ENV !== 'test') {
  const port = process.env.PORT || 3002;
  
  // Local server needs database initialized before listening
  initializeDb().then(() => {
    app.listen(port, () => {
      console.log(`Local server running on port ${port}`);
    });
  });
}

// Serverless handler - Vercel will use this
export default async (req, res) => {
  // Initialize database on cold start
  await initializeDb();
  // Handle request with Express
  return app(req, res);
};