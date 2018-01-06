const ENV = process.env;
const NODE_ENV = ENV.NODE_ENV === 'production' ? 'production' : 'development';
const APP_PROTOCOL = ENV.APP_PROTOCOL || 'http';
const APP_HOST = ENV.APP_HOST || 'localhost';
const APP_PORT = ENV.APP_PORT || 3001;

module.exports = {
  NODE_ENV,
  APP_PROTOCOL,
  APP_HOST,
  APP_PORT,
};
