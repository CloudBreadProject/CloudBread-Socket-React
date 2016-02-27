const initialState = {
  socketUser: null,
  isSocketAuthenticated: false,
};

const AUTHENTICATE_SOCKET = 'AUTHENTICATE_SOCKET';

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case AUTHENTICATE_SOCKET:
      return {
        ...state,
        isSocketAuthenticated: true,
        socketUser: action.payload.socketUser,
      };
    default:
      return state;
  }
};

export function authenticateSocket(socketUser) {
  return {
    type: AUTHENTICATE_SOCKET,
    payload: {
      socketUser,
    },
  };
}
