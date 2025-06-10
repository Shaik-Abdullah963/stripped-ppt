// backend/src/tests/Slide.test.js
import { sequelize } from '../config/database.js';
import { Presentation } from '../models/Presentation.js';
import { Slide }        from '../models/Slide.js';

beforeAll(async () => {
  // connect & build fresh schema in the test DB
  await sequelize.authenticate();
  await sequelize.sync({ force: true });
});

afterAll(async () => {
  // close the connection when we're done
  await sequelize.close();
});

describe('Slide model', () => {
  it('can create a Slide linked to a Presentation', async () => {
    // first, create a Presentation to link to
    const pres  = await Presentation.create({ title: 'Deck for Slides' });
    // then, create a Slide for that presentation
    const slide = await Slide.create({ presentation_id: pres.id });

    expect(slide.id).toBeGreaterThan(0);
    expect(slide.presentation_id).toBe(pres.id);
    // current_version_id should default to null
    expect(slide.current_version_id).toBeNull();
    // timestamps should exist
    expect(slide.createdAt).toBeDefined();
    expect(slide.updatedAt).toBeDefined();
  });

  it('cascades delete when the parent Presentation is destroyed', async () => {
    // create another presentation & slide
    const pres2  = await Presentation.create({ title: 'Another Deck' });
    const slide2 = await Slide.create({ presentation_id: pres2.id });

    // deleting the presentation should remove the slide as well
    await pres2.destroy();
    const found = await Slide.findByPk(slide2.id);
    expect(found).toBeNull();
  });

  it('allows updating current_version_id independently', async () => {
    const pres3  = await Presentation.create({ title: 'Deck 3' });
    const slide3 = await Slide.create({ presentation_id: pres3.id });

    // simulate setting the current version pointer
    await slide3.update({ current_version_id: 42 });
    const reloaded = await Slide.findByPk(slide3.id);
    expect(reloaded.current_version_id).toBe(42);
  });
});
