import { ActionTypes } from '../actions';

//This reducer works to store information about events and the events a user has RSVP'd to in state

const EventReducer = (state = {
    all: [{}],
    allYours: [{}],
    event: {},
    connections: [],
    eventCount: 0,
  }, action) => {
    switch (action.type) {
      case ActionTypes.FETCH_EVENTS:
        return Object.assign({}, state, { all: action.payload });
        case ActionTypes.FETCH_YOUR_EVENTS:
          return Object.assign({}, state, { allYours: action.payload });
      case ActionTypes.FETCH_EVENT:
        return Object.assign({}, state, { event: action.payload });
      case ActionTypes.FETCH_RSVP_CONNECTIONS:
          return Object.assign({}, state, { connections: action.payload });
      case ActionTypes.SET_EVENT_COUNT: 
        return Object.assign({}, state, { eventCount: action.payload });
      default:
        return state;
    }
  };

export default EventReducer;
