import * as path from 'path';
import { Application } from 'express';
import authRouter from './authRouter';
import { default as appPaths } from '../../config/path';

export default function appRouterInit(app: Application) {
  /** Root Route For SPA */
  app.get('/', (req, res) => {
    res.sendFile(path.resolve(appPaths.CLIENT_ROOT_PATH, 'index.html'));
  });

  /** Authentication Routes */
  app.use('/api', authRouter);
}
