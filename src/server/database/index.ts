import * as Sequelize from 'sequelize';
import env from '../config/env';
import { DatabaseError } from '../utils/errors/customError';
import { Device } from '../models/Device';
import { User } from '../models/User';

export default class Database {
  public static sequelize = new Sequelize({
    dialect: env.DB_DIALECT,
    host: env.DB_HOST,
    port: Number(env.DB_PORT),
    database: env.DB_NAME,
    username: env.DB_USER,
    password: env.DB_PASSWORD,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  });
  /** Testing the connection */
  public async testDbConnection() {
    try {
      await Database.sequelize.authenticate();
      await Device.sync();
      await User.sync();
    } catch (err) {
      throw new DatabaseError(`The database has yielded error: ${err.message}`);
    }
  }
}
