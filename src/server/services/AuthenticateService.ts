import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';
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
    if (!await bcrypt.compare(data.password, foundUser.password as string)) {
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

  public async hash(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
  }
}
