// src/types.ts
import { Session, SessionData } from 'express-session';

interface CustomSession extends Session {
    flash?: {
        error?: string[];
    };
}

export type CustomRequest = {
    session: CustomSession;
};