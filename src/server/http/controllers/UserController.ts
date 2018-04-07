import { Response, Request, NextFunction } from 'express';
import { UserService } from '../../services/UserService';
import { AuthenticateService } from '../../services/AuthenticateService';

const authService = new AuthenticateService();
const userService = new UserService();

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

  public async login(req: Request, res: Response, next: NextFunction) {
    /** Test */
    const { username, password } = req.body;
    const user = {
      username,
      password,
    };
    let token: string;
    try {
      token = await authService.authenticate(user);
      res.json({
        data: {
          token,
        },
      });
    } catch (e) {
      next(e);
    }
  }

  public async list(req: Request, res: Response, next: NextFunction) {
    let users;
    try {
      users = await userService.getAll();
      res.json({
        data: users,
      });
    } catch (e) {
      next(e);
    }
  }

  public async show(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    let user;
    try {
      user = await userService.getOne(id);
      res.json({
        data: user,
      });
    } catch (e) {
      next(e);
    }
  }
}
