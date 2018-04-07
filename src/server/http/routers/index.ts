import * as path from 'path';
import { Application } from 'express';
import authRouter from './authRouter';
import userRouter from './userRouter';
import { AuthenticateMiddleware } from '../middlewares/AuthenticateMiddleware';
import { default as appPaths } from '../../config/path';

const authenticateMiddleware = new AuthenticateMiddleware();

export default function appRouterInit(app: Application) {
  /** Root Route For SPA */
  app.get('/', (req, res) => {
    res.sendFile(path.resolve(appPaths.CLIENT_ROOT_PATH, 'index.html'));
  });

  /** Authentication Routes */
  app.use('/api', authRouter);

  /** User Routes */
  app.use('/api/users', authenticateMiddleware.authenticate, userRouter);
}
