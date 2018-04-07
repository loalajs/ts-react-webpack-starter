import { Router } from 'express';
import { UserController } from '../controllers/UserController';
// import { AuthenticateMiddleware } from '../middlewares/AuthenticateMiddleware';
const userRouter: Router = Router();
const userController = new UserController();

userRouter.get('/', userController.list);
userRouter.get('/:id', userController.show);

export default userRouter;
