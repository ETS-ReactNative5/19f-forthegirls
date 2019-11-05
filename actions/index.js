import axios from 'axios';

const ROOT_URL = 'https://for-the-girls.herokuapp.com/api';

export const ActionTypes = {
    // USERS
    // CREATE_USER: 'CREATE_USER',
    FETCH_USER: 'FETCH_USER',
    // UPDATE_USER: 'UPDATE_USER',
    DELETE_USER: 'DELETE_USER',

    //AUTH
    AUTH_USER: 'AUTH_USER',
    DEAUTH_USER: 'DEAUTH_USER',
    AUTH_ERROR: 'AUTH_ERROR',

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
  //axios.post(`${ROOT_URL}/posts`, post, { headers: { authorization: localStorage.getItem('token') } })
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
  //axios.post(`${ROOT_URL}/posts`, post, { headers: { authorization: localStorage.getItem('token') } })
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

//---------------------------- AUTH --------------------------------//

export function signinUser({ email, password }, history) {
  return (dispatch) => {
    axios.post(`${ROOT_URL}/signin`, { email, password }).then((response) => {
      dispatch({ type: ActionTypes.AUTH_USER, payload: { email, username: response.data.username } });
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('email', response.data.email);
      localStorage.setItem('username', response.data.username);
      history.push('/');
    }).catch((error) => {
      // console.log('hi');
      dispatch(authError(`Sign In Failed: ${error.response.data}`));
    });
  };
}



export function signupUser({ email, password, username }, history) {
  // console.log('here');
  return (dispatch) => {
    const fields = {
      email, username, password,
    };
    axios.post(`${ROOT_URL}/signup`, fields).then((response) => {
      // console.log('IN RESPONSE');
      dispatch({ type: ActionTypes.AUTH_USER, payload: { email, username } });
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('email', response.data.email);
      localStorage.setItem('username', response.data.username);
      history.push('/');
    }).catch((error) => {
      dispatch(authError(`Sign In Failed: ${error.response.data}`));
    });
  };
}


// deletes token from localstorage
// and deauths
export function signoutUser(history) {
  return (dispatch) => {
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    localStorage.removeItem('username');
    dispatch({ type: ActionTypes.DEAUTH_USER });
    history.push('/');
  };
  // return (dispatch) => {
  //   localStorage.removeItem('token');
  //   dispatch({ type: ActionTypes.DEAUTH_USER });
  //   history.push('/');
  // };
}


// trigger to deauth if there is error
// can also use in your error reducer if you have one to display an error message
export function authError(error) {
  return {
    type: ActionTypes.AUTH_ERROR,
    message: error,
  };
}
