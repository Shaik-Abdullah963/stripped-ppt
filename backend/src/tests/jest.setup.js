// backend/src/tests/jest.setup.js
import { sequelize } from '../config/database.js';

export async function setupDatabase() {
  await sequelize.authenticate();
  await sequelize.sync({ force: true });
}

export async function teardownDatabase() {
  await sequelize.close();
}
