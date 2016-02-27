import React, { Component, PropTypes } from 'react';
import styles from './HomePage.scss';
import { setTitle, socket } from 'lib/context';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { authenticateSocket } from 'reducers/auth';
import { showSnackbarMessage } from 'reducers/AppLayout';
import {
  TextField,
  RaisedButton,
  Paper,
} from 'material-ui';

const mapStateToProps = ({ auth }) => ({
  isSocketAuthenticated: auth.isSocketAuthenticated,
});

const mapDispatchToState = (dispatch) => bindActionCreators({
  authenticateSocket,
  showSnackbarMessage,
}, dispatch);

class HomePage extends Component {
  static contextTypes = {
    router: PropTypes.object,
  };

  static propTypes = {
    authenticateSocket: PropTypes.func,
    showSnackbarMessage: PropTypes.func,
    isSocketAuthenticated: PropTypes.bool,
  };

  constructor() {
    super();
    this.authenticate = this.authenticate.bind(this);
  }

  componentDidMount() {
    if (this.props.isSocketAuthenticated) {
      this.context.router.push('/chatting');
      this.props.showSnackbarMessage({
        snackbarMessage: 'Already authenticated, if needed you can refresh',
      });
    }
    socket.on('authorized', ({ user }) => {
      this.props.authenticateSocket(user);
      this.props.showSnackbarMessage({
        snackbarMessage: 'Authentication succeed',
      });
      this.context.router.push('/chatting');
    });
  }

  componentWillUnmount() {
    socket.removeListener('authorized');
  }

  render() {
    setTitle('CloudBread Socket.IO Chatting Example');
    return (
      <div className={styles.HomePage}>
        <h1>CloudBread Socket.IO Chatting Example</h1>
        <Paper className={styles.Paper}>
          <TextField
            floatingLabelText="Username"
            hintText="BlahBlah Something"
            ref="username"
            onEnterKeyDown={this.authenticate}
          />
          <RaisedButton
            label="Authorize"
            primary
            onClick={this.authenticate}
          />
        </Paper>
      </div>
    );
  }

  authenticate() {
    const data = {
      username: this.refs.username.getValue(),
    };
    socket.emit('authenticate user', data);
  }
}

export default connect(mapStateToProps, mapDispatchToState)(HomePage);
