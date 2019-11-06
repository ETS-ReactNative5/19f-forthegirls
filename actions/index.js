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

  //MATCHES
  PAIR_MATCH_TO_USER: 'PAIR_MATCH_TO_USER',
  FETCH_MATCHES: 'FETCH_MATCHES'

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
        console.log(response.data);
      }).then(() => {
        dispatch({ type: ActionTypes.ERROR_CLEAR, payload: null });
      }).catch((error) => {
        dispatch({ type: ActionTypes.ERROR_SET, error });
      });
  };
}

//----------------- MATCHES ------------------//
export function pairMatchToUser(username1, username2) {
  return (dispatch) => {
    axios.put(`${ROOT_URL}/users/pair/${username1}`, { username: username2 })
      .then((response) => {
        dispatch({ type: ActionTypes.PAIR_MATCH_TO_USER, payload: response.data })
        console.log(response.data);
      }).then(() => {
        dispatch({ type: ActionTypes.ERROR_CLEAR, payload: null });
      }).catch((error) => {
        dispatch({ type: ActionTypes.ERROR_SET, error });
      });
  }
}

/* don't need this yet ? or ever */
// export function getMatches(username) {
//   return (dispatch) => {
//     axios.get(`${ROOT_URL}/users/matches/${username}`)
//       .then((response) => {
//         dispatch({ type: ActionTypes.FETCH_MATCHES, payload: response.data })
//         console.log(response.data);
//       }).then(() => {
//         dispatch({ type: ActionTypes.ERROR_CLEAR, payload: null });
//       }).catch((error) => {
//         dispatch({ type: ActionTypes.ERROR_SET, error });
//       });
//   }
// }

