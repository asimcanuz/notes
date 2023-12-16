import { Request, Response } from 'express';
import UserModel from '../models/schemas/userSchema';
import IUser from '../models/interfaces/IUser';


const registerController = {
    renderRegisterView: (req: Request, res: Response) => {
        res.render('register', { title: 'Register' });
    },

    register: async (req: Request, res: Response) => {
        try {
            // Extract user data from the request body
            const { email, password, username } = req.body;
    
            // Validate input (you may want to add more validation)
            if (!email || !password || !username) {
                return res.status(400).send('Email, password, and username are required.');
            }
    
            // Check if the email or username is already registered
            const existingUser = await UserModel.findOne({ $or: [{ email }, { username }] });
            if (existingUser) {
                return res.status(400).send('Email or username is already registered.');
            }
    
            // Create a new user
            const newUser: IUser = new UserModel({ email, password, username });
            await newUser.save();
    
            // Redirect to a success page or login page
            res.redirect('/login');
        } catch (error) {
            console.error('Error during registration:', error);
            res.status(500).send('Internal Server Error');
        }
    },

};

export default registerController;