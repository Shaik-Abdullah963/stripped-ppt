import path from 'path';
import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();
const file = process.env.DB_FILE || './backend/data/dev.sqlite';

const storagePath = path.resolve(file);

export const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: storagePath,
  logging: false,
});