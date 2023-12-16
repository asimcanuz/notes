import express from 'express';
import jwt from 'jsonwebtoken';
import { generateAccessToken } from '../utils/tokenUtils';

const router = express.Router();

router.post('/refresh', (req, res) => {
    const refreshToken = req.body.token;

    if (!refreshToken) {
        return res.sendStatus(401);
    }

    jwt.verify(refreshToken, 'your-refresh-secret', (err: any, user: any) => {
        if (err) {
            return res.sendStatus(403);
        }

        const accessToken = generateAccessToken({ email: user.email });
        res.json({ accessToken });
    });
});

export default router;