// backend/src/tests/Presentation.test.js
import { setupDatabase, teardownDatabase } from './jest.setup.js';
import { Presentation } from '../models/Presentation.js';

beforeAll(setupDatabase);
afterAll(teardownDatabase);

describe('Presentation model', () => {
  it('can create with a title and auto‐set timestamps', async () => {
    const pres = await Presentation.create({ title: 'Deck A' });
    expect(pres.id).toBeGreaterThan(0);
    expect(pres.title).toBe('Deck A');
    expect(pres.createdAt).toBeDefined();
    expect(pres.updatedAt).toBeDefined();
  });

  it('rejects creation without title', async () => {
    await expect(Presentation.create({})).rejects.toThrow();
  });
});
