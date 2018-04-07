import * as jwt from 'jsonwebtoken';
import { User, UserParams } from '../models/User';
import env from '../config/env';

export interface PayloadInterface {
  name?: string;
  deviceType?: string;
}

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
    const token = await this.createToken(payload);
    return token;
  }

  public createToken(payload: PayloadInterface): Promise<string> {
    return new Promise((resolve) => {
      jwt.sign(payload, env.JWT_SECRET as string, (err, encoded) => {
        if (err) throw new Error(`The token cannot be created: ${err.message}`);
        resolve(encoded);
      });
    });
  }
}
