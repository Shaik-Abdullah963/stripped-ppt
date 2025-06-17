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
  
  // Flag to track if we've seeded this instance
  let isSeeded = false;
  
  // Add a method to initialize the database before handling requests
  sequelize.initializeForServerless = async () => {
    if (!isSeeded) {
      try {
        // Sync tables first
        await sequelize.sync();
        
        // Then seed with demo data (we'll import this in the next step)
        const { seedDatabase } = await import('../utils/seedData.js');
        await seedDatabase();
        
        isSeeded = true;
        console.log('In-memory database initialized with seed data');
      } catch (error) {
        console.error('Error seeding database:', error);
      }
    }
    return sequelize;
  };
  
  console.log('WARNING: Using in-memory SQLite database. Data will not persist between requests!');
} else {
  // Development code stays the same
  const file = process.env.DB_FILE || './data/dev.sqlite';
  const storagePath = path.resolve(file);
  
  sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: storagePath,
    logging: false
  });
  
  // Add empty implementation for dev environment
  sequelize.initializeForServerless = async () => sequelize;
}

export { sequelize };