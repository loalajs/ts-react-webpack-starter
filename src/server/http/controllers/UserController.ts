import { Response, Request, NextFunction } from 'express';
import { UserService } from '../../services/UserService';
// import { AuthenticateService } from '../../services/AuthenticateService';

const userService = new UserService();
// const authService = new AuthenticateService();

export class UserController {

  public async register(req: Request, res: Response, next: NextFunction) {
    const { username, password, email, displayName } = req.body;
    const user = {
      username,
      password,
      email,
      displayName,
    };
    let createdUser;

    try {
      createdUser = await userService.createUser(user);
      res.json({
        data: {
          user: createdUser,
        },
      });
    } catch (e) {
      next(e);
    }
  }
}
