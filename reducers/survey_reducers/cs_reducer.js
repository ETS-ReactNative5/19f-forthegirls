import { ActionTypes } from '../../actions';

const CSReducer = (state = {
    front: false,
    back: false,
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
    users: false,
    design: false,
    mobile: false,
    security: false,
    algorithms: false,
    storage: false,
  }, action) => {
    switch (action.type) {
      case ActionTypes.ADD_CS:
        return Object.assign({}, state, {
          //make sure when we actually call add_cs that we define the parameters using these names
          front: action.payload.result.front,
          back: action.payload.result.back,
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
          users: action.payload.result.users,
          design: action.payload.result.design,
          mobile: action.payload.result.mobile,
          security: action.payload.result.security,
          algorithms: action.payload.result.algorithms,
          storage: action.payload.result.storage,
        });
      default:
        return state;
    }
  };

export default CSReducer;
