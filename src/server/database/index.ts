import 'reflect-metadata';
import { createConnection } from 'typeorm';
import env from '../config/env';
import { User } from '../models/User';
import { Device } from '../models/Device';

export default class Database {
  public static init() {
    createConnection({
      name: env.DB_CONN_NAME,
      type: env.DB_DIALECT as any,
      host: env.DB_HOST,
      port: env.DB_PORT as number,
      username: env.DB_USER,
      password: env.DB_PASSWORD,
      database: env.DB_NAME,
      entities: [
        `../models/**/*.js`, // This line does not work
        User,
        Device,
      ],
      synchronize: true,
      logging: true,
    }).then(() => {
      console.info(`Database Connection Successfully`);
    }).catch((e) => {
      console.error(`Database Connection Failed: ${e.message}`);
    });
  }
}
