const path = require('path');

const CLIENT_SRC_PATH = path.join(__dirname, '..');
const CLIENT_DIST_PATH = path.join(__dirname, '..', '..', '..', 'dist', 'client');
const POSTCSS_CONFIG_PATH = path.resolve(__dirname, 'postcss.config.js');

module.exports = {
  CLIENT_SRC_PATH,
  CLIENT_DIST_PATH,
  POSTCSS_CONFIG_PATH,
};
