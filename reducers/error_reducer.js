import { ActionTypes } from '../actions';

//This reducer stores various errors in state

const ErrorReducer = (state = '', action) => {
    switch (action.type) {
      case ActionTypes.SET_ERROR:
        return action.error.message;
      case ActionTypes.AUTH_ERROR:
        return action.message;
      case ActionTypes.CLEAR_ERROR:
        return null;
      default:
        return state;
    }
  };

  export default ErrorReducer;
