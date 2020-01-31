import { ActionTypes } from '../actions';

const AwardsReducer = (state = {
    allYours: [{}],
    award: {},
  }, action) => {
    console.log("i nreducer")
    console.log(action.type)
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
