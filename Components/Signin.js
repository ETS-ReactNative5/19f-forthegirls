import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import MainScreen from './MainScreen.js'


class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = { goToMatches: false }
  }

  render() {
    if (this.state.goToMatches) {
      return (
        <MainScreen />
      )
    }
    return (
      <View>
        <Text>I am a signIn </Text>
        <Text> Do Sign in stuff </Text>
        <Button title="log in" onPress={() => { this.setState({ goToMatches: true }) }} />
      </View>
    );
  }
}

export default SignIn;
