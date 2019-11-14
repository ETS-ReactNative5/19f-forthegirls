import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import Axios from 'axios';
import StartScreen from './components/StartScreen'
import LogoBar from './components/LogoBar';
import Main from './navigation/Main';
import { Provider } from 'react-redux';
import * as Font from 'expo-font';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers';
import { AsyncStorage } from 'react-native';


const store = createStore(reducers, {}, compose(
  window.devToolsExtension ? window.devToolsExtension() : f => f,
  applyMiddleware(thunk),
));

//https://facebook.github.io/react-native/docs/asyncstorage



class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fontLoaded: false,
      signedIn: false,
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
      }
    } catch (error) {
      console.log("error getting token");
    }
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
