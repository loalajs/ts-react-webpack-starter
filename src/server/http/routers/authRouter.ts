import { Router } from 'express';
import { UserController } from '../controllers/UserController';
const authRouter: Router = Router();
const userController = new UserController();

/** Signup Account */
authRouter.post('/register', userController.register);
/** Login Account */
authRouter.post('/login', userController.login);

export default authRouter;
