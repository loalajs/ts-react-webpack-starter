import * as socketIo from 'socket.io';
import env from '../config/env';
/** Get env variables */
const { APP_HOST, APP_PORT } = env;

export default class RootEventBroadCastor {
  io: socketIo.Server;
  socket: socketIo.Socket;
  constructor(io: socketIo.Server) {
    this.io = io;
    this.listenConnection();
  }

  listenConnection() {
    this.io.on('connect', (socket: socketIo.Socket) => {
      console.log(`Client connect at the port: ${APP_PORT} at ${APP_HOST}`);
      this.socket = socket;

      this.listenNewMessage();

      this.listenUserTyping();

      this.listenUserNotTyping();

      this.listenDisconnection();
    });
  }

  listenNewMessage() {
    this.socket.on('message', (chat: string) => {
      console.log(`[ Server ]: Received message: ${chat} `);
      this.io.emit('message', chat);
    });
  }

  listenUserTyping() {
    this.socket.on('userTyping', () => {
      console.log(`[ Server ]: User Input `);
      this.io.emit('userTyping');
    });
  }

  listenDisconnection() {
    this.socket.on('disconnect', () => {
      console.log(`Client Disconnect`);
    });
  }

  listenUserNotTyping() {
    this.socket.on('userNotTyping', () => {
      console.log(`[ Server ]: User Not Input`);
      this.io.emit('userNotTyping');
    });
  }
}
