import * as Sequelize from 'sequelize';
import env from '../config/env';

/** Initialise the connection */
const sequelize = new Sequelize({
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
  /** // http://docs.sequelizejs.com/manual/tutorial/querying.html#operators */
  operatorsAliases: false,

});

/** Testing the connection */
function testDbConnection() {
  sequelize.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((err: any) => {
    console.error('Unable to connect to the database:', err);
  });
}


export { sequelize, testDbConnection };
