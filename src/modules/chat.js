const initialState = {
  channels: {},
};

export const ADD_CHANNEL = 'ADD_CHANNEL';
export const ADD_USER_TO_CHANNEL = 'ADD_USER_TO_CHANNEL';
export const ADD_MESSAGE = 'ADD_MESSAGE';

export default (state = initialState, action = {}) => {
  const { channel, message, user } = action.payload || {};
  switch (action.type) {
    case ADD_CHANNEL:
      state.channels[channel.link] = { // eslint-disable-line
        ...channel,
        messages: [],
      };
      return state;
    case ADD_USER_TO_CHANNEL:
      state.channels[channel.link].messages.push({
        author: user.id,
        username: user.username,
        content: `${user.username} has connected`,
      });
      return state;
    case ADD_MESSAGE:
      state.channels[channel.link].messages.push({
        ...message,
      });
      return state;
    default:
      return state;
  }
};

export function addChannel({ channel }) {
  return {
    type: ADD_CHANNEL,
    payload: {
      channel,
    },
  };
}

export function addUserToChannel({ channel, user }) {
  return {
    type: ADD_USER_TO_CHANNEL,
    payload: {
      channel,
      user,
    },
  };
}

export function addMessage({ channel, message }) {
  return {
    type: ADD_MESSAGE,
    payload: {
      channel,
      message,
    },
  };
}
