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
      username: '',
      password: '',
    }
  }

  checkSignIn = () => {
    this.props.signinUser({username: this.state.username, password: this.state.password, navigate: this.props.navigation});
  }

  usernameInput = (text) => {
    this.setState({ username: text });
  }

  passwordInput = (text) => {
    this.setState({ password: text });
  }

  render() {
    if (this.state.goToMatches) {
      return (
        <MainScreen />
      )
    }
    return (
      <View style={{ height: '100%', marginTop: 50 }}>
        <TextInput defaultValue="Enter Your Username" onChangeText={this.usernameInput} autoCapitalize='none' clearButtonMode='while-editing' />
        <TextInput defaultValue="Enter Your Password" onChangeText={this.passwordInput} autoCapitalize='none' clearButtonMode='while-editing' />
        <Button title="Log In" onPress={this.checkSignIn} />
      </View>
    );
  }
}

function mapStateToProps(reduxState) {
  return {
    error: reduxState.error,
  };
}

export default connect(mapStateToProps, { signinUser })(SignIn);
