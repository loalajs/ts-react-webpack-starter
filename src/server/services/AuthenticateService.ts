import * as jwt from 'jsonwebtoken';
import { User, UserParams } from '../models/User';
import env from '../config/env';

export class AuthenticateService {
  public async authenticate(data: UserParams) {
    const foundUser = await User.findOne({
      where: {
        username: data.username,
      },
    });

    if (!foundUser) {
      throw new Error('The username or password is invalid');
    }

    if (foundUser.password !== data.password) {
      throw new Error('The username or password is invalid');
    }

    const payload = {
      name: foundUser.username,
      deviceType: 'web',
    };

    const token = jwt.sign(payload, env.JWT_SECRET as string , {
      expiresIn: env.JWT_EXPIRATION,
      issuer: env.APP_KEY,
      algorithm: env.JWT_SIGN_ALGO,
    });

    return token;

  }
}
