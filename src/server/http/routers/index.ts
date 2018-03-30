import * as path from 'path';
import * as express from 'express';
import authRouter from './authRouter';
import { default as appPaths } from '../../config/path';

function appRouterInit(app: express.Application) {
  /** Root Route For SPA */
  app.get('/', (req, res) => {
    res.sendFile(path.resolve(appPaths.CLIENT_ROOT_PATH, 'index.html'));
  });

  /** Authentication Routes */
  app.use('/api', authRouter);
}

export default appRouterInit;
