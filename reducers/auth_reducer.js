import { ActionTypes } from '../actions';

//add username?
const UserReducer = (state = {
    authenticated: false,
    email: '',
  }, action) => {
    switch (action.type) {
      case ActionTypes.AUTH_USER:
        return Object.assign({}, state, {
          authenticated: true,
          email: action.payload.email,
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