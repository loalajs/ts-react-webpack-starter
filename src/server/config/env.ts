const dotenv = require('dotenv');
/** process.cwd
 * /Users/jameslo/Dropbox/myproject/react-ts-starter
 */
const directory = process.cwd();

dotenv.config({ path: `${directory}/.env` });

let env = {};

export default env = {
  /** Environment Mode */
  NODE_ENV:       process.env.NODE_ENV            || 'development',

  /** Protocol, Host and Port */
  APP_HOST:       process.env.APP_HOST            || 'localhost',
  APP_PROTOCOL:   process.env.APP_PROTOCOL        || 'http',
  APP_PORT:       process.env.APP_PORT            || 3001,
  APP_KEY:        process.env.APP_KEY,
  APP_DOMAIN:     process.env.APP_DOMAIN,

  /** SQL databse */
  DB_DIALECT:     process.env.DB_DIALECT          || 'mysql',
  DB_HOST:        process.env.DB_HOST             || 'localhost',
  DB_PORT:        process.env.DB_PORT             || 3306,
  DB_NAME:        process.env.DB_NAME             || 'test_db',
  DB_USER:        process.env.DB_USER             || 'root',
  DB_PASSWORD:    process.env.DB_PASSWORD,
  DB_CONN_NAME:   process.env.DB_CONN_NAME        || 'default',

  /** JWT */
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_EXPIRATION: process.env.JWT_EXPIRATION      || '10000',
  JWT_SIGN_ALGO: process.env.JWT_SIGN_ALGO        || 'HS256',
};
