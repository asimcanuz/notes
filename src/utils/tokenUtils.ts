import jwt, { Secret } from 'jsonwebtoken';

const secretKey = process.env.ACCESS

export const generateAccessToken = (user: any) => {
    return jwt.sign(user,  process.env.ACCESS_SECRET_KEY as Secret, { expiresIn: '15m' });
};

export const generateRefreshToken = (user: any) => {
    return jwt.sign(user,process.env.ACCESS_SECRET_KEY as Secret , { expiresIn: '7d' });
};
