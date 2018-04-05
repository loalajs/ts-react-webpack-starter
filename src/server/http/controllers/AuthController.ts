import { Response, Request, NextFunction } from 'express';
// import { UserService } from '../../services/UserService';
import { AuthenticateService } from '../../services/AuthenticateService';

// const userService = new UserService();
const authService = new AuthenticateService();

export class AuthController {
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
}
