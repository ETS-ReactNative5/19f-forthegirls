import { ActionTypes } from '../actions';

const UserReducer = (state = {
    username: '',
  }, action) => {
    switch (action.type) {
      case ActionTypes.FETCH_USER:
        return Object.assign({}, state, {
          username: action.payload.result[0].username,
        });
      case ActionTypes.CREATE_USER:
        return Object.assign({}, state, {
          username: action.payload.username,
        });
      default:
        return state;
    }  
  };
  
export default UserReducer;