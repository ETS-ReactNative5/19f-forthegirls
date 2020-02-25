import { ActionTypes } from '../actions';

//This reducer stores the badges users have gotten in state

const ChatReducer = (state = {
  unreadCount: 0,
  chats: undefined,
  numContacted: 0,
  numChats: 0,
}, action) => {
  switch (action.type) {
    case ActionTypes.CHECK_UNREAD_MESSAGES:
      return Object.assign({}, state, { unreadCount: action.payload });
    case ActionTypes.GET_CHATS:
      return Object.assign({}, state, { chats: action.payload });
    case ActionTypes.FETCH_NUM_CONTACTED:
      return Object.assign({}, state, { numContacted: action.payload }); 
    case ActionTypes.FETCH_NUM_CHATS:
      return Object.assign({}, state, { numChats: action.payload }); 
    case ActionTypes.CLEAR_CHATS:
      return Object.assign({}, state, { chats: undefined }); 
    default:
      return state;

  }
};

export default ChatReducer;
