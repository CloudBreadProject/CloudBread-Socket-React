import React, { Component, PropTypes } from 'react';
import styles from './App.scss';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { hideSnackbarMessage } from 'reducers/AppLayout';
import { Snackbar } from 'material-ui';

function mapStateToProps({ AppLayout }) {
  return {
    snackbarMessage: AppLayout.snackbarMessage,
    openSnackbar: AppLayout.openSnackbar,
  };
}

function mapDispatchToState(dispatch) {
  return bindActionCreators({
    hideSnackbarMessage,
  }, dispatch);
}

export class App extends Component {
  static propTypes = {
    children: PropTypes.object,
    snackbarMessage: PropTypes.string,
    openSnackbar: PropTypes.bool,
    hideSnackbarMessage: PropTypes.func,
  };

  constructor() {
    super();
    this.handleSnackbarRequestClose = this.handleSnackbarRequestClose.bind(this);
  }

  render() {
    const { snackbarMessage, openSnackbar } = this.props;
    return (
      <div className={styles.App}>
        {this.props.children}
        <Snackbar
          open={openSnackbar}
          message={snackbarMessage}
          autoHideDuration={4000}
          onRequestClose={this.handleSnackbarRequestClose}
        />
      </div>
    );
  }

  handleSnackbarRequestClose() {
    this.props.hideSnackbarMessage();
  }
}

export default connect(mapStateToProps, mapDispatchToState)(App);
