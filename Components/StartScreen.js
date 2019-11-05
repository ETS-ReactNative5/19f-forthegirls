import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import SignIn from './Signin.js'
import SignUp from './Signup.js'



class StartScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = { signup: false, signin: false }
  }


  render() {
    if (this.state.signup) {
      return (
        <SignUp />
      )
    }
    else if (this.state.signin) {
      return (
        <SignIn />
      )
    }
    else {
      return (  
        <View style={{ height: '100%', marginTop: 50 }}>
          <Text>I am a startScreen </Text>
          <Button title="signup" onPress={() => {   this.props.navigation.navigate('SignUp', {}) }} />
          <Button title="signin" onPress={() => {  this.props.navigation.navigate('SignIn', {}) }} />
        </View>
      );
    }
  }
}

export default StartScreen;
