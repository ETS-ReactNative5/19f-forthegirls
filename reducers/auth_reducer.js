import { ActionTypes } from '../actions';

//This reducer functions to store if a user is logged in or not, and if they are, key information such as username and id

const AuthReducer = (state = {
    authenticated: false,
    username: '',
    id: '',
    pushToken: '',
  }, action) => {
    switch (action.type) {
      case ActionTypes.AUTH_USER:
        return Object.assign({}, state, {
          authenticated: true,
          username: action.payload.username,
          id: action.payload.id,
        });
        case ActionTypes.AUTH_TOKEN: 
        console.log(action.payload);
        return Object.assign({}, state, {
          pushToken: action.payload,
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
  
export default AuthReducer;