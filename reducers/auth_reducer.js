import { ActionTypes } from '../actions';

//add username?
const UserReducer = (state = {
    authenticated: false,
    username: '',
    id: '',
  }, action) => {
    switch (action.type) {
      case ActionTypes.AUTH_USER:
        return Object.assign({}, state, {
          authenticated: true,
          username: action.payload.username,
          id: action.payload.id,
        });
      case ActionTypes.DEAUTH_USER: 
        return Object.assign({}, state, {
          authenticated: false,
          username: '',
          id: '',
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