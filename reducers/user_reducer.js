import { ActionTypes } from '../actions';

//This reducer enables us to store all user information in state to be used throughout the app

const UserReducer = (state = {
  // basic
  username: '',
  email: '',
  matches: [],
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
  promptThreeAnswer: '',
  profileURL: '',

  firstTime: false,

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

        frontEnd: action.payload.result.score_frontEnd,
        backEnd: action.payload.result.score_backEnd,
        small: action.payload.result.score_small,
        medium: action.payload.result.score_medium,
        large: action.payload.result.score_large,
        meritocratic: action.payload.result.score_meritocratic,
        nurturing: action.payload.result.score_nurturing,
        fratty: action.payload.result.score_fratty,
        fast: action.payload.result.score_fast,
        organized: action.payload.result.score_organized,
        stable: action.payload.result.score_stable,
        formal: action.payload.result.score_formal,
        relaxed: action.payload.result.score_relaxed,
        web: action.payload.result.score_web,
        user: action.payload.result.score_user,
        design: action.payload.result.score_design,
        mobile: action.payload.result.score_mobile,
        security: action.payload.result.score_security,
        algorithms: action.payload.result.score_algorithms,
        storage: action.payload.result.score_storage,

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

        profileURL: action.payload.result.profileURL,
        firstTime: action.payload.result.firstTime,

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
