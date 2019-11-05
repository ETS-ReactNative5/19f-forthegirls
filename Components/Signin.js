import React from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import MainScreen from './MainScreen.js'
import { signinUser } from '../actions';
import { connect } from 'react-redux';


class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      goToMatches: false,
      email: '',
      password: '',
    }
  }

  checkSignIn = () => {
    this.props.signinUser({email: this.state.email, password: this.state.password});
  }

  emailInput = (e) => {
    e.preventDefault();
    this.setState({ email: e.target.value });
  }

  passwordInput = (e) => {
    e.preventDefault();
    this.setState({ password: e.target.value });
  }

  render() {
    if (this.state.goToMatches) {
      return (
        <MainScreen />
      )
    }
    return (
      <View style={{height: '100%', marginTop: 50}}>
        <TextInput defaultValue="Enter Your Email" onChangeText={this.emailInput}/>
        <TextInput defaultValue="Enter Your Password" onChangeText={this.passwordInput}/>
        <Button title="Log In" onPress={this.checkSignIn} />
      </View>
    );
  }
}

export default connect({}, { signinUser })(SignIn);
