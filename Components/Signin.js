import React from 'react';
import { StyleSheet, Text, View, Button, TextInput, TouchableOpacity } from 'react-native';
import MainScreen from './MainScreen.js'
import { signinUser } from '../actions';
import { connect } from 'react-redux';
import surveyStyle from '../assets/styles/surveyStyle'
import TextField from 'react-native-text-field';
import colors, { fonts } from '../assets/styles/basicStyle';

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
    this.props.signinUser({ username: this.state.username, password: this.state.password, navigate: this.props.navigation });
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
      <View style={surveyStyle.surveyBackground}>
        <TextField textFieldStyle={surveyStyle.textField} placeholder="Username" onInputChange={this.usernameInput} autoCapitalize='none' clearButtonMode='while-editing' />
        <TextField textFieldStyle={surveyStyle.textField} placeholder="Password" onInputChange={this.passwordInput} isSecured={true} autoCapitalize='none' clearButtonMode='while-editing' />
        <View style={surveyStyle.submitButton}>
          <TouchableOpacity
            onPress={this.checkSignIn}>
            <Text style={[fonts.majorHeading, colors.white]}>Log In</Text>
          </TouchableOpacity>
        </View>
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
