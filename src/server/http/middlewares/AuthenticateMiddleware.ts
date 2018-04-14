import { Request, Response, NextFunction } from 'express';
import { HttpAuthError } from '../../utils/errors/customError';
import * as jwt from 'jsonwebtoken';
import env from '../../config/env';

export class AuthenticateMiddleware {
  public authenticate(req: Request, res: Response, next: NextFunction) {
    const token = req.query.token || req.headers['Authorization'];
    if (!token) {
      throw new HttpAuthError('No authentication token is provided.');
    } else {
      jwt.verify(token, env.JWT_SECRET as string, (err: any, decoded: any) => {
        if (err) throw new HttpAuthError('Failed to authenticate token.');
        // req.decoded = decoded;
        next();
      });
    }
  }
}
