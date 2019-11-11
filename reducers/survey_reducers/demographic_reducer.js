import { ActionTypes } from '../actions';

const DemographicReducer = (state = {
    age: 0,
    high: false,
    college: false,
    post: false,
  }, action) => {
    switch (action.type) {
      case ActionTypes.ADD_DEMO:
        return Object.assign({}, state, {
          //make sure when we actually call add_cs that we define the parameters using these names
          age: action.payload.result.age,
          high: action.payload.result.high,
          college: action.payload.result.college,
          post: action.payload.result.post,
        });
      default:
        return state;
    }
  };

export default DemographicReducer;
