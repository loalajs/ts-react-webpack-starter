import { User, UserParams } from '../models/User';
import { NextFunction } from 'express';
import { Op } from 'sequelize';

export class UserService {
  public async createUser(data: UserParams, next: NextFunction) {

    /** Basic Validation
     * Find if username & email has existed in the database
     * 1. Find one user;
     * 2. If user found, throw an error
     * 3. If user is not found, create the user
     */
    const user = await User.findOne({
      where: {
        [Op.or]: [
          { username: data.username },
          { email: data.email },
        ],
      },
    });

    if (user) {
      if (user.email === data.email) {
        // setTimeout(() => new Error('async error'), 1000); ERROR NOT CATCHED
        next(new Error('The email has been taken.'));
      }
      if (user.username === data.username) {
        next(new Error('The username has been taken.'));
      }
    } else {
      return await User.create(data);
    }
  }
}
