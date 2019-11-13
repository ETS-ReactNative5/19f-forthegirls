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
  PAIR_MATCH_TO_USER: 'PAIR_MATCH_TO_USER',
  FETCH_USER_MATCHES: 'FETCH_USER_MATCHES',

  //ERRORS
  SET_ERROR: 'SET_ERROR',
  CLEAR_ERROR: 'CLEAR_ERROR',

  //SURVEY 
  ADD_BASICINFO: 'ADD_BASICINFO',
  ADD_CS: 'ADD_CS',
  ADD_DEMO: 'ADD_DEMO',
  ADD_EDU: 'ADD_EDU',
  ADD_PERSONAL: 'ADD_PERSONAL'
};

//----------------- USERS ------------------//

//retrieves the specified user object from the database

export function getUser(id) {
  return (dispatch) => {
    axios.get(`${ROOT_URL}/users/${id}`)
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

export function signinUser({ username, password, navigate }) {
  return (dispatch) => {
    axios.post(`${ROOT_URL}/signin`, { username, password }).then((response) => {
      //  username: response.data.username
      dispatch({ type: ActionTypes.AUTH_USER, payload: { username, id: response.data.id } });

      //NEED TO ADD TOKEN
      //https://facebook.github.io/react-native/docs/asyncstorage
      _storeData = async () => {
        try {
          await AsyncStorage.setItem('token', response.data.token);
          await AsyncStorage.setItem('username', username);
          await AsyncStorage.setItem('id', response.data.id);
        } catch (error) {
          console.log("error");
        }
      };

      _storeData();

      navigate.navigate("Main");

    }).catch((error) => {
      console.log(error);
      // dispatch(authError(`Sign In Failed: ${error.response.data}`));
    });
  };
}


export function signUpUser(fields, navigate, otherAnswers) {
    return (dispatch) => {
      axios.post(`${ROOT_URL}/signup`, fields)
      .then((response) => {
        return axios.put(`${ROOT_URL}/users/survey/${fields.username}`, otherAnswers)
      .then((res) => {
        dispatch({ type: ActionTypes.AUTH_USER, payload: { username: fields.username, id: response.data.id } });

        //should add token in here
        _storeData = async () => {
          try {
            await AsyncStorage.setItem('token', response.data.token);
            await AsyncStorage.setItem('username', fields.username);
            await AsyncStorage.setItem('id', response.data.id);
          } catch (error) {
            console.log("token error setting async");
          }
        };
    
        _storeData();
    
        //somehow get to next page
        navigate.navigate("CsInfo");
      })
      .catch((error) => {
        console.log(error);
        // dispatch(authError(`Sign In Failed: ${error.response.data}`));
      });
    });
  }
}

export function addToSurvey(otherAnswers, username, navigate, navTo) {
  return (dispatch) => {
    axios.put(`${ROOT_URL}/users/survey/${username}`, otherAnswers).then((res) => {
        navigate.navigate(navTo);
  }).catch((error) => {
    console.log(error);
    // dispatch(authError(`Sign In Failed: ${error.response.data}`));
  });
  }
}


// /users/survey/username put

// deletes token from localstorage
// and deauths
export function signoutUser(navigate) {
  return (dispatch) => {
    dispatch({ type: ActionTypes.DEAUTH_USER });
    const deleteToken = async () => {
      try {
        await AsyncStorage.removeItem('token');
        await AsyncStorage.removeItem('id');
        await AsyncStorage.removeItem('username');
      } catch (error) {
        // Error retrieving data
        console.log(error.message);
      }
    }

    //add navigation back to log in screen
    deleteToken();

    navigate.navigate('StartScreen')
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
        dispatch({ type: ActionTypes.SET_ERROR, error });
      });
  }
}

export function getMatch(id) {
  console.log("in get match");
  axios.get(`${ROOT_URL}/users/${id}`)
    .then((response) => {
      return response.data;
    }).catch((error) => {
      console.log(error);
    });
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


//----------------- SURVEY ------------------//
export function addBasicInfo(id, fields) {
  console.log('adding basic info from survey');
  return (dispatch) => {
    axios.post(`${ROOT_URL}/survey/basicInfo/${id}`, fields)
      .then((response) => {
        console.log('success?');
        dispatch({ type: ActionTypes.ADD_BASICINFO, payload: response.data });
      }).then(() => {
        console.log('success2?');
        dispatch({ type: ActionTypes.ERROR_CLEAR, payload: null });
      }).catch((error) => {
        console.log('fail?');
        dispatch({ type: ActionTypes.SET_ERROR, error });
      });
  };
}


export function addCS(id, fields) {
  console.log('adding cs info from survey');
  return (dispatch) => {
    axios.post(`${ROOT_URL}/survey/cs/${id}`, fields)
      .then((response) => {
        console.log('success?');
        dispatch({ type: ActionTypes.ADD_CS, payload: response.data });
      }).then(() => {
        console.log('success2?');
        dispatch({ type: ActionTypes.ERROR_CLEAR, payload: null });
      }).catch((error) => {
        console.log('fail?');
        dispatch({ type: ActionTypes.SET_ERROR, error });
      });
  };
}

export function addDemo(id, fields) {
  console.log('adding demo info from survey');
  return (dispatch) => {
    axios.post(`${ROOT_URL}/survey/demo/${id}`, fields)
      .then((response) => {
        console.log('success?');
        dispatch({ type: ActionTypes.ADD_DEMO, payload: response.data });
      }).then(() => {
        console.log('success2?');
        dispatch({ type: ActionTypes.ERROR_CLEAR, payload: null });
      }).catch((error) => {
        console.log('fail?');
        dispatch({ type: ActionTypes.SET_ERROR, error });
      });
  };
}

export function addEdu(id, fields) {
  console.log('adding education info from survey');
  return (dispatch) => {
    axios.post(`${ROOT_URL}/survey/edu/${id}`, fields)
      .then((response) => {
        console.log('success?');
        dispatch({ type: ActionTypes.ADD_EDU, payload: response.data });
      }).then(() => {
        console.log('success2?');
        dispatch({ type: ActionTypes.ERROR_CLEAR, payload: null });
      }).catch((error) => {
        console.log('fail?');
        dispatch({ type: ActionTypes.SET_ERROR, error });
      });
  };
}

export function addPersonal(id, fields) {
  console.log('adding personality info from survey');
  return (dispatch) => {
    axios.post(`${ROOT_URL}/survey/personal/${id}`, fields)
      .then((response) => {
        console.log('success?');
        dispatch({ type: ActionTypes.ADD_PERSONAL, payload: response.data });
      }).then(() => {
        console.log('success2?');
        dispatch({ type: ActionTypes.ERROR_CLEAR, payload: null });
      }).catch((error) => {
        console.log('fail?');
        dispatch({ type: ActionTypes.SET_ERROR, error });
      });
  };
}