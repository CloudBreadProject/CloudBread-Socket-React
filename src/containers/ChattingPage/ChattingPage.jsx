import React, { Component, PropTypes } from 'react';
import styles from './ChattingPage.scss';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setTitle, socket } from 'lib/context';
import ChattingBox from './ChattingBox';
import {
  addChannel,
  addMessage,
  addUserToChannel,
} from 'modules/chat';

const mapStateToProps = (state) => ({
  channels: state.chat.channels,
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  addChannel,
  addUserToChannel,
  addMessage,
}, dispatch);

class ChattingPage extends Component {
  static propTypes = {
    channels: PropTypes.object,
    addChannel: PropTypes.func,
    addUserToChannel: PropTypes.func,
    addMessage: PropTypes.func,
  };

  constructor() {
    super();
    this.handleClickJoinChannel = this.handleClickJoinChannel.bind(this);
  }

  componentDidMount() {
    socket.on('channel connected', ({ channel }) => {
      this.props.addChannel({ channel });
      this.forceUpdate();
    });
    socket.on('user joined', ({ user, channel }) => {
      this.props.addUserToChannel({ user, channel });
      this.forceUpdate();
    });
    socket.on('new message', ({ message, channel }) => {
      this.props.addMessage({
        message,
        channel,
      });
      this.forceUpdate();
    });
  }

  render() {
    const { channels } = this.props;
    setTitle('CloudBread Socket.IO Chatting Example with Multiple Channels');
    const channelList = [];
    for (const key in channels) { // eslint-disable-line
      const channel = channels[key];
      channelList.push(<ChattingBox key={key} {...channel} />);
    }
    return (
      <div className={styles.ChattingPage}>
        <div>
          <h1>Join Channel</h1>
          <input type="text" ref="link" placeholder="Channel ID" />
          <button type="button" onClick={this.handleClickJoinChannel}>Submit</button>
        </div>
        <div>
          <h1>Channel List</h1>
          {channelList}
        </div>
      </div>
    );
  }

  handleClickJoinChannel() {
    const data = {
      link: this.refs.link.value,
    };
    socket.emit('join channel', data);
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChattingPage);
