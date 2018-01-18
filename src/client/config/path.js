const path = require('path');

/** Todo:
 * Create symlinkSync based on root so it can resolve at absolute path  */
const SRC = path.join(__dirname, '..', 'app');
const DIST = path.join(__dirname, '..', '..', '..', 'dist', 'client', 'app');
const POSTCSS = path.resolve(__dirname, 'postcss.config.js');

module.exports = {
  SRC,
  DIST,
  POSTCSS,
};
