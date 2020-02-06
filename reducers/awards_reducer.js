import { ActionTypes } from '../actions';

//This reducer stores the badges users have gotten in state

const AwardsReducer = (state = {
  allYours: [{}],
  award: {},
}, action) => {
  switch (action.type) {
    case ActionTypes.FETCH_YOUR_AWARDS:
      return Object.assign({}, state, { allYours: action.payload });
    case ActionTypes.FETCH_AWARD:
      return Object.assign({}, state, { award: action.payload });
    default:
      return state;
  }
};

export default AwardsReducer;
