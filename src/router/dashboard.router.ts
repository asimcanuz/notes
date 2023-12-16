import express, {  Response } from 'express';
import AuthenticatedRequest from '../express';

const router = express.Router();


// Route handler for '/dashboard' path
router.get('/', (req, res) => {
    // Your route handling logic
    res.render('dashboard', { title: 'Dashboard', user: req.user });
});

export default router;