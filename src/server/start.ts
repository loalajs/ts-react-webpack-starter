import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as morgan from 'morgan';
import { default as appRouterInit } from './http/routers';
import env from './config/env';
import { Database } from './database';
import { default as appPaths } from './config/path';
import { NextFunction, Request, Response } from 'express-serve-static-core';
import { FormValidationError } from './utils/errors/customError';
import { AppErrorInterface } from './utils/errors/index';
// import { UserSeed } from './database/seeds';

/** Get env variables */
const { APP_HOST, APP_PORT } = env;

/** Use ExpressJS frameworks */
const app = express();

/** Application Middlewares
 * 1. bodyParser for processing data from form submission
 * parse application/x-www-form-urlencoded
 * parse application/json
 * 2. passport handle the user authentication and authorisation
 * 3. morgan logs request
 * 4. express static setup the static path
 */
app.use(express.static(appPaths.CLIENT_ROOT_PATH));
app.use(express.static(appPaths.SERVER_STATIC_PATH));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));

/** Router Initiate */
appRouterInit(app);

/** Handle Error */
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err);
  const error: AppErrorInterface = {
    name: err.name,
    status: err.status,
  };

  if (err instanceof FormValidationError) {
    error.fields = err.fields;
  } else {
    error.message = err.message;
  }

  res.status(error.status);
  res.json({
    error,
  });
});

/** Test Database Connection & Insert */
Database.testDbConnection();
// UserSeed.bulkInsert();

app.listen(APP_PORT, () => {
  console.log(`Server running at host: ${APP_HOST} on port: ${APP_PORT}; cwd: ${process.cwd()}`);
});
