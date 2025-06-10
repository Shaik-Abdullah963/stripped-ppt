import { Router } from 'express';
import {
  createSlideVersion,
  listSlideVersions,
  getSlideVersionById,
  updateSlideVersion,
  deleteSlideVersion
} from '../controllers/slideVersionController.js';

const router = Router({ mergeParams: true });
router.post('/',    createSlideVersion);
router.get('/',     listSlideVersions);
router.get('/:id',  getSlideVersionById);
router.put('/:id',  updateSlideVersion);
router.delete('/:id', deleteSlideVersion);
export default router;
