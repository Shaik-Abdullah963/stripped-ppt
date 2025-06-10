import { Router } from 'express';
import {
  createPresentation,
  listPresentations,
  getPresentationById,
  updatePresentation,
  deletePresentation
} from '../controllers/presentationController.js';

const router = Router();
router.post('/',    createPresentation);
router.get('/',     listPresentations);
router.get('/:id',  getPresentationById);
router.put('/:id',  updatePresentation);
router.delete('/:id', deletePresentation);
export default router;
