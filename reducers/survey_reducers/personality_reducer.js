import { ActionTypes } from '../actions';

const PersonalityReducer = (state = {
    extraversion: 0,
    listening: 0,
  }, action) => {
    switch (action.type) {
      case ActionTypes.ADD_PERSONAL:
        return Object.assign({}, state, {
          //make sure when we actually call add_cs that we define the parameters using these names
          extraversion: action.payload.result.extraversion,
          listening: action.payload.result.listening,
        });
      default:
        return state;
    }
  };

export default PersonalityReducer;
