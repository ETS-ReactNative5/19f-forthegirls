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

  //MATCHES
  PAIR_MATCH_TO_USER: 'PAIR_MATCH_TO_USER',
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

export function signinUser({ email, password }) {
  return (dispatch) => {
    axios.post(`${ROOT_URL}/signin`, { email, password }).then((response) => {
      dispatch({ type: ActionTypes.AUTH_USER, payload: { email, username: response.data.username } });
      console.log(response);

      // const saveToken = async token => {
      //   try {
      //     await AsyncStorage.setItem('token', response.data.token);
      //   } catch (error) {
      //     // Error retrieving data
      //     console.log(error.message);
      //   }
      // };

      // saveToken();

      // const saveEmail = async email => {
      //   try {
      //     await AsyncStorage.setItem('email', response.data.email);
      //   } catch (error) {
      //     // Error retrieving data
      //     console.log(error.message);
      //   }
      // };

      // saveEmail();

      // const saveUsername = async username => {
      //   try {
      //     await AsyncStorage.setItem('username', response.data.username);
      //   } catch (error) {
      //     // Error retrieving data
      //     console.log(error.message);
      //   }
      // };

      // saveUsername();

      //somehow go to next page
      // this.props.navigation.navigate('Friends')
    }).catch((error) => {
      console.log('hi');
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
      const saveToken = async token => {
        try {
          await AsyncStorage.setItem('token', response.data.token);
        } catch (error) {
          // Error retrieving data
          console.log(error.message);
        }
      };

      saveToken();

      const saveEmail = async email => {
        try {
          await AsyncStorage.setItem('email', response.data.email);
        } catch (error) {
          // Error retrieving data
          console.log(error.message);
        }
      };

      saveEmail();

      const saveUsername = async username => {
        try {
          await AsyncStorage.setItem('username', response.data.username);
        } catch (error) {
          // Error retrieving data
          console.log(error.message);
        }
      };

      saveUsername();

      //somehow get to next page
      this.props.navigation.navigate('Friends')

    }).catch((error) => {
      dispatch(authError(`Sign In Failed: ${error.response.data}`));
    });
  };
}


// deletes token from localstorage
// and deauths
export function signoutUser(history) {
  return (dispatch) => {

    const deleteToken = async () => {
      try {
        await AsyncStorage.removeItem('token');
      } catch (error) {
        // Error retrieving data
        console.log(error.message);
      }
    }

    deleteToken();

    const deleteUsername = async () => {
      try {
        await AsyncStorage.removeItem('username');
      } catch (error) {
        // Error retrieving data
        console.log(error.message);
      }
    }

    deleteUsername();

    const deleteEmail = async () => {
      try {
        await AsyncStorage.removeItem('email');
      } catch (error) {
        // Error retrieving data
        console.log(error.message);
      }
    }

    deleteEmail();

    dispatch({ type: ActionTypes.DEAUTH_USER });

    this.props.navigation.navigate('Friends')
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

