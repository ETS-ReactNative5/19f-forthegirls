import { ActionTypes } from '../actions';

const EventReducer = (state = {
    rsvps: [],
    title: '',
    date: '',
    time: '',
    location: '',
    description: '',
  }, action) => {
    switch (action.type) {
      case ActionTypes.ADD_EVENT:
      console.log('made it to reducer');
        return Object.assign({}, state, {
          rsvps: action.apyload.result.rsvps,
          title: action.payload.result.title,
          date: action.payload.result.date,
          time: action.payload.result.time,
          location: action.payload.result.location,
          description: action.payload.result.description,
        });
      default:
        return state;
    }
  };

export default EventReducer;
