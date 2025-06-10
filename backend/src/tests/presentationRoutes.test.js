import request       from 'supertest';
import app           from '../server.js';
import { sequelize } from '../config/database.js';

beforeAll(async () => {
  await sequelize.sync({ force: true });
});
afterAll(async () => {
  await sequelize.close();
});

describe('Presentation Routes', () => {
  let presId;

  it('POST /presentations → 201 + payload', async () => {
    const res = await request(app)
      .post('/presentations')
      .send({ title: 'Test Deck' });
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('id');
    presId = res.body.id;
  });

  it('GET /presentations → 200 + array', async () => {
    const res = await request(app).get('/presentations');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body[0].id).toBe(presId);
  });

  it('GET /presentations/:id → 200 + one', async () => {
    const res = await request(app).get(`/presentations/${presId}`);
    expect(res.status).toBe(200);
    expect(res.body.id).toBe(presId);
  });

  it('PUT /presentations/:id → 200 + updated', async () => {
    const res = await request(app)
      .put(`/presentations/${presId}`)
      .send({ title: 'Updated Deck' });
    expect(res.status).toBe(200);
    expect(res.body.title).toBe('Updated Deck');
  });

  it('DELETE /presentations/:id → 204 + gone', async () => {
    const del = await request(app).delete(`/presentations/${presId}`);
    expect(del.status).toBe(204);
    const get = await request(app).get(`/presentations/${presId}`);
    expect(get.status).toBe(404);
  });
});
