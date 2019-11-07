import { ActionTypes } from '../actions';

//add username?
const UserReducer = (state = {
    authenticated: false,
    username: '',
  }, action) => {
    switch (action.type) {
      case ActionTypes.AUTH_USER:
        return Object.assign({}, state, {
          authenticated: true,
          username: action.payload.username,
        });
      case ActionTypes.DEAUTH_USER: 
        return Object.assign({}, state, {
          authenticated: false,
        });
      case ActionTypes.AUTH_ERROR: 
        return Object.assign({}, state, {
          authenticated: false,
        });
      default:
        return state;
    }  
  };
  
export default UserReducer;