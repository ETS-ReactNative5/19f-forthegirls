import { ActionTypes } from '../actions';

//This reducer stores the badges users have gotten in state

const ChatReducer = (state = {
  unreadCount: 0,
}, action) => {
  switch (action.type) {
    case ActionTypes.CHECK_UNREAD_MESSAGES:
      return Object.assign({}, state, { unreadCount: action.payload });
    default:
      return state;
  }
};

export default ChatReducer;
