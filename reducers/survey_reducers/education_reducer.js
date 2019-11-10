import { ActionTypes } from '../actions';

const EducationReducer = (state = {
    highName: '',
    collegeName: '',
    gradYear: '',
    job: '',
  }, action) => {
    switch (action.type) {
      case ActionTypes.ADD_EDU:
        return Object.assign({}, state, {
          //make sure when we actually call add_cs that we define the parameters using these names
          highName: action.payload.result.highName,
          collegeName: action.payload.result.collegeName,
          gradYear: action.payload.result.gradYear,
          job: action.payload.result.job,
        });
      default:
        return state;
    }
  };

export default EducationReducer;
