const path = require('path');

/** Todo:
 * Create symlinkSync based on root so it can resolve at absolute path  */
const ROOT_SRC_PATH = path.join(__dirname, '..', 'app');
const ROOT_DIST_PATH = path.join(__dirname, '..', '..', '..', 'dist', 'client', 'app');
const POSTCSS_CONFIG_PATH = path.resolve(__dirname, 'postcss.config.js');

module.exports = {
  ROOT_SRC_PATH,
  ROOT_DIST_PATH,
  POSTCSS_CONFIG_PATH,
};
