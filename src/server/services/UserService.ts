import { User, UserParams } from '../models/User';
import { Op } from 'sequelize';

export class UserService {
  public async createUser(data: UserParams) {

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

      console.log(`TEST Found User: ${user}`);
      console.log(`TEST Found User: ${JSON.stringify(user)}`);

      if (user.email === data.email) {
        throw new Error('The email has been taken.');
      }

      if (user.username === data.username) {
        throw new Error('The username has been taken.');
      }
    }

    return await User.create(data);
  }
}
