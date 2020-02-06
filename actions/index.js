import axios from 'axios';
import { AsyncStorage } from 'react-native';

export const ROOT_URL = 'https://for-the-girls.herokuapp.com/api';
export const ActionTypes = {
  // USERS
  // CREATE_USER: 'CREATE_USER',
  FETCH_USER: 'FETCH_USER',
  // UPDATE_USER: 'UPDATE_USER',
  DELETE_USER: 'DELETE_USER',
  USER_GET_POT_MATCHES: 'USER_GET_POT_MATCHES',
  GET_MATCHES: 'GET_MATCHES',

  //AUTH
  AUTH_USER: 'AUTH_USER',
  DEAUTH_USER: 'DEAUTH_USER',
  AUTH_ERROR: 'AUTH_ERROR',

  //EVENTS
  ADD_EVENT: 'ADD_EVENT',
  RSVP_EVENT: 'RSVP_EVENT',
  UNRSVP_EVENT: 'UNRSVP_EVENT',
  FETCH_EVENT: 'FETCH_EVENT',
  FETCH_EVENTS: 'FETCH_EVENTS',
  FETCH_YOUR_EVENTS: 'FETCH_YOUR_EVENTS',
  FETCH_RSVP_CONNECTIONS: 'FETCH_RSVP_CONNECTIONS',

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
  ADD_PERSONAL: 'ADD_PERSONAL',

  //AWARDS
  FETCH_YOUR_AWARDS: 'FETCH_YOUR_AWARDS',
  FETCH_AWARD: 'FETCH_AWARD',

};

//----------------- USERS ------------------//

//retrieves the specified user object from the database

export function getUser(id) {
  return (dispatch) => {
    axios.get(`${ROOT_URL}/users/${id}`)
      .then((response) => {
        dispatch({ type: ActionTypes.FETCH_USER, payload: response.data });
      }).then(() => {
        dispatch({ type: ActionTypes.CLEAR_ERROR, payload: null });
      }).catch((error) => {
        dispatch({ type: ActionTypes.SET_ERROR, error });
      });
  };
}

//edits the user object
//axios.post(`${ROOT_URL}/posts`, post, { headers: { authorization: localStorage.getItem('token') } })
export function editUser(fields) {
  //profileURL
  return (dispatch) => {
    //need to give it email, username and password
    axios.put(`${ROOT_URL}/users/${fields.username}`, fields)
      .then((response) => {
        dispatch({ type: ActionTypes.FETCH_USER, payload: response.data });
      }).then(() => {
        dispatch({ type: ActionTypes.CLEAR_ERROR, payload: null });
      }).catch((error) => {
        dispatch({ type: ActionTypes.SET_ERROR, error });
      });
  };
}

//---------------------------- AUTH --------------------------------//

export function signinUser({ username, password, navigate }) {
  return (dispatch) => {
    axios.post(`${ROOT_URL}/signin`, { username, password }).then((response) => {
      dispatch({ type: ActionTypes.AUTH_USER, payload: { username, id: response.data.id } });

      //How to add tokens using react native
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
      dispatch(authError(`Invalid username or password`));
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

            navigate.navigate("Main");
          })
          .catch((error) => {
            console.log(error);
          });
      }).catch((error) => {
        console.log(error);
        dispatch(authError(`Sign Up Failed: User Exists with this Information`));
      });
  }
}

export function addToSurvey(otherAnswers, username, navigate, navTo) {
  return (dispatch) => {
    axios.put(`${ROOT_URL}/users/survey/${username}`, otherAnswers).then((res) => {
      navigate.navigate(navTo);
    }).catch((error) => {
      console.log(error);
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
  };
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
export function pairMatchToUser(user1, user2, prompt, navigation, matchID) {
  return (dispatch) => {
    axios.post(`${ROOT_URL}/matches/pair`, { user1, user2 })
      .then((response) => {
        return axios.get(`${ROOT_URL}/matches/${user1}`)
          .then((res) => {
            dispatch({ type: ActionTypes.GET_MATCHES, payload: res.data });
            navigation.navigate('SingleChat', { matchID: matchID, prompt: prompt, username: user2 })
          }).catch((error) => {
            console.log(error);
            dispatch({ type: ActionTypes.SET_ERROR, error });
          });
      }).catch((error) => {
        console.log(error);
      })
  }
}

export function getPotentialMatches(username) {
  //matches/potential/:username
  return (dispatch) => {
    axios.get(`${ROOT_URL}/matches/potential/${username}`)
      .then((response) => {
        dispatch({ type: ActionTypes.USER_GET_POT_MATCHES, payload: response.data });
      }).catch((error) => {
        console.log(error);
        dispatch({ type: ActionTypes.SET_ERROR, error });
      });
  }
}

export function getMatches(username) {
  return (dispatch) => {
    axios.get(`${ROOT_URL}/matches/${username}`)
      .then((response) => {
        dispatch({ type: ActionTypes.GET_MATCHES, payload: response.data });
      }).catch((error) => {
        console.log(error);
        dispatch({ type: ActionTypes.SET_ERROR, error });
      });
  }
}

export function deleteMatch(userID, matchID, username) {
  return (dispatch) => {
    axios.get(`${ROOT_URL}/matches/getid/${userID}/${matchID}`)
      .then((response) => {
        const matchID = response.data;
        return axios.delete(`${ROOT_URL}/matches/delete/${matchID}`)
          .then((res) => {
            return axios.get(`${ROOT_URL}/matches/${username}`)
              .then((resp) => {
                dispatch({ type: ActionTypes.GET_MATCHES, payload: resp.data });
              }).catch((error) => {
                console.log(error);
                dispatch({ type: ActionTypes.SET_ERROR, error });
              });
          }).catch((error) => {
            dispatch({ type: ActionTypes.SET_ERROR, error });
          });
      }).catch((error) => {
        dispatch({ type: ActionTypes.SET_ERROR, error });
      });
  }
}

//----------------- EVENTS ------------------//
export function addEvent(fields) {
  console.log("In add events axious");
  console.log(fields);
  return (dispatch) => {
    axios.post(`${ROOT_URL}/events/add`, fields)
      .then((response) => {
        return axios.get(`${ROOT_URL}/events`).then((response) => {
          dispatch({ type: ActionTypes.FETCH_EVENTS, payload: response.data });
        }).catch((error) => {
          console.log(error);
        });
      }).then(() => {
        dispatch({ type: ActionTypes.CLEAR_ERROR, payload: null });
      }).catch((error) => {
        console.log(error);
        dispatch({ type: ActionTypes.SET_ERROR, error });
      });
  };
}

export function fetchEvents() {
  return (dispatch) => {
    axios.get(`${ROOT_URL}/events`).then((response) => {
      dispatch({
        type: ActionTypes.FETCH_EVENTS,
        payload: response.data,
      });
    }).catch((error) => {
      console.log(error);
    });
  };
}

export function fetchYourEvents(id) {
  return (dispatch) => {
    axios.get(`${ROOT_URL}/events/rsvp/your/${id}`).then((response) => {
      dispatch({
        type: ActionTypes.FETCH_YOUR_EVENTS,
        payload: response.data,
      });
    }).catch((error) => {
      console.log(error);
    });
  };
}

export function fetchYourAwards(id) {
  return (dispatch) => {
    axios.get(`${ROOT_URL}/awards/checkAllAwards/${id}`).then((response) => {
      dispatch({
        type: ActionTypes.FETCH_YOUR_AWARDS,
        payload: response.data,
      });
    }).catch((error) => {
      console.log(error);
    });
  };
}

export function fetchAwardStatus(id, awardTitle) {
  return (dispatch) => {
    axios.get(`${ROOT_URL}/awards/checkAward/${id}/${awardTitle}`).then((response) => {
      dispatch({
        type: ActionTypes.FETCH_AWARD,
        payload: response.data,
      });
    }).catch((error) => {
      console.log(error);
    });
  };
}

export function fetchEvent(id) {
  return (dispatch) => {
    axios.get(`${ROOT_URL}/events/${id}`).then((response) => {
      dispatch({
        type: ActionTypes.FETCH_EVENT,
        payload: response.data,
      });
    }).catch((error) => {
    });
  };
}

export function fetchRsvpConnections(userId, eventId) {
  return (dispatch) => {
    axios.get(`${ROOT_URL}/events/rsvp/connections/${userId}/${eventId}`).then((response) => {
      dispatch({
        type: ActionTypes.FETCH_RSVP_CONNECTIONS, payload: response.data,
      });
    }).catch((error) => {
    });
  };
}

export function rsvpEvent(userID, eventID) {
  return (dispatch) => {
    axios.post(`${ROOT_URL}/events/rsvp/${eventID}`, { userID: userID })
      .then((response) => {
        return axios.get(`${ROOT_URL}/events/rsvp/your/${userID}`).then((response) => {
          dispatch({ type: ActionTypes.FETCH_YOUR_EVENTS, payload: response.data });
        }).catch((error) => {
          console.log(error);
        });
      }).then(() => {
        dispatch({ type: ActionTypes.CLEAR_ERROR, payload: null });
      }).catch((error) => {
        console.log(error);
        dispatch({ type: ActionTypes.SET_ERROR, error });
      });
  };
}

export function unrsvpEvent(userID, eventID) {
  return (dispatch) => {
    axios.post(`${ROOT_URL}/events/unrsvp/${eventID}`, { userID: userID })
      .then((response) => {
        return axios.get(`${ROOT_URL}/events/rsvp/your/${userID}`).then((response) => {
          dispatch({ type: ActionTypes.FETCH_YOUR_EVENTS, payload: response.data });
        }).catch((error) => {
          console.log(error);
        });
      }).then(() => {
        dispatch({ type: ActionTypes.CLEAR_ERROR, payload: null });
      }).catch((error) => {
        console.log(error);
        dispatch({ type: ActionTypes.SET_ERROR, error });
      });
  };
}

///------------------ERRORS----------------------------------

export function resetErrors() {
  return (
    {
      type: ActionTypes.ERROR_CLEAR, payload: null,
    }
  );
}
