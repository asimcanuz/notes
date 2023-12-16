import { Request } from 'express';

interface AuthenticatedRequest extends Request {
    user?: {
        // Define the properties of your user object
        id: number;
        email: string;
        // Add more properties as needed
    };
}

export default AuthenticatedRequest;