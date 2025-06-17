import express from 'express';
import cors from 'cors';
import { sequelize } from '../src/config/database.js';
import presentationsRouter from '../src/routes/presentationRoute.js';
import slidesRouter from '../src/routes/slide.js';
import slideVersionsRouter from '../src/routes/slideVersions.js';
import { initializeAssociations } from '../src/models/associations.js';

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

// Initialize database on each cold start (serverless function invocation)
let dbPromise = sequelize.authenticate()
  .then(() => sequelize.sync())
  .then(() => {
    console.log('Database connected and synced');
    return true;
  })
  .catch((err) => {
    console.error('Database initialization error:', err);
    return false;
  });

// Export the handler
export default async function handler(req, res) {
  // Wait for database initialization
  await dbPromise;
  
  // Process the request with Express
  return app(req, res);
}