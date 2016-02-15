import React, { Component } from 'react';
import styles from './HomePage.scss';
import { setTitle, socket } from 'lib/context';

const channels = [];

class HomePage extends Component {
  constructor() {
    super();
  }

  componentDidMount() {
    socket.on('join channel', data => {
      const {
        username,
        channel,
      } = data;
      channels.push({
        username,
        channel,
      });
    });
    console.log(socket);
  }

  render() {
    setTitle('CloudBread Socket.IO Chatting');
    return (
      <div className={styles.HomePage}>
        <div>
          <input type="text" placeholder="Username" ref="username" />
          <input type="text" placeholder="Channel Name" ref="channel" />
          <button type="button">Connect to Channel</button>
        </div>
        {channels.map((channel, idx) => (
          <div key={idx}>
            <h1>{channel.title}</h1>
          </div>
        ))}
      </div>
    );
  }

  handleClickConnectToChannel() {
    const username = this.refs.username.getValue();
    const channel = this.refs.channel.getValue();
    socket.emit('join channel', {
      username,
      channel,
    });
  }
}

export default HomePage;
