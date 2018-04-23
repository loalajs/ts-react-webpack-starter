import * as React from 'react';
import * as io from 'socket.io-client';
import './Chat.scss';

io();

export default () => (
  <div id="chat">
    <ul id="messages"></ul>
    <form action="">
      <input id="m" /><button>Send</button>
    </form>
  </div>);
