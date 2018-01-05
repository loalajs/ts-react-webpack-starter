const ENV = process.env;
const NODE_ENV = ENV.NODE_ENV === 'production' ? 'production' : 'development';
const PROTOCOL = ENV.PROTOCOL || 'http';
const HOST = ENV.HOST || '0.0.0.0';
const PORT = ENV.PORT || 3001;

module.exports = {
  NODE_ENV,
  PROTOCOL,
  HOST,
  PORT,
};
