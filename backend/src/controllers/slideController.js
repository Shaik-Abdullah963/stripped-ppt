// backend/src/controllers/slideController.js
import { DataTypes, Op } from 'sequelize';
import { Slide }        from '../models/Slid.js';
import { Presentation } from '../models/Presentation.js';
// Add this at the top of your file with other imports
import { SlideVersion } from '../models/SlideVersion.js';  // Adjust filename casing if needed

export async function createSlide(req, res, next) {
  try {
    const pres = await Presentation.findByPk(req.params.presentationId);
    if (!pres) return res.status(404).json({ error: 'presentation not found' });
    const slide = await Slide.create({ presentation_id: pres.id });
    res.status(201).json(slide);
  } catch (err) {
    next(err);
  }
}

export async function listSlides(req, res, next) {
  try {
    const slides = await Slide.findAll({
      where: { presentation_id: req.params.presentationId },
      order: [['created_at','ASC']]
    });
    
    // For each slide, fetch its latest version separately
    const slidesWithLatest = await Promise.all(slides.map(async (slide) => {
      const latestVersion = await SlideVersion.findOne({
        where: { slide_id: slide.id },
        order: [['version_number', 'DESC']]
      });
      
      const slideObj = slide.toJSON();
      slideObj.latestVersion = latestVersion; 
      return slideObj;
    }));
    
    res.json(slidesWithLatest);
  } catch (err) {
    next(err);
  }
}

export async function getSlideById(req, res, next) {
  try {
    const slide = await Slide.findOne({
      where: {
        id: req.params.id,
        presentation_id: req.params.presentationId
      }
    });
    if (!slide) return res.status(404).json({ error: 'slide not found' });
    res.json(slide);
  } catch (err) {
    next(err);
  }
}

export async function updateSlide(req, res, next) {
  try {
    const slide = await Slide.findByPk(req.params.id);
    if (!slide) return res.status(404).json({ error: 'slide not found' });
    const { current_version_id } = req.body;
    await slide.update({ current_version_id });
    res.json(slide);
  } catch (err) {
    next(err);
  }
}

export async function deleteSlide(req, res, next) {
  try {
    const slide = await Slide.findByPk(req.params.id);
    if (!slide) return res.status(404).json({ error: 'slide not found' });
    await slide.destroy();
    res.status(204).end();
  } catch (err) {
    next(err);
  }
}
