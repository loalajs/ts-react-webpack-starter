import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as morgan from 'morgan';
import * as socketIo from 'socket.io';
import { default as appRouterInit } from './http/routers';
import env from './config/env';
import { default as appPaths } from './config/path';
import { default as ErrorHandleMiddleware } from './http/middlewares/ErrorHandleMiddleware';
import { default as Database } from './database/index';

/** Get env variables */
const { APP_HOST, APP_PORT } = env;

/** Init DB */
Database.init();

/** Use ExpressJS frameworks */
const app = express();

/** Error Hanlder */
const errorHandleMiddleware = new ErrorHandleMiddleware();

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

/** Log Error */
app.use(errorHandleMiddleware.logError);

/** Handle Error */
app.use(errorHandleMiddleware.errorHandler);

const server = app.listen(APP_PORT, () => {
  console.log(`Server running at host: ${APP_HOST} on port: ${APP_PORT}; cwd: ${process.cwd()}`);
});

/** Socket IO */
const io = socketIo(server);

io.on('connect', (socket: socketIo.Socket) => {
  console.log(`Client connect at the port: ${APP_PORT} at ${APP_HOST}`);
  socket.on('message', (msg: string) => {
    console.log(`[ Server ]: Received message: ${msg} `);
    io.emit('message', msg);
  });

  socket.on('disconnect', () => {
    console.log(`Client Disconnect`);
  });
});
