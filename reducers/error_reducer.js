import { ActionTypes } from '../actions';

const ErrorReducer = (state = '', action) => {
    switch (action.type) {
      case ActionTypes.ERROR_SET:
        return action.error.message;
      case ActionTypes.AUTH_ERROR:
        return action.message;
      case ActionTypes.ERROR_CLEAR:
        return null;
      default:
        return state;
    }
  };
  
  export default ErrorReducer;