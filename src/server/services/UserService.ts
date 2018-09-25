import { User, UserAttributes } from '../models/User';
import { getRepository, getConnection } from 'typeorm';
import { AuthenticateService } from './AuthenticateService';
import { HttpNotFound, FormValidationError } from '../utils/errors/customError';

const authenticateService = new AuthenticateService();

export class UserService {
  public async createUser(data: UserAttributes): Promise<User | undefined> {
    const { username, email, password, displayName } = data;
    const user = new User();
    const existedUser = await getConnection()
      .createQueryBuilder()
      .select()
      .from(User, 'user')
      .where('user.username = :username', { username })
      .orWhere('user.email = :email', { email })
      .getRawOne();

    if (existedUser) {
      if (existedUser.email === email) {
        throw new FormValidationError({
          email: [
            {
              rule: 'Existed',
              message: 'The email has been taken.',
            },
          ],
        });
      }
      if (existedUser.username === username) {
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
      const hashPassword = await authenticateService.hashPassword(password as string);
      user.password = hashPassword;
      user.username = username;
      user.email = email;
      user.displayName = displayName;
      return await getRepository(User).save(user);
    }
  }

  public async getAll(): Promise<User[] | undefined> {
    return await getRepository(User).find();
  }

  public async getOne(id: number): Promise<User | undefined> {
    const user = await getRepository(User).findOne(id);

    if (!user) {
      throw new HttpNotFound('User not found');
    }

    return user;
  }
}
