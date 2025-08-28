import express from 'express';
import { noteController } from '../controllers/noteController.js';

const router = express.Router();

router.get('/', noteController.getAllNotes);
router.get('/:id', noteController.getNoteById);
router.post('/', noteController.createNote);
router.put('/:id', noteController.updateNote);
router.delete('/', noteController.deleteAllNotes);
router.delete('/:id', noteController.deleteNote);

export default router;