import { ActionTypes } from '../actions';

const UserReducer = (state = {
    username: '',
    email: '',
    matches: [],
  }, action) => {
    switch (action.type) {
      case ActionTypes.FETCH_USER:
        return Object.assign({}, state, {
          username: action.payload.result.username,
          email: action.payload.result.email,
          matches: action.payload.result.matches,
        });
      default:
        return state;
    }  
  };
  
export default UserReducer;