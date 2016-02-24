const initialState = {
  snackbarMessage: '',
  openSnackbar: false,
};

export const SHOW_SNACKBAR_MESSAGE = 'SHOW_SNACKBAR_MESSAGE';
export const HIDE_SNACKBAR_MESSAGE = 'HIDE_SNACKBAR_MESSAGE';

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case SHOW_SNACKBAR_MESSAGE:
      return {
        ...state,
        openSnackbar: true,
        snackbarMessage: action.payload.snackbarMessage,
      };
    case HIDE_SNACKBAR_MESSAGE:
      return {
        ...state,
        openSnackbar: false,
        snackbarMessage: '',
      };
    default:
      return state;
  }
};

export function showSnackbarMessage({ snackbarMessage }) {
  return {
    type: SHOW_SNACKBAR_MESSAGE,
    payload: {
      snackbarMessage,
    },
  };
}

export function hideSnackbarMessage() {
  return {
    type: HIDE_SNACKBAR_MESSAGE,
  };
}
