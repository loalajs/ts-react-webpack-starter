import { User, UserParams } from '../models/User';
import { Op } from 'sequelize';

export class UserService {
  public async createUser(data: UserParams) {
    const existedUser = await User.findOne({
      where: {
        [Op.or]: [
          { username: data.username },
          { email: data.email },
        ],
      },
    });

    if (existedUser) {
      if (existedUser.email === data.email) {
        throw new Error('The email has been taken.');
      }
      if (existedUser.username === data.username) {
        throw new Error('The username has been taken.');
      }
    } else {
      return await User.create(data);
    }
  }
}
