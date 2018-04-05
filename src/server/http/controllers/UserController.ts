import { Response, Request, NextFunction } from 'express';
import { UserService } from '../../services/UserService';

const userService = new UserService();

export class UserController {
  public async login(req: Request, res: Response, next: NextFunction) {
    /** Test */
    req.body = {
      username: 'jameslo',
      password: 'james',
    };
    res.json(req.body);
  }

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
      res.json(createdUser);
    } catch (e) {
      next(e);
    }
  }
}
