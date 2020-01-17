import { ActionTypes } from '../actions';

const UserReducer = (state = {
  username: '',
  email: '',
  matches: [],
  // potentialMatches: [],

  // basic 
  firstName: '',
  lastName: '',
  highSchool: '',
  collegeName: '',
  gradYear: '',
  currentJob: '',

  // CS:
  frontEnd: false,
  backEnd: false,
  small: false,
  medium: false,
  large: false,
  meritocratic: false,
  nurturing: false,
  fratty: false,
  fast: false,
  organized: false,
  stable: false,
  formal: false,
  relaxed: false,
  web: false,
  user: false,
  design: false,
  mobile: false,
  security: false,
  algorithms: false,
  storage: false,

  // Demographics
  age: 0,
  hs: false,
  college: false,
  pg: false,

  // Personality
  extraversion: 50,
  listening: 50,

  // Prompts
  promptOneQuestion: '',
  promptOneAnswer: '',
  promptTwoQuestion: '',
  promptTwoAnswer: '',
  promptThreeQuestion: '',
  promptThreeAnswer: ''

}, action) => {
  switch (action.type) {
    case ActionTypes.FETCH_USER:
      return Object.assign({}, state, {
        username: action.payload.result.username,
        email: action.payload.result.email,
        matches: action.payload.result.matches,

        firstName: action.payload.result.firstName,
        lastName: action.payload.result.lastName,
        location: action.payload.result.location,
        highSchool: action.payload.result.highSchool,
        collegeName: action.payload.result.collegeName,
        gradYear: action.payload.result.gradYear,
        currentJob: action.payload.result.currentJob,

        frontEnd: action.payload.result.frontEnd,
        backEnd: action.payload.result.backEnd,
        small: action.payload.result.small,
        medium: action.payload.result.medium,
        large: action.payload.result.large,
        meritocratic: action.payload.result.meritocratic,
        nurturing: action.payload.result.nurturing,
        fratty: action.payload.result.fratty,
        fast: action.payload.result.fast,
        organized: action.payload.result.organized,
        stable: action.payload.result.stable,
        formal: action.payload.result.formal,
        relaxed: action.payload.result.relaxed,
        web: action.payload.result.web,
        user: action.payload.result.user,
        design: action.payload.result.design,
        mobile: action.payload.result.mobile,
        security: action.payload.result.security,
        algorithms: action.payload.result.algorithms,
        storage: action.payload.result.storage,

        age: action.payload.result.age,
        hs: action.payload.result.hs,
        college: action.payload.result.college,
        pg: action.payload.result.pg,

        extraversion: action.payload.result.extraversion,
        listening: action.payload.result.listening,

        promptOneQuestion: action.payload.result.promptOneQuestion,
        promptOneAnswer: action.payload.result.promptOneAnswer,
        promptTwoQuestion: action.payload.result.promptTwoQuestion,
        promptTwoAnswer: action.payload.result.promptTwoAnswer,
        promptThreeQuestion: action.payload.result.promptThreeQuestion,
        promptThreeAnswer: action.payload.result.promptThreeAnswer,

      });
    case ActionTypes.USER_GET_POT_MATCHES:
      return Object.assign({}, state, {
        potentialMatches: action.payload,
      });
    case ActionTypes.GET_MATCHES:
      return Object.assign({}, state, {
        matches: action.payload,
      });
    default:
      return state;
  }
};

export default UserReducer;