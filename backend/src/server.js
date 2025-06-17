import express from 'express';
import cors from 'cors';
import { sequelize } from './config/database.js';
import presentationsRouter from './routes/presentationRoute.js';
import slidesRouter from './routes/slide.js';
import slideVersionsRouter from './routes/slideVersions.js';
import { initializeAssociations } from './models/associations.js';

initializeAssociations();
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

async function startServer() {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    const port = process.env.PORT || 3002;
    app.listen(port, () => {
      // For your take-home assignment, keeping logs is fine
      console.log(`Server running on port ${port}`);
    });
  } catch (err) {
    console.error('Database startup failed:', err);
    process.exit(1);
  }
}

if (process.env.NODE_ENV !== 'test') {
  startServer();
}

export default app;