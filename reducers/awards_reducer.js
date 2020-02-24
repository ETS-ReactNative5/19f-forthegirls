import { ActionTypes } from '../actions';

//This reducer stores the badges users have gotten in state

const AwardsReducer = (state = {
  allYours: [{}],
  award: {},
  numContacted: 0,
  numChats: 0,
}, action) => {
  switch (action.type) {
    case ActionTypes.FETCH_YOUR_AWARDS:
      return Object.assign({}, state, { allYours: action.payload });
    case ActionTypes.FETCH_AWARD:
      return Object.assign({}, state, { award: action.payload });
    case ActionTypes.FETCH_NUM_CONTACTED:
      return Object.assign({}, state, { numContacted: action.payload }); 
    case ActionTypes.FETCH_NUM_CHATS:
    return Object.assign({}, state, { numChats: action.payload }); 
    default:
      return state;
  }
};

export default AwardsReducer;
