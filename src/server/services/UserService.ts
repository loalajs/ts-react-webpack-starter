import { User, UserAttributes } from '../models/User';
import { Op } from 'sequelize';
import { AuthenticateService } from './AuthenticateService';
import { HttpNotFound, FormValidationError } from '../utils/errors/customError';

const authenticateService = new AuthenticateService();

export class UserService {
  public async createUser(data: UserAttributes) {
    const user = {
      username: data.username,
      email: data.email,
      password: data.password,
      displayName: data.displayName,
    };

    const existedUser = await User.findOne({
      where: {
        [Op.or]: [
          { username: data.username },
          { email: data.email },
        ],
      },
    });

    if (existedUser) {
      if (existedUser.email === user.email) {
        throw new FormValidationError({
          email: [
            {
              rule: 'Existed',
              message: 'The email has been taken.',
            },
          ],
        });
      }
      if (existedUser.username === user.username) {
        throw new FormValidationError({
          email: [
            {
              rule: 'Existed',
              message: 'The username has been taken.',
            },
          ],
        });
      }
    } else {
      /** Hash passwords Before Saving */
      const hashPassword = await authenticateService.hashPassword(user.password as string);
      user.password = hashPassword;
      return await User.create(user);
    }
  }

  public async getAll() {
    return await User.findAll();
  }

  public async getOne(id: number) {
    let user;

    user = await User.find({
      where: {
        id,
      },
    });

    if (!user) {
      throw new HttpNotFound('User not found');
    }

    return user;
  }
}
