import express from 'express';
import loginController from '../controllers/login.controller';

const router = express.Router();

router.get('/', loginController.renderLoginView);

router.post('/', loginController.login);

export default router;