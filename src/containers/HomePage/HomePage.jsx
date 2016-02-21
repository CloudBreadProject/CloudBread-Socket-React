import React, { Component, PropTypes } from 'react';
import styles from './HomePage.scss';
import { setTitle, socket } from 'lib/context';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { authenticateSocket } from 'modules/auth';

const mapDispatchToState = (dispatch) => bindActionCreators({
  authenticateSocket,
}, dispatch);

class HomePage extends Component {
  static contextTypes = {
    router: PropTypes.object,
  };

  static propTypes = {
    authenticateSocket: PropTypes.func,
  };

  constructor() {
    super();
    this.handleClickAuthorize = this.handleClickAuthorize.bind(this);
  }

  componentDidMount() {
    socket.on('authorized', ({ user }) => {
      this.props.authenticateSocket(user);
      this.context.router.push('/chatting');
    });
  }

  render() {
    setTitle('CloudBread Socket.IO Chatting Example');
    return (
      <div className={styles.HomePage}>
        <h1>CloudBread Socket.IO Chatting Example</h1>
        <div>
          <input type="text" ref="username" placeholder="Username" />
          <button type="button" onClick={this.handleClickAuthorize}>Authorize</button>
        </div>
      </div>
    );
  }

  handleClickAuthorize() {
    const data = {
      username: this.refs.username.value,
    };
    socket.emit('authenticate user', data);
  }
}

export default connect(null, mapDispatchToState)(HomePage);
