import express from 'express';
import registerController from '../controllers/register.controller';

const router = express.Router();

// Render the registration view
router.get('/', registerController.renderRegisterView);

// Register a new user
router.post('/', registerController.register);

export default router;