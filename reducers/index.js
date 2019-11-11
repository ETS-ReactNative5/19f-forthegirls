import { combineReducers } from 'redux';

import ErrorReducer from './error_reducer';
import UserReducer from './user_reducer';
import AuthReducer from './auth_reducer';
import EventReducer from './event_reducer';
import CSReducer from './survey_reducers/cs_reducer';
import DemographicReducer from './survey_reducers/demographic_reducer';
import BasicReducer from './survey_reducers/basic_reducer';
import EducationReducer from './survey_reducers/education_reducer';
import PersonalityReducer from './survey_reducers/personality_reducer';

const rootReducer = combineReducers({
  error: ErrorReducer,
  user: UserReducer,
  auth: AuthReducer,
  events: EventReducer,
  cs: CSReducer,
  demographic: DemographicReducer,
  basic: BasicReducer,
  education: EducationReducer,
  personality: PersonalityReducer,
});

export default rootReducer;
