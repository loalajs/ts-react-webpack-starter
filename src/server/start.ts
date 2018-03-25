import * as path from 'path';
import * as express from 'express';
import * as morgan from 'morgan';
import * as passport from 'passport';
import * as bodyParser from 'body-parser';
import env from './config/env';
import { testDbConnection } from './database';

const {
  APP_HOST,
  APP_PORT,
} = env;

/** Define the CONSTANTS */
const CLIENT_ROOT_PATH = path.join(__dirname , '..', 'client', 'app');
const app = express();

/** Serve static contents  */
app.use(express.static(CLIENT_ROOT_PATH));

/** BodyParser for post data */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

/** Passport for JWT Authentication */
app.use(passport.initialize());

/** Test Database Connection */
testDbConnection();

/** Logging */
app.use(morgan('dev'));

/** Root Route */
app.get('/', (req, res) => {
  res.sendFile(path.resolve(CLIENT_ROOT_PATH, 'index.html'));
});

app.listen(APP_PORT, () => {
  console.log(`Server running at host: ${APP_HOST} on port: ${APP_PORT}; cwd: ${process.cwd()}`);
});
