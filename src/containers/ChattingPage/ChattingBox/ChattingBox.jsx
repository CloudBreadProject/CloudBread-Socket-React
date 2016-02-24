import React, { Component, PropTypes } from 'react';
import { socket } from 'lib/context';
import {
  Paper,
  TextField,
  RaisedButton,
} from 'material-ui';
import styles from './ChattingBox.scss';

class ChattingBox extends Component {
  static propTypes = {
    link: PropTypes.string.isRequired,
    messages: PropTypes.array.isRequired,
  };

  constructor() {
    super();
    this.sendMessage = this.sendMessage.bind(this);
  }

  render() {
    const { link, messages } = this.props;

    return (
      <Paper className={styles.Paper}>
        <h1>#{link}</h1>
        {messages.length ? '' : <p>No one connected or chatted</p>}
        <ul className={styles.Logs}>
          {messages.map((message, idx) => (
            <li key={idx}>
              <span className={styles.Author}>{message.username}</span>
              <span className={styles.Content}>{message.content}</span>
            </li>
          ))}
        </ul>
        <div>
          <TextField
            ref="content"
            floatingLabelText="Message"
            hintText="blahblah something"
            onEnterKeyDown={this.sendMessage}
          />
          <RaisedButton
            label="Send"
            onClick={this.sendMessage}
          />
        </div>
      </Paper>
    );
  }

  sendMessage() {
    const { link } = this.props;
    socket.emit('new message', {
      link,
      content: this.refs.content.getValue(),
    });
    this.refs.content.setValue('');
  }
}

export default ChattingBox;
