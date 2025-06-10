// backend/src/tests/SlideVersion.test.js
import { sequelize }        from '../config/database.js';
import { Presentation }     from '../models/Presentation.js';
import { Slide }            from '../models/slide.js';
import { SlideVersion }     from '../models/Slideversion.js';

beforeAll(async () => {
  // connect & build fresh schema in the test DB
  await sequelize.authenticate();
  await sequelize.sync({ force: true });
});

afterAll(async () => {
  // close the connection when we're done
  await sequelize.close();
});

describe('SlideVersion model', () => {
  it('can create a version with all required fields', async () => {
    // set up a presentation and slide
    const pres  = await Presentation.create({ title: 'Deck for Versions' });
    const slide = await Slide.create({ presentation_id: pres.id });

    // create a SlideVersion
    const version = await SlideVersion.create({
      slide_id:         slide.id,
      version_number:   1,
      slide_order:      0,
      layout_type:      'title',
      markdown_content: '# Hello World'
    });

    expect(version.id).toBeGreaterThan(0);
    expect(version.slide_id).toBe(slide.id);
    expect(version.version_number).toBe(1);
    expect(version.slide_order).toBe(0);
    expect(version.layout_type).toBe('title');
    expect(version.markdown_content).toBe('# Hello World');
    // timestamps
    expect(version.createdAt).toBeDefined();
    expect(version.updatedAt).toBeDefined();
  });

  it('enforces the unique (slide_id, version_number) constraint', async () => {
    const pres  = await Presentation.create({ title: 'Deck UQ' });
    const slide = await Slide.create({ presentation_id: pres.id });

    // first version_number = 1 should succeed
    await SlideVersion.create({
      slide_id:         slide.id,
      version_number:   1,
      slide_order:      1,
      layout_type:      'body',
      markdown_content: 'First'
    });

    // second version with same slide_id & version_number should throw
    await expect(
      SlideVersion.create({
        slide_id:         slide.id,
        version_number:   1,
        slide_order:      2,
        layout_type:      'body',
        markdown_content: 'Duplicate'
      })
    ).rejects.toThrow();
  });

  it('cascades delete when the parent Slide is destroyed', async () => {
    const pres  = await Presentation.create({ title: 'Deck Cascade' });
    const slide = await Slide.create({ presentation_id: pres.id });

    // create two versions
    const v1 = await SlideVersion.create({
      slide_id:         slide.id,
      version_number:   1,
      slide_order:      0,
      layout_type:      'title',
      markdown_content: 'Version 1'
    });
    const v2 = await SlideVersion.create({
      slide_id:         slide.id,
      version_number:   2,
      slide_order:      1,
      layout_type:      'body',
      markdown_content: 'Version 2'
    });

    // destroy the slide
    await slide.destroy();

    // both versions should be gone
    const found1 = await SlideVersion.findByPk(v1.id);
    const found2 = await SlideVersion.findByPk(v2.id);
    expect(found1).toBeNull();
    expect(found2).toBeNull();
  });
});
