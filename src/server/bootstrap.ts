import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as morgan from 'morgan';
import * as socketIo from 'socket.io';
import { default as appPaths } from './config/path';
import { default as appRouterInit } from './http/routers';
import { default as ErrorHandleMiddleware } from './http/middlewares/ErrorHandleMiddleware';
import { default as RootEventBroadCastor } from './events/index';
import { default as Database } from './database/index';
import env from './config/env';
import { Server } from 'http';

/** Get env variables */
const { APP_HOST, APP_PORT } = env;

export default class ApplicationBootstrap {
  /** Use ExpressJS frameworks */
  private app: express.Application = express();
  /** Error Hanlder */
  private errorHandleMiddleware = new ErrorHandleMiddleware();

  /** Server */
  private server: Server;

  /** Socket IO */
  private io: socketIo.Server;

  constructor() {

    /** Init DB */
    Database.init();

    /** Application Middlewares
   * 1. bodyParser for processing data from form submission
   * parse application/x-www-form-urlencoded
   * parse application/json
   * 2. passport handle the user authentication and authorisation
   * 3. morgan logs request
   * 4. express static setup the static path
   */
    this.app.use(express.static(appPaths.CLIENT_ROOT_PATH));
    this.app.use(express.static(appPaths.SERVER_STATIC_PATH));
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use(morgan('dev'));

    /** Init Root Routes for RESTful API */
    appRouterInit(this.app);

    /** Log Error */
    this.app.use(this.errorHandleMiddleware.logError);

    /** Handle Error */
    this.app.use(this.errorHandleMiddleware.errorHandler);

    /** Setup Server */
    this.setupServer();

    /** Setup SocketIO */
    this.setupSocketIo();

  }

  private setupServer() {
    this.server = this.app.listen(APP_PORT, () => {
      console.log(`Server running at host:
      ${APP_HOST} on port:
      ${APP_PORT};
      cwd: ${process.cwd()}`);
    });
  }

  private setupSocketIo() {
    this.io = socketIo(this.server);
    new RootEventBroadCastor(this.io);
  }

}
