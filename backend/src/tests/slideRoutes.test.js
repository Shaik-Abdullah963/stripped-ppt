import request       from 'supertest';
import app           from '../server.js';
import { sequelize } from '../config/database.js';

beforeAll(async () => {
  await sequelize.sync({ force: true });
});
afterAll(async () => {
  await sequelize.close();
});

describe('Slide Routes', () => {
  let presId, slideId;

  it('setup: create a presentation', async () => {
    const res = await request(app)
      .post('/presentations')
      .send({ title: 'Slide Deck' });
    presId = res.body.id;
  });

  it('POST /presentations/:presentationId/slides → 201', async () => {
    const res = await request(app)
      .post(`/presentations/${presId}/slides`)
      .send({});
    expect(res.status).toBe(201);
    expect(res.body.presentation_id).toBe(presId);
    slideId = res.body.id;
  });

  it('GET /presentations/:presentationId/slides → 200 + list', async () => {
    const res = await request(app).get(`/presentations/${presId}/slides`);
    expect(res.status).toBe(200);
    expect(res.body[0].id).toBe(slideId);
  });

  it('PUT /presentations/:presentationId/slides/:id → 200 + update', async () => {
    const res = await request(app)
      .put(`/presentations/${presId}/slides/${slideId}`)
      .send({ current_version_id: 1 });
    expect(res.status).toBe(200);
    expect(res.body.current_version_id).toBe(1);
  });

  it('DELETE /presentations/:presentationId/slides/:id → 204', async () => {
    const res = await request(app)
      .delete(`/presentations/${presId}/slides/${slideId}`);
    expect(res.status).toBe(204);
  });
});
