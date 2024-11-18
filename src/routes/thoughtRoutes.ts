import { Router } from 'express';
import {
  getAllThoughts,
  getThoughtById,
  createThought,
  updateThought,
  deleteThought,
  addReaction,
  removeReaction
} from '../controllers/thoughtController';

const router = Router();

router.get('/', getAllThoughts);

router.get('/:thoughtId', getThoughtById);

router.post('/', createThought);

router.put('/:thoughtId', updateThought);

router.delete('/:thoughtId', deleteThought);

router.post('/:thoughtId/reactions', addReaction);

router.delete('/:thoughtId/reactions/:reactionId', removeReaction);

export default router;
