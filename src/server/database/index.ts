import 'reflect-metadata';
import { createConnection } from 'typeorm';
import env from '../config/env';

createConnection({
  name: env.DB_CONN_NAME,
  type: env.DB_DIALECT as any,
  host: env.DB_HOST,
  port: env.DB_PORT as number,
  username: env.DB_USER,
  password: env.DB_PASSWORD,
  database: env.DB_NAME,
  entities: [
    `../models/*.js`,
  ],
  synchronize: true,
  logging: false,
});
