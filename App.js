import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import Axios from 'axios';
import StartScreen from './components/StartScreen'
import MainTabBar from './containers/bottomNav';
import * as Font from 'expo-font';
import axiosMiddleware from 'redux-axios-middleware';

const store = createStore(reducer, applyMiddleware(axiosMiddleware(client)));


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
      'montserrat-semibold': require('./assets/fonts/Montserrat-SemiBold.ttf'),
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
      <View style={styles.container, {height: '100%', marginTop: 50}}>
        <Text>This is the response: {this.state.apiResponse}</Text>
        <TextInput style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
          placeholder="Waiting for input..."
          placeholderTextColor="#9a73ef"
          autoCapitalize="none"
          onChangeText={this.handleInput} />
        <Text>The input: {this.state.inputText}</Text>
        <Button
          title="Submit input"
          accessibilityLabel="Submit input"
          color="#f194ff"
          onPress={this.submitInput}
        />
        {/* <MainTabBar /> */}


        <StartScreen />
      </View>
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

