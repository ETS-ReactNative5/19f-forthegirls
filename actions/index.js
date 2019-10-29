import axios from 'axios';

const ROOT_URL = 'https://for-the-girls.herokuapp.com/api';

export const ActionTypes = {
    // USERS
    CREATE_USER: 'CREATE_USER',
    FETCH_USER: 'FETCH_USER',
    UPDATE_USER: 'UPDATE_USER',
    DELETE_USER: 'DELETE_USER',

    //ERRORS
    SET_ERROR: 'SET_ERROR',
    CLEAR_ERROR: 'CLEAR_ERROR',
  };

  export function getUser(userName) {
    return (dispatch) => {
        axios.get(`${ROOT_URL}/users/${userName}`)
          .then((response) => {
            dispatch({ type: ActionTypes.FETCH_USER, payload: response.data });
          }).then(() => {
            dispatch({ type: ActionTypes.ERROR_CLEAR, payload: null });
          }).catch((error) => {
            dispatch({ type: ActionTypes.ERROR_SET, error });
          });
      };
  } 

  export function createUser(userName) {
    return (dispatch) => {
        axios.post(`${ROOT_URL}/api/signup`, {userName})
          .then((response) => {
            dispatch({ type: ActionTypes.CREATE_USER, payload: { userName } });
          }).then(() => {
            dispatch({ type: ActionTypes.ERROR_CLEAR, payload: null });
          }).catch((error) => {
            dispatch({ type: ActionTypes.ERROR_SET, error });
          });
      };
  }