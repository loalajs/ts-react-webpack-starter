import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';
import { User, UserParams } from '../models/User';
import env from '../config/env';
import { FormValidationError, ServiceError } from '../utils/errors/customError';

export interface PayloadInterface {
  name?: string;
  deviceType?: string;
}

export class AuthenticateService {
  /** Called when login
   * Parameters: @UserParams which refers to user login credential
   * Return @token
   */
  public async authenticate(data: UserParams) {
    const foundUser = await User.findOne({
      where: {
        username: data.username,
      },
    });
    if (!foundUser) {
      throw new FormValidationError({
        username: [
          {
            rule: 'Authentication',
            message: 'The username or password is invalid',
          },
        ],
        password: [
          {
            rule: 'Authentication',
            message: 'The username or password is invalid',
          },
        ],
      });
    }
    if (!await bcrypt.compare(data.password, foundUser.password as string)) {
      throw new FormValidationError({
        username: [
          {
            rule: 'Authentication',
            message: 'The username or password is invalid',
          },
        ],
        password: [
          {
            rule: 'Authentication',
            message: 'The username or password is invalid',
          },
        ],
      });
    }
    const payload = {
      username: foundUser.username,
      deviceType: 'android',
    };
    const token = await this.createToken(payload);
    return token;
  }

  /** createToken
   * Parameters: @payload based on @PayloadInterface
   * Return: @Promise<string> which is encoded jwt
   */
  public createToken(payload: PayloadInterface): Promise<string> {
    return new Promise((resolve) => {
      jwt.sign(
        payload,
        env.JWT_SECRET as string,
        {
          expiresIn: Number(env.JWT_EXPIRATION),
          algorithm: env.JWT_SIGN_ALGO,
          issuer: env.APP_HOST,
        },
        (err, encoded) => {
          if (err) throw new ServiceError(`The token cannot be created: ${err.message}`);
          resolve(encoded);
        });
    });
  }

  public async hash(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
  }
}
