import { ActionTypes } from '../actions';

const AwardsReducer = (state = {
    allYours: [{}],
    award: {},
  }, action) => {
    switch (action.type) {
      case ActionTypes.FETCH_YOUR_AWARDS:
          return Object.assign({}, state, { allYours: action.payload });
      case ActionTypes.FETCH_AWARD:
        return Object.assign({}, state, { event: action.payload });
      default:
        return state;
    }
  };

export default AwardsReducer;
