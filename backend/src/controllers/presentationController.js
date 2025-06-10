// backend/src/controllers/presentationController.js
import { Presentation } from '../models/Presentation.js';

/**
 * POST /presentations
 * Creates a new Presentation record.
 * Expects { title: string } in the JSON body.
 */
export async function createPresentation(req, res, next) {
  try {
    const { title } = req.body;
    if (!title || typeof title !== 'string') {
      return res
        .status(400)
        .json({ error: 'Invalid payload: `title` is required and must be a string.' });
    }

    const pres = await Presentation.create({ title });
    // respond with the newly created record (id, title, created_at, updated_at)
    res.status(201).json(pres);
  } catch (err) {
    next(err);
  }
}
