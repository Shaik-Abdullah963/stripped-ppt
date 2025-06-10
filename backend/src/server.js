import express from 'express';
import { sequelize } from './config/database.js';

const app = express();
app.use(express.json());

app.get('/', (req, res) => res.send('OK'));

async function startServer() {
  try {
    await sequelize.authenticate();
    console.log('✅ SQLite connected');
    await sequelize.sync();
    console.log('📦 DB synced');
    const port = process.env.PORT || 3002;
    app.listen(port, () => console.log(`🚀 Listening on ${port}`));
  } catch (err) {
    console.error('❌ DB startup failed:', err);
    process.exit(1);
  }
}

if (process.env.NODE_ENV !== 'test') {
  startServer();
}

export default app;
