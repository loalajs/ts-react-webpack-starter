import * as Sequelize from 'sequelize';
import env from '../config/env';

export class Database {
  /** Init The Connection */
  public static connection() {
    return new Sequelize({
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
  }
  /** Testing the connection */
  public static testDbConnection() {
    this.connection().authenticate()
      .then(() => {
        console.log('Connection has been established successfully.');
      })
      .catch((err: any) => {
        console.error('Unable to connect to the database:', err);
      });
  }
}
