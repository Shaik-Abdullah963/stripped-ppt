import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config();

const isProd = process.env.NODE_ENV === 'production';
let sequelize;

if (isProd) {
  // Use in-memory SQLite for production (Vercel serverless environment)
  sequelize = new Sequelize('sqlite::memory:', {
    dialect: 'sqlite',
    logging: false
  });
  
  console.log('WARNING: Using in-memory SQLite database. Data will not persist between requests!');
} else {
  // Use file-based SQLite for development
  const file = process.env.DB_FILE || './data/dev.sqlite';
  const storagePath = path.resolve(file);
  
  sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: storagePath,
    logging: false
  });
}

export { sequelize };