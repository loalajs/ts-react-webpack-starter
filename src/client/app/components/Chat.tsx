import * as React from 'react';
import * as io from 'socket.io-client';
import './Chat.scss';

interface ChatState {
  inputMessage: string;
  chats: string[];
  isTyping: boolean;
}

interface ChatParams {
}

export default class extends React.Component<ChatParams, ChatState> {
  private socket: SocketIOClient.Socket;
  constructor(props: any) {
    super(props);
    this.state = {
      inputMessage: '',
      chats: [],
      isTyping: false,
    };
    this.socket = io();
    this.onMessage();
    this.onUserTyping();
    this.onUserNotTyping();
    this.handleSendButton = this.handleSendButton.bind(this);
    this.handleInputMessage = this.handleInputMessage.bind(this);
    this.handleInputFocus = this.handleInputFocus.bind(this);
    this.handleInputBlur = this.handleInputBlur.bind(this);
  }

  handleFormSubmit() {
    const inputMessage = this.state.inputMessage;
    this.setState({
      inputMessage: '',
    });
    this.socket.emit('message', inputMessage);
  }

  handleSendButton(e: any) {
    e.preventDefault();
    const message = this.state.inputMessage;
    console.log(`User has sent message: ${message}`);
    this.handleFormSubmit();
  }

  handleInputMessage(e: any) {
    const inputMessage = e.target.value;
    this.setState({
      inputMessage,
    });
  }

  handleInputFocus(e: any) {
    this.socket.emit('userTyping');
  }

  handleInputBlur(e: any) {
    this.socket.emit('userNotTyping');
  }

  onMessage() {
    this.socket.on('message', (chat: string) => {
      console.log(`[ Client ]: Received message: ${chat} `);
      this.setState(prevState => ({
        chats: [...prevState.chats, chat],
      }));
    });
  }

  /** Later should add the userid so it can
   * distinguish who is on the typing action
   */
  onUserTyping() {
    this.socket.on('userTyping', () => {
      console.log(`Somebody is typing.`);
      this.setState({
        isTyping: true,
      });
    });
  }

  onUserNotTyping() {
    this.socket.on('userNotTyping', () => {
      console.log(`Somebody is stop typing.`);
      this.setState({
        isTyping: false,
      });
    });
  }

  render() {
    return (
      <div id="chat">
        <ul id="messages">
        {
          this.state.chats.map((chat: string, index) => {
            return (
              <li key={index}>{chat}</li>
            );
          })
        }
        </ul>
        <form>
          <input
          onBlur={this.handleInputBlur}
          onFocus={this.handleInputFocus}
          onChange={this.handleInputMessage}
          value={this.state.inputMessage}
          id="m"/>
          <button onClick={this.handleSendButton}>Send</button>
        </form>
      </div>
    );
  }
}
