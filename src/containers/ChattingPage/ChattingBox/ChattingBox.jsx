import React, { Component, PropTypes } from 'react';
import { socket } from 'lib/context';

class ChattingBox extends Component {
  static propTypes = {
    link: PropTypes.string.isRequired,
    messages: PropTypes.array.isRequired,
  };

  constructor() {
    super();
    this.handleClickSend = this.handleClickSend.bind(this);
  }

  render() {
    const { link, messages } = this.props;

    return (
      <div>
        <h1>#{link}</h1>
        <ul>
          {messages.map((message, idx) => (
            <li key={idx}>
              <span>{message.username}</span>
              <span>{message.content}</span>
            </li>
          ))}
        </ul>
        <div>
          <input type="text" ref="content" placeholder="message here" />
          <button type="button" onClick={this.handleClickSend}>Send</button>
        </div>
      </div>
    );
  }

  handleClickSend() {
    const { link } = this.props;
    socket.emit('new message', {
      link,
      content: this.refs.content.value,
    });
  }
}

export default ChattingBox;
