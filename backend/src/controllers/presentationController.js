// backend/src/controllers/presentationController.js
import { Presentation } from '../models/Presentation.js';

export async function createPresentation(req, res, next) {
  try {
    const { title } = req.body;
    if (!title) return res.status(400).json({ error: 'title is required' });
    const pres = await Presentation.create({ title });
    res.status(201).json(pres);
  } catch (err) {
    next(err);
  }
}

export async function listPresentations(req, res, next) {
  try {
    const all = await Presentation.findAll({ order: [['created_at','ASC']] });
    res.json(all);
  } catch (err) {
    next(err);
  }
}

export async function getPresentationById(req, res, next) {
  try {
    const pres = await Presentation.findByPk(req.params.id);
    if (!pres) return res.status(404).json({ error: 'not found' });
    res.json(pres);
  } catch (err) {
    next(err);
  }
}

export async function updatePresentation(req, res, next) {
  try {
    const pres = await Presentation.findByPk(req.params.id);
    if (!pres) return res.status(404).json({ error: 'not found' });
    const { title } = req.body;
    if (!title) return res.status(400).json({ error: 'title is required' });
    await pres.update({ title });
    res.json(pres);
  } catch (err) {
    next(err);
  }
}

export async function deletePresentation(req, res, next) {
  try {
    const pres = await Presentation.findByPk(req.params.id);
    if (!pres) return res.status(404).json({ error: 'not found' });
    await pres.destroy();
    res.status(204).end();
  } catch (err) {
    next(err);
  }
}
