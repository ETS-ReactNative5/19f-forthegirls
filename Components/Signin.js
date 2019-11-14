import React from 'react';
import { StyleSheet, Text, View, Button, TextInput, TouchableOpacity } from 'react-native';
import { signinUser } from '../actions';
import { connect } from 'react-redux';
import surveyStyle from '../assets/styles/surveyStyle'
import TextField from 'react-native-text-field';
import colors, { fonts, fontEffects, buttons } from '../assets/styles/basicStyle';

class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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
    return (
      <View style={surveyStyle.surveyBackground}>
        <Text style={[colors.black, fonts.majorHeading, fontEffects.center]}>Welcome Back!</Text>
        <TextField textFieldStyle={surveyStyle.textField} placeholder="Username" onInputChange={this.usernameInput} autoCapitalize='none' clearButtonMode='while-editing' />
        <TextField textFieldStyle={surveyStyle.textField} placeholder="Password" onInputChange={this.passwordInput} isSecured={true} autoCapitalize='none' clearButtonMode='while-editing' />
        <View style={{ justifyContent: 'flex-end' }}>
          <View style={buttons.logInButton}>
            <TouchableOpacity
              onPress={this.checkSignIn}>
              <Text style={[fonts.majorHeading, colors.white, fontEffects.center]}>Log In</Text>
            </TouchableOpacity>
          </View>
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
