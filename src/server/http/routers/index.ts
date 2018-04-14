import * as path from 'path';
import { Application } from 'express';
import authRouter from './authRouter';
import userRouter from './userRouter';
import { AuthenticateMiddleware } from '../middlewares/AuthenticateMiddleware';
import { default as appPaths } from '../../config/path';
import { HttpNotFound } from '../../utils/errors/customError';

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

  /** Bad Api Request, This must be put at last before all other /api route
   * to handle non-defined api
   */
  app.use('/api/*', (req, res) => {
    throw new HttpNotFound('No api end point.');
  });

  /** 404 Page, This must be put at the end to handle the non-defined routes */
  app.use('/*', (req, res) => {
    throw new HttpNotFound('Page not found.');
  });
}
