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

// Database initialization middleware for serverless
app.use(async (req, res, next) => {
  try {
    await sequelize.initializeForServerless();
    next();
  } catch (error) {
    console.error('Failed to initialize database:', error);
    next(); // Continue anyway to avoid blocking all requests
  }
});

// Routes
app.get('/', (req, res) => res.send('OK'));
app.use('/presentations', presentationsRouter);
app.use('/slides', slidesRouter);
app.use('/slides/:slideId/versions', slideVersionsRouter);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Express error:', err);
  res.status(500).json({ error: 'Internal Server Error' });
});

// Start server in development
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

// Export for serverless environments
export default app;