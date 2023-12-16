import { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';
import IUser from '../interfaces/IUser';

const saltRounds = 10;


const userSchema = new Schema<IUser>({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Pre-save hook to hash the password before saving
userSchema.pre<IUser>('save', async function (next) {
    try {
        if (!this.isModified('password')) {
            return next();
        }

        const hashedPassword = await bcrypt.hash(this.password, saltRounds);
        this.password = hashedPassword;
        return next(null);
    } catch (error:any) {
        return next(error);
    }
});

const UserModel = model<IUser>('User', userSchema);

export default UserModel;