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

  private genSalt(): Promise<string> {
    return new Promise((resolve) => {
      bcrypt.genSalt(10, (err, salt) => {
        if (err) throw new Error(`Cannot generating salt : ${err}`);
        resolve(salt);
      });
    });
  }

  public hash(password: string): Promise<string> {
    return new Promise(async (resolve) => {
      const salt = await this.genSalt();
      bcrypt.hash(password, salt, (err, hash) => {
        if (err) throw new Error(`Cannot hash passwords: ${err}`);
        resolve(hash);
      });
    });
  }
}
