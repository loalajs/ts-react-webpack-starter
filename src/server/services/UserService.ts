import { User, UserParams } from '../models/User';
import { Op } from 'sequelize';
import { AuthenticateService } from './AuthenticateService';

const authenticateService = new AuthenticateService();

export class UserService {
  public async createUser(data: UserParams) {
    const user = {
      username: data.username,
      email: data.email,
      password: data.password,
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
        throw new Error('The email has been taken.');
      }
      if (existedUser.username === user.username) {
        throw new Error('The username has been taken.');
      }
    } else {
      /** Hash passwords Before Saving */
      const hashPassword = await authenticateService.hash(user.password as string);
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
      throw new Error('User not found');
    }

    return user;
  }
}
