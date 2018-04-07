import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import env from '../../config/env';

export class AuthenticateMiddleware {
  public authenticate(req: Request, res: Response, next: NextFunction) {
    const token = req.body.token || req.query.token || req.headers['x-access-token'];
    if (!token) {
      throw new Error('No authentication token is provided');
    } else {
      jwt.verify(token, env.JWT_SECRET as string, (err: any, decoded: any) => {
        if (err) throw new Error('Failed to authenticate token');
        // req.decoded = decoded;
        next();
      });
    }
  }
}
