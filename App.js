import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import Axios from 'axios';
import StartScreen from './Components/StartScreen'
import LogoBar from './Components/LogoBar';
import Main from './navigation/Main';
import { Provider } from 'react-redux';
import * as Font from 'expo-font';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers';
import { AsyncStorage } from 'react-native';
import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions'

const PUSH_REGISTRATION_ENDPOINT = 'http://e6a6945d.ngrok.io/token';



const store = createStore(reducers, {}, compose(
  window.devToolsExtension ? window.devToolsExtension() : f => f,
  applyMiddleware(thunk),
));
//https://levelup.gitconnected.com/react-native-adding-push-notifications-to-your-app-with-expo-8e4b659ddbfb
//https://facebook.github.io/react-native/docs/asyncstorage

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fontLoaded: false,
      signedIn: false,

      username: '',

      notification: null,
      messageText: ''
    }
  }

  _retrieveData = async () => {
    try {
      const value =
      {
        token: await AsyncStorage.getItem('token'),
        username: await AsyncStorage.getItem('username'),
        id: await AsyncStorage.getItem('id'),
      }
      if (value.token !== null) {
      //  this.setState({ signedIn: true });
        store.dispatch({ type: 'AUTH_USER', payload: { username: value.username, id: value.id } });
        this.setState({signedIn: true, username: value.username});
      }
    } catch (error) {
      console.log("error getting token");
    }
  }

  handleNotification = (notification) => {
    this.setState({ notification });
  }

  registerForPushNotificationsAsync = async () => {
    const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    if (status !== 'granted') {
      return;
    }
    try {
      let pushToken = await Notifications.getExpoPushTokenAsync();
      if(pushToken) {
        await AsyncStorage.setItem('pushToken', pushToken);
        console.log(pushToken);
        console.log( await AsyncStorage.getItem('pushToken'));
        // store.dispatch({ type: 'AUTH_TOKEN', payload: pushToken });

              //once you have push token need to save it to your backend
              // need to add ^ action which then sends token to api
              // just make api call here or in actions
      }

      //once you have push token need to save it to your backend

      // try {
      //   return fetch(PUSH_REGISTRATION_ENDPOINT, {
      //   method: 'POST',
      //   headers: {
      //     'Accept': 'application/json',
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({
      //     token: {
      //       value: token,
      //     },
      //     user: {
      //       username: this.state.username,
      //     },
      //   }),
      // });
      // }
      // catch (error) {
      //   console.log("in here");
      //   console.log(error);
      // }
    }
    catch (error) {
      console.log("in here");
      console.log(error);
    }

    this.notificationSubscription = Notifications.addListener(this.handleNotification);
  }


  async componentDidMount() {
    this._retrieveData();
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
    this.registerForPushNotificationsAsync();

  }

  render() {
    if (this.state.fontLoaded) {
      return (
        <Provider store={store}>
          <LogoBar />
          <Main signedIn={this.state.signedIn}/>
        </Provider>
      );
    } else {
      return (<Text>loading</Text>);
    }

  }
}

export default App;
