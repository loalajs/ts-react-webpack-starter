import * as express from 'express';
import * as morgan from 'morgan';
import * as passport from 'passport';
import * as bodyParser from 'body-parser';
import { default as appRouterInit } from './http/routers';
import env from './config/env';
import { Database } from './database';
import { UserSeed } from './database/seeds';
import { default as appPaths } from './config/path';

const {
  APP_HOST,
  APP_PORT,
} = env;

/** Define the CONSTANTS */
const app = express();

/** Serve static contents  */
app.use(express.static(appPaths.CLIENT_ROOT_PATH));

/** BodyParser for post data */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

/** Passport for JWT Authentication */
app.use(passport.initialize());

/** Router Initiate */
appRouterInit(app);

/** Test Database Connection & Insert */
Database.testDbConnection();
UserSeed.bulkInsert();


/** Logging */
app.use(morgan('dev'));

app.listen(APP_PORT, () => {
  console.log(`Server running at host: ${APP_HOST} on port: ${APP_PORT}; cwd: ${process.cwd()}`);
});
