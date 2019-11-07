import axios from 'axios';
import { AsyncStorage } from 'react-native';

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

  //EVENTS
  ADD_EVENT: 'ADD_EVENT',

  //MATCHES
  FETCH_USER_MATCHES: 'FETCH_USER_MATCHES',

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
        dispatch({ type: ActionTypes.SET_ERROR, error });
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
        dispatch({ type: ActionTypes.SET_ERROR, error });
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
        dispatch({ type: ActionTypes.SET_ERROR, error });
      });
  };
}

//---------------------------- AUTH --------------------------------//

export function signinUser({ email, password, navigate }) {
  return (dispatch) => {
    axios.post(`${ROOT_URL}/signin`, { email, password }).then((response) => {
      //  username: response.data.username
      dispatch({ type: ActionTypes.AUTH_USER, payload: { email } });

      //NEED TO ADD TOKEN
      //https://facebook.github.io/react-native/docs/asyncstorage
      _storeData = async () => {
        try {
          await AsyncStorage.setItem('token', response.data.token);
          await AsyncStorage.setItem('email', email);
        } catch (error) {
          console.log("error");
        }
      };

      _storeData();

      navigate.navigate("HomeScreen");

    }).catch((error) => {
      console.log(error);
      // dispatch(authError(`Sign In Failed: ${error.response.data}`));
    });
  };
}



export function signUpUser(fields, navigate) {
  return (dispatch) => {
    axios.post(`${ROOT_URL}/signup`, fields).then((response) => {
      dispatch({ type: ActionTypes.AUTH_USER, payload: { email: fields.email } });

      //should add token in here
      _storeData = async () => {
        try {
          //await AsyncStorage.setItem('token', response.data.token);
          await AsyncStorage.setItem('email', fields.email);
        } catch (error) {
          console.log("token error setting async");
        }
      };

      _storeData();

      //somehow get to next page
      navigate.navigate('HomeScreen')

    }).catch((error) => {
      console.log(error);
      // dispatch(authError(`Sign In Failed: ${error.response.data}`));
    });
  };
}


// deletes token from localstorage
// and deauths
export function signoutUser(navigate) {
  return (dispatch) => {
    dispatch({ type: ActionTypes.DEAUTH_USER });
    const deleteToken = async () => {
      try {
        await AsyncStorage.removeItem('token');
      } catch (error) {
        // Error retrieving data
        console.log(error.message);
      }
    }

    //add navigation back to log in screen
    deleteToken();

    // this.props.navigation.navigate('Friends')
    //somehow get to next page
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

//----------------- MATCHES ------------------//
export function pairMatchToUser(username1, username2) {
  return (dispatch) => {
    axios.put(`${ROOT_URL}/users/pair/${username1}`, { username: username2 })
      .then((response) => {
        dispatch({ type: ActionTypes.FETCH_USER, payload: response.data })
        console.log(response.data);
      }).then(() => {
        dispatch({ type: ActionTypes.ERROR_CLEAR, payload: null });
      }).catch((error) => {
        dispatch({ type: ActionTypes.SET_ERROR, error });
      });
  }
}

export function deletePair(username1, username2) {
  return (dispatch) => {
    axios.delete(`${ROOT_URL}/users/pair/${username1}`, { username: username2 })
      .then((response) => {
        dispatch({ type: ActionTypes.FETCH_USER, payload: response.data })
        console.log(response.data);
      }).then(() => {
        dispatch({ type: ActionTypes.ERROR_CLEAR, payload: null });
      }).catch((error) => {
        dispatch({ type: ActionTypes.SET_ERROR, error });
      });
  }
}


//----------------- EVENTS ------------------//
export function addEvent(fields) {
  console.log('adding event');
  return (dispatch) => {
    //need to give it email, username and password
    axios.post(`${ROOT_URL}/events/add`, fields)
      .then((response) => {
        console.log('success?');
        dispatch({ type: ActionTypes.ADD_EVENT, payload: response.data });
      }).then(() => {
        console.log('success2?');
        dispatch({ type: ActionTypes.ERROR_CLEAR, payload: null });
      }).catch((error) => {
        console.log('fail?');
        dispatch({ type: ActionTypes.SET_ERROR, error });
      });
  };
}
