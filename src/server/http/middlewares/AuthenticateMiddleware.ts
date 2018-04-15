import { Request, Response, NextFunction } from 'express';
import { HttpAuthError } from '../../utils/errors/customError';
import { DeviceType } from '../../models/Device';
import * as jwt from 'jsonwebtoken';
import env from '../../config/env';

export class AuthenticateMiddleware {
  constructor() {
    this.authenticate = this.authenticate.bind(this);
  }

  public authenticate(req: Request, res: Response, next: NextFunction) {

    /** Check if format is srart from Bearer <DeviceType> <token> */
    const header = req.header('Authorization') || req.query.token;
    if (!header) throw new HttpAuthError('No authorised header is provided.');

    /** Extract "Bearer" from token */
    const token = this.extractTokenFromAuthorization(header);

    jwt.verify(token, env.JWT_SECRET as string, (err: any, decoded: any) => {
      if (err) throw new HttpAuthError('Failed to authenticate token.');
      // req.decoded = decoded;
      console.info(decoded);
      next();
    });
  }

  public extractTokenFromAuthorization(authHeader: string): string {
    const authHeaderItemsArr = authHeader.split(' ');
    let device;
    let token;

    /** Check Bearer */
    if (authHeaderItemsArr.length !== 3 || authHeaderItemsArr[0] !== 'Bearer') {
      throw new HttpAuthError('Authorised header format invalid.');
    }
    /** Check Device Type */
    device = authHeaderItemsArr[1];
    if (device !== DeviceType.WEB && device !== DeviceType.ANDROID && device !== DeviceType.IOS) {
      throw new HttpAuthError('Device is not support in this api.');
    }

    /** Return the token */
    token = authHeaderItemsArr[2];
    return token;
  }
}
