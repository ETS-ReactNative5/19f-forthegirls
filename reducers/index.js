import { combineReducers } from 'redux';

import ErrorReducer from './error_reducer';
import UserReducer from './user_reducer';
import AuthReducer from './auth_reducer';
import EventReducer from './event_reducer';

const rootReducer = combineReducers({
  error: ErrorReducer,
  user: UserReducer,
  auth: AuthReducer,
  events: EventReducer,
});

export default rootReducer;
