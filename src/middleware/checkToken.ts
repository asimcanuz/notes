import { Request,Response, NextFunction } from "express";
import jwt, { Secret } from 'jsonwebtoken';

const checkToken = (req:Request,res:Response, next:NextFunction) =>{
    // Check for the presence of the acc token
    const accessToken = req.cookies['access-token'];

    if (!accessToken) {
        return res.status(401).json({ message: 'Unauthorized - Access Token is missing' });
    }

    // Verify the access token
    jwt.verify(accessToken,  process.env.ACCESS_SECRET_KEY as Secret, (err: any, decoded: Express.User | undefined) => {
        if (err) {
            return res.status(401).json({ message: 'Unauthorized - Invalid Access Token' });
        }

        // Attach the decoded user information to the request
        req.user = decoded;
        next();
    });
}

export default checkToken;