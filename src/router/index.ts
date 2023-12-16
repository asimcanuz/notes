import express from 'express';

import userRouter from './user.router';
import notesRouter from './notes.router';
import loginRouter from './login.router';
import registerRouter from './register.router';
import dashboardRouter from './dashboard.router';
import checkToken from '../middleware/checkToken';

const router = express.Router();

// Dynamically include routers from the 'src/router' directory

router.use("/user",userRouter);
router.use("/login",loginRouter);
router.use("/register",registerRouter);

router.use(checkToken)
router.use("/notes",notesRouter);
router.use("/dashboard",dashboardRouter);


export default router;