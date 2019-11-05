import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import Axios from 'axios';
import StartScreen from './components/StartScreen'
import MainTabBar from './containers/bottomNav';
import Main from './navigation/Main';
import { Provider } from 'react-redux';
import * as Font from 'expo-font';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers';
import {AsyncStorage} from 'react-native';

const store = createStore(reducers, {}, compose(
  window.devToolsExtension ? window.devToolsExtension() : f => f,
  applyMiddleware(thunk),
));

// https://medium.com/building-with-react-native/what-is-asyncstorage-in-react-native-and-how-you-to-use-it-with-app-state-manager-1x09-b8c636ce5f6e
const getToken = async () => {
  let token = '';
  try {
    token = await AsyncStorage.getItem('token') || 'none';
  } catch (error) {
    // Error retrieving data
    console.log(error.message);
  }
  return token;
}

const getUsername = async () => {
  let username = '';
  try {
    username = await AsyncStorage.getItem('username') || 'none';
  } catch (error) {
    // Error retrieving data
    console.log(error.message);
  }
  return username;
}

const getUserEmail = async () => {
  let email = '';
  try {
    email = await AsyncStorage.getItem('email') || 'none';
  } catch (error) {
    // Error retrieving data
    console.log(error.message);
  }
  return email;
}

if (getToken()) {
  store.dispatch({ type: 'AUTH_USER', payload: { email: getUserEmail(), username: getUsername() } });
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fontLoaded: false
    }
  }

  async componentDidMount() {
    try {
      await Font.loadAsync({
        'montserrat-medium': require('./assets/fonts/Montserrat-Medium.ttf'),
        'montserrat-semibold': require('./assets/fonts/Montserrat-SemiBold.ttf'),
        'lato-bold': require('./assets/fonts/Lato-Bold.ttf'),
        'lato-italic': require('./assets/fonts/Lato-Italic.ttf'),
        'lato-regular': require('./assets/fonts/Lato-Regular.ttf')
      });
      this.setState({
        fontLoaded: true,
      });
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    if (this.state.fontLoaded) {
      return (
        <Provider store={store}>
          <Main />
        </Provider>
      );
    } else {
      return (<Text>loading</Text>);
    }

  }
}

export default App;
