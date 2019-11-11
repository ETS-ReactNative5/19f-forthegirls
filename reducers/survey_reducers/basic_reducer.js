import { ActionTypes } from '../../actions';

const BasicReducer = (state = {
  first: '',
  last: '',
  email: '',
  username: '',
  password: '',
}, action) => {
  switch (action.type) {
    case ActionTypes.ADD_BASICINFO:
      return Object.assign({}, state, {
        //make sure when we actually call add_cs that we define the parameters using these names
        first: action.payload.result.first,
        last: action.payload.result.last,
        email: action.payload.result.email,
        username: action.payload.result.username,
        password: action.payload.result.password,
      });
    default:
      return state;
  }
};

export default BasicReducer;
