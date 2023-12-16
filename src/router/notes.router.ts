import express from 'express';
import { notesController } from '../controllers/notes.controller';

const router = express.Router();

// Define routes related to notes
router.get('/', notesController.getAllNotes);

router.post('/', notesController.createNote);

export default router;