import { combineReducers } from 'redux';

import ErrorReducer from './error_reducer';
import UserReducer from './user_reducer';

const rootReducer = combineReducers({
  error: ErrorReducer,
  user: UserReducer,
});

export default rootReducer;
