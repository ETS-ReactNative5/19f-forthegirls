import { ActionTypes } from '../actions';

const EventReducer = (state = {
    all: [{}],
    event: {},
    connections: [],
  }, action) => {
    switch (action.type) {
      // case ActionTypes.ADD_EVENT:
      // console.log('made it to reducer');
      //   return Object.assign({}, state, {
      //     rsvps: action.apyload.result.rsvps,
      //     title: action.payload.result.title,
      //     date: action.payload.result.date,
      //     time: action.payload.result.time,
      //     location: action.payload.result.location,
      //     description: action.payload.result.description,
      //   });
      case ActionTypes.FETCH_EVENTS:
        return Object.assign({}, state, { all: action.payload });
      case ActionTypes.FETCH_EVENT:
        return Object.assign({}, state, { event: action.payload });
        case ActionTypes.FETCH_RSVP_CONNECTIONS:
          return Object.assign({}, state, { connections: action.payload });
      default:
        return state;
    }
  };

export default EventReducer;
