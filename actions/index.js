import axios from 'axios';

const ROOT_URL = 'https://for-the-girls.herokuapp.com/api';

export const ActionTypes = {
    // USERS
    // CREATE_USER: 'CREATE_USER',
    FETCH_USER: 'FETCH_USER',
    // UPDATE_USER: 'UPDATE_USER',
    DELETE_USER: 'DELETE_USER',

    //ERRORS
    SET_ERROR: 'SET_ERROR',
    CLEAR_ERROR: 'CLEAR_ERROR',
  };

  //----------------- USERS ------------------//

  //retrieves the specified user object from the database
  export function getUser(username) {
    return (dispatch) => {
        axios.get(`${ROOT_URL}/users/${username}`)
          .then((response) => {
            dispatch({ type: ActionTypes.FETCH_USER, payload: response.data });
          }).then(() => {
            dispatch({ type: ActionTypes.ERROR_CLEAR, payload: null });
          }).catch((error) => {
            dispatch({ type: ActionTypes.ERROR_SET, error });
          });
      };
  } 

  //creates a new user with email, username and password
  export function createUser(fields) {
    return (dispatch) => {
      //need to give it email, username and password
        axios.post(`${ROOT_URL}/signup`, fields)
          .then((response) => {
            dispatch({ type: ActionTypes.FETCH_USER, payload: response.data });
          }).then(() => {
            dispatch({ type: ActionTypes.ERROR_CLEAR, payload: null });
          }).catch((error) => {
            dispatch({ type: ActionTypes.ERROR_SET, error });
          });
      };
  }

  //edits the user object
  export function editUser(fields) {
    return (dispatch) => {
      //need to give it email, username and password
        axios.put(`${ROOT_URL}/users/${fields.username}`, fields)
          .then((response) => {
            dispatch({ type: ActionTypes.FETCH_USER, payload: response.data });
          }).then(() => {
            dispatch({ type: ActionTypes.ERROR_CLEAR, payload: null });
          }).catch((error) => {
            dispatch({ type: ActionTypes.ERROR_SET, error });
          });
      };
  }

