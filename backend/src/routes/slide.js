import { Router } from 'express';
import {
  createSlide,
  listSlides,
  getSlideById,
  updateSlide,
  deleteSlide
} from '../controllers/slideController.js';

const router = Router({ mergeParams: true });
router.post('/',    createSlide);
router.get('/',     listSlides);
router.get('/:id',  getSlideById);
router.put('/:id',  updateSlide);
router.delete('/:id', deleteSlide);
export default router;
