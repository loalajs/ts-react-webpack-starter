import { Router } from 'express';
import { UserController } from '../controllers/UserController';
import { AuthController } from '../controllers/AuthController';
const authRouter: Router = Router();
const userController = new UserController();
const authController = new AuthController();

/** Signup Account */
authRouter.post('/register', userController.register);
/** Login Account */
authRouter.post('/login', authController.login);

export default authRouter;
