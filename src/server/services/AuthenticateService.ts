import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';
import { User, UserParams } from '../models/User';
import { DeviceType } from '../models/Device';
import env from '../config/env';
import { FormValidationError, ServiceError } from '../utils/errors/customError';

export interface PayloadInterface {
  name?: string;
  userDevice?: string;
}

export class AuthenticateService {
  /** Called when login
   * Parameters: @UserParams which refers to user login credential
   * Return @token
   */
  public async authenticate(userData: UserParams, userDevice?: string) {
    const foundUser = await User.findOne({
      where: {
        username: userData.username,
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
    if (!await bcrypt.compare(userData.password, foundUser.password as string)) {
      throw new FormValidationError({
        username: [
          {
            rule: 'Input Invalid',
            message: 'The username or password is invalid',
          },
        ],
        password: [
          {
            rule: 'Input Invalid',
            message: 'The username or password is invalid',
          },
        ],
      });
    }

    if (!userDevice) throw new FormValidationError({
      userDevice: [
        {
          rule: 'Required',
          message: 'The user device type is missing.',
        },
      ],
    });

    if (userDevice !== DeviceType.ANDROID
      && userDevice !== DeviceType.WEB
      && userDevice !== DeviceType.IOS) {
      throw new FormValidationError({
        userDevice: [
          {
            rule: 'Compatibility',
            message: 'The user device is not supported.',
          },
        ],
      });
    }

    const payload = {
      userDevice,
      username: foundUser.username,
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
