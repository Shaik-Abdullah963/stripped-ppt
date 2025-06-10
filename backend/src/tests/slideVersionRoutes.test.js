import request       from 'supertest';
import app           from '../server.js';
import { sequelize } from '../config/database.js';

beforeAll(async () => {
  await sequelize.sync({ force: true });
});
afterAll(async () => {
  await sequelize.close();
});

describe('SlideVersion Routes', () => {
  let presId, slideId, versionId;

  it('setup: create presentation & slide', async () => {
    const p = await request(app)
      .post('/presentations')
      .send({ title: 'Version Deck' });
    presId  = p.body.id;
    const s = await request(app)
      .post(`/presentations/${presId}/slides`)
      .send({});
    slideId = s.body.id;
  });

  it('POST /slides/:slideId/versions → 201 + create', async () => {
    const res = await request(app)
      .post(`/slides/${slideId}/versions`)
      .send({
        slide_order:      0,
        layout_type:      'title',
        markdown_content: '# Hello'
      });
    expect(res.status).toBe(201);
    versionId = res.body.id;
  });

  it('GET /slides/:slideId/versions → 200 + list', async () => {
    const res = await request(app).get(`/slides/${slideId}/versions`);
    expect(res.status).toBe(200);
    expect(res.body.find(v => v.id === versionId)).toBeTruthy();
  });

  it('PUT /slides/:slideId/versions/:id → 200 + update', async () => {
    const res = await request(app)
      .put(`/slides/${slideId}/versions/${versionId}`)
      .send({ slide_order: 2 });
    expect(res.status).toBe(200);
    expect(res.body.slide_order).toBe(2);
  });

  it('DELETE /slides/:slideId/versions/:id → 204 + gone', async () => {
    await request(app).delete(`/slides/${slideId}/versions/${versionId}`)
      .expect(204);
    await request(app).get(`/slides/${slideId}/versions/${versionId}`)
      .expect(404);
  });
});
