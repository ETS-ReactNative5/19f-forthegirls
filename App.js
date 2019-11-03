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

const store = createStore(reducers, {}, compose(
  applyMiddleware(thunk),
));


// const store = createStore(reducer, applyMiddleware(axiosMiddleware(client)));

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      apiResponse: 'no api response yet',
      inputText: 'no text yet'
    }
  }

  async componentDidMount() {
    const ROOT_URL = 'https://for-the-girls.herokuapp.com/';
    Axios.get(`${ROOT_URL}`).then((response) => {
      this.setState({ apiResponse: response.data });
      console.log(response.data);
    }).catch((error) => {
      console.log(error);
    })
    await Font.loadAsync({
      'montserrat-medium': require('./assets/fonts/Montserrat-Medium.ttf'),
      'lato-bold': require('./assets/fonts/Lato-Bold.ttf'),
      'lato-italic': require('./assets/fonts/Lato-Italic.ttf'),
      'lato-regular': require('./assets/fonts/Lato-Regular.ttf')
    });
  }

  handleInput = (text) => {
    this.setState({ inputText: text });
  }

  submitInput = () => {
    const fields = {
      username: this.state.inputText,
    };

    const ROOT_URL = 'https://for-the-girls.herokuapp.com/';
    Axios.post(`${ROOT_URL}/api/signup`, fields).then((response) => {
      console.log("sent to backend");
    }).catch((error) => {
      console.log(error);
    })
  }

  // submitInput = () => {
  //   const ROOT_URL = 'http://localhost:9090/';
  //   Axios.get(`${ROOT_URL}`).then((response) => {
  //     this.setState({apiResponse: response.data.result});
  //     // const data = response.data.result;
  //   }).catch((error) => {
  //     console.log(error);
  //   })
  // }

  // https://www.tutorialspoint.com/react_native/react_native_text_input.htm
  // Help with basic text input, assume we'll make more sophisticated later
  render() {
    return (

      <Provider store={store}>
          <Main />
      </Provider>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;
