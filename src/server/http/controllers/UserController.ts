
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
    try {
      const createdUser = await userService.createUser(user);
      console.log(`TEST Created User: ${createdUser}`);
      res.json(createdUser);
    } catch (e) {
      console.log(`TEST Found Error: ${e.message}`);
      console.log(`TEST Found Error: ${JSON.stringify(e)}`);
      res.status(401).send(e);
    }
  }
}
