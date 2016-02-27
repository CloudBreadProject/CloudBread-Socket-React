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
} from 'reducers/chat';
import { showSnackbarMessage } from 'reducers/AppLayout';
import {
  Paper,
  TextField,
  RaisedButton,
} from 'material-ui';

const mapStateToProps = (state) => ({
  channels: state.chat.channels,
  isSocketAuthenticated: state.auth.isSocketAuthenticated,
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  addChannel,
  addUserToChannel,
  addMessage,
  showSnackbarMessage,
}, dispatch);

class ChattingPage extends Component {
  static contextTypes = {
    router: PropTypes.object,
  };

  static propTypes = {
    channels: PropTypes.object,
    addChannel: PropTypes.func,
    addUserToChannel: PropTypes.func,
    addMessage: PropTypes.func,
    showSnackbarMessage: PropTypes.func,
    isSocketAuthenticated: PropTypes.bool,
  };

  constructor() {
    super();
    this.joinChannel = this.joinChannel.bind(this);
  }

  componentDidMount() {
    if (!this.props.isSocketAuthenticated) {
      return this.context.router.push('/');
    }
    socket.on('channel connected', ({ channel }) => {
      this.props.addChannel({ channel });
      this.props.showSnackbarMessage({
        snackbarMessage: `channel ${channel.link} has connected`,
      });
      this.refs.link.setValue('');
      this.setState({
        isConnectingChannel: false,
      });
      this.forceUpdate();
    });
    socket.on('join channel error', () => {
      this.setState({
        isConnectingChannel: false,
      });
      this.props.showSnackbarMessage({
        snackbarMessage: `failed to connect channel ${this.reefs.link.getValue()}`,
      });
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

  componentWillUnmount() {
    socket.removeListener('join channel error');
    socket.removeListener('user joined');
    socket.removeListener('new message');
    socket.removeListener('channel connected');
  }

  render() {
    const { channels } = this.props;
    const { isConnectingChannel } = this.state || {};
    setTitle('CloudBread Socket.IO Chatting Example with Multiple Channels');
    const channelList = [];
    for (const key in channels) { // eslint-disable-line
      const channel = channels[key];
      channelList.push(<ChattingBox key={key} {...channel} />);
    }
    return (
      <div className={styles.ChattingPage}>
        <Paper className={styles.Paper}>
          <h1>Join Channel</h1>
          <TextField
            ref="link"
            floatingLabelText="Channel Short ID"
            hintText="CloudBread"
            onEnterKeyDown={this.joinChannel}
            disabled={isConnectingChannel}
          />
          <RaisedButton
            label="Join"
            secondary
            onClick={this.joinChannel}
            disabled={isConnectingChannel}
          />
        </Paper>
        <div>
          {channelList}
        </div>
      </div>
    );
  }

  joinChannel() {
    const data = {
      link: this.refs.link.getValue(),
    };
    this.setState({
      isConnectingChannel: true,
    });
    socket.emit('join channel', data);
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChattingPage);
