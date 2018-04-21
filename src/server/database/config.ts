const env = require('../config/env.ts');
export = {
  development: {
    username: env.DB_USER,
    password: env.DB_PASSWORD,
    database: 'app_starter_dev',
    host: env.DB_HOST,
    dialect: 'mysql',
    migrationStorage: 'sequelize',
  },
  test: {
    username: env.DB_USER,
    password: env.DB_PASSWORD,
    database: 'app_starter_test',
    host: env.DB_HOST,
    dialect: 'mysql',
    migrationStorage: 'sequelize',
  },
  production: {
    username: env.DB_USER,
    password: env.DB_PASSWORD,
    database: env.DB_NAME,
    host: env.DB_HOST,
    dialect: 'mysql',
    migrationStorage: 'sequelize',
  },
};
