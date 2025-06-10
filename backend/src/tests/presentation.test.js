import request from 'supertest';
import { sequelize } from '../config/database.js';
import app from '../server.js';

beforeAll(async () => {
  // reset DB
  await sequelize.sync({ force: true });
});

afterAll(async () => {
  await sequelize.close();
});

describe('POST /presentations', () => {
  it('should create a new presentation', async () => {
    const res = await request(app)
      .post('/presentations')
      .send({ title: 'My First Deck' });
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('id');
    expect(res.body.title).toBe('My First Deck');
  });
});
