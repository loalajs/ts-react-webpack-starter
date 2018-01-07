const dotenv = require('dotenv');
const directory = process.cwd();

dotenv.config({ path: `${directory}/.env` });

export const env = {
  /** Environment Mode */
  NODE_ENV: process.env.NODE_ENV || 'development',

  /** Protocol, Host and Port */
  APP_HOST: process.env.APP_HOST || 'localhost',
  APP_PROTOCOL: process.env.APP_PROTOCOL || 'http',
  APP_PORT: process.env.APP_PORT || 3001,

};
