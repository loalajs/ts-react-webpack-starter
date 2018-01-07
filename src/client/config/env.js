const NODE_ENV = process.env.NODE_ENV === 'production' ? 'production' : 'development';
const APP_PROTOCOL = process.env.APP_PROTOCOL || 'http';
const APP_HOST = process.env.APP_HOST || 'localhost';
const APP_PORT = process.env.APP_PORT || 3001;

module.exports = {
  NODE_ENV,
  APP_PROTOCOL,
  APP_HOST,
  APP_PORT,
};
