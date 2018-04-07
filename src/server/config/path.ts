import * as path from 'path';
const root = process.cwd();

const appPaths = {
  CLIENT_ROOT_PATH: path.join(root, 'client', 'app'),
  SERVER_STATIC_PATH: path.join(root, 'server', 'statics'),
};

export default appPaths;
