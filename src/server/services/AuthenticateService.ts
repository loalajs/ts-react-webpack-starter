import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';
import { User } from '../models/User';
import env from '../config/env';
import { FormValidationError, ServiceError, HttpAuthError } from '../utils/errors/customError';
import { DeviceService } from './DeviceService';
import { DeviceType } from '../models/Device';
import { getRepository } from 'typeorm';

const deviceService = new DeviceService();

export interface PayloadInterface {
  userId: number;
  userDevice: string;
}

export class AuthenticateService {
  /** Called when login
   * Parameters: @UserParams which refers to user login credential
   * Return @token
   */
  public async authenticate(username: string, password: string, userDevice?: DeviceType) {
    let token: string;
    const foundUser = await getRepository(User).findOne({
      where: {
        username,
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
    if (!await bcrypt.compare(password, foundUser.password as string)) {
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

    if (!deviceService.isDeviceSupport(userDevice)) {
      throw new FormValidationError({
        userDevice: [
          {
            rule: 'Compatibility',
            message: 'The user device is not supported.',
          },
        ],
      });
    }

    /** Add user device if it does not exist */
    if (await !deviceService.getOne(foundUser.id, userDevice)) {
      await deviceService.createDevice(foundUser, userDevice);
    }

    const payload: PayloadInterface = {
      userDevice,
      userId: foundUser.id,
    };

    /** Create Token and return it */
    try {
      token = await this.createToken(payload);
    } catch (err) {
      throw new ServiceError(`The token cannot be created: ${err.message}`);
    }

    return token;
  }
  /** createToken
   * Parameters: @payload based on @PayloadInterface
   * Return: @Promise<string> which is encoded jwt
   */
  public createToken(payload: PayloadInterface): Promise<string> {
    return new Promise((resolve, reject) => {
      jwt.sign(
        payload,
        env.JWT_SECRET as string,
        {
          expiresIn: Number(env.JWT_EXPIRATION),
          algorithm: env.JWT_SIGN_ALGO,
          issuer: env.APP_HOST,
        },
        (err, encoded) => {
          if (err) reject(err);
          resolve(encoded);
        });
    });
  }

  public async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
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
    if (!deviceService.isDeviceSupport(device)) {
      throw new HttpAuthError('Device is not support in this api.');
    }

    /** Return the token */
    token = authHeaderItemsArr[2];
    return token;
  }

  public verifyToken(token: string): Promise<PayloadInterface> {
    return new Promise((resolve, reject) => {
      jwt.verify(token, env.JWT_SECRET as string, (err: any, decoded: any) => {
        if (err) reject(err);
        resolve(decoded);
      });
    });
  }
}
