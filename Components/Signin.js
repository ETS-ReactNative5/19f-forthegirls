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
    this.props.signinUser({email: this.state.email, password: this.state.password, navigate: this.props.navigation});
  }

  emailInput = (text) => {
    this.setState({ email: text });
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
      <View style={{height: '100%', marginTop: 50}}>
        <TextInput defaultValue="Enter Your Email" onChangeText={this.emailInput} autoCapitalize='none' clearButtonMode='while-editing'/>
        <TextInput defaultValue="Enter Your Password" onChangeText={this.passwordInput} autoCapitalize='none' clearButtonMode='while-editing'/>
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
