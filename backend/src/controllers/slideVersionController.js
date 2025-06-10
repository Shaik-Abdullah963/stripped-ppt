// backend/src/controllers/slideVersionController.js
import { SlideVersion } from '../models/Slideversion.js';
import { Slide }        from '../models/slide.js';

export async function createSlideVersion(req, res, next) {
  try {
    const slide = await Slide.findByPk(req.params.slideId);
    if (!slide) return res.status(404).json({ error: 'slide not found' });

    const { slide_order, layout_type, markdown_content } = req.body;
    if ([slide_order, layout_type, markdown_content].some(v => v == null)) {
      return res.status(400).json({ error: 'slide_order, layout_type and markdown_content are required' });
    }

    // AUTO-INCREMENT version_number:
    // 1) Find the current highest version for this slide
    const maxVersion = await SlideVersion.max('version_number', {
      where: { slide_id: slide.id }
    });
    const nextVersion = (maxVersion || 0) + 1;

    // 2) Create the new version with that number
    const sv = await SlideVersion.create({
      slide_id:         slide.id,
      version_number:   nextVersion,
      slide_order,
      layout_type,
      markdown_content
    });

    res.status(201).json(sv);
  } catch (err) {
    next(err);
  }
}

export async function listSlideVersions(req, res, next) {
  try {
    const versions = await SlideVersion.findAll({
      where: { slide_id: req.params.slideId },
      order: [['version_number','ASC']]
    });
    res.json(versions);
  } catch (err) {
    next(err);
  }
}

export async function getSlideVersionById(req, res, next) {
  try {
    const sv = await SlideVersion.findOne({
      where: {
        id: req.params.id,
        slide_id: req.params.slideId
      }
    });
    if (!sv) return res.status(404).json({ error: 'version not found' });
    res.json(sv);
  } catch (err) {
    next(err);
  }
}

export async function updateSlideVersion(req, res, next) {
  try {
    const sv = await SlideVersion.findByPk(req.params.id);
    if (!sv) return res.status(404).json({ error: 'version not found' });
    await sv.update(req.body);
    res.json(sv);
  } catch (err) {
    next(err);
  }
}

export async function deleteSlideVersion(req, res, next) {
  try {
    const sv = await SlideVersion.findByPk(req.params.id);
    if (!sv) return res.status(404).json({ error: 'version not found' });
    await sv.destroy();
    res.status(204).end();
  } catch (err) {
    next(err);
  }
}
