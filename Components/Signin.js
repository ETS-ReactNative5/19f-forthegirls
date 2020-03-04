import React from 'react';
import { StyleSheet, Text, View, Button, TextInput, TouchableOpacity, Image } from 'react-native';
import { singleChat } from '../assets/styles/chatStyle';
import { signinUser, resetErrors } from '../actions';
import { connect } from 'react-redux';
import surveyStyle from '../assets/styles/surveyStyle'
import TextField from 'react-native-text-field';
import colors, { fonts, fontEffects, buttons } from '../assets/styles/basicStyle';
import ErrorModal from './ErrorModal';

class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',

      showModal: false,
      modalMessage: '',
      loading: false,

      pressedSubmit: false,
    }
  }

  componentWillUnmount() {
    this.props.resetErrors();
    // console.log("in here");
  }

  checkSignIn = () => {
    if (this.state.username === '' || this.state.password === '') {
      this.setState({ showModal: true, modalMessage: 'Please fill out the entire form.' });
    }
    else {
      this.setState({ loading: true, pressedSubmit: true });
      this.props.signinUser({ username: this.state.username, password: this.state.password, navigate: this.props.navigation });
    }

  }

  usernameInput = (text) => {
    this.setState({ username: text });
  }

  passwordInput = (text) => {
    this.setState({ password: text });
  }

  renderModal = () => {
    if (this.state.showModal) {
      return (
        <ErrorModal errorMessage={this.state.modalMessage} reset={this.resetModal} />
      );
    }
  }

  renderLoading = () => {
    if (this.state.loading === true && !this.state.showModal && (this.props.error === null || this.props.error === 'Request failed with status code 503' || this.props.error === "null is not an object (evaluating 'action.payload.result.username')")) {
      return (
        <Text style={[fonts.bodyText, colors.turquoise, fontEffects.center]}>Signing You In!</Text>
      )
    }
  }

  renderError = () => {
    if (this.props.error !== null && this.state.pressedSubmit && this.props.error !== 'Request failed with status code 503' && this.props.error !== "null is not an object (evaluating 'action.payload.result.username')") {
      return (
        <Text style={[fonts.bodyText, colors.red, fontEffects.center]}>{this.props.error}</Text>
      )
    }
  }

  resetModal = () => {
    this.setState({ showModal: false, modalMessage: "" });
  }

  goBack = () => {
    this.props.resetErrors();
    this.props.navigation.pop();
  }

  render() {
    // console.log("in render");
    // console.log(this.props.error);
    var textFieldStyle = [surveyStyle.signInUpTextField, fonts.bodyText, surveyStyle.endField]
    return (
      <View style={surveyStyle.surveyBackground}>
        <View style={[singleChat.arrowBack]}>
          <TouchableOpacity
            onPress={this.goBack}>
            <Image
              source={require('./../assets/icons/arrowback.png')}
            />
          </TouchableOpacity>
        </View>
        <Text style={[colors.black, fonts.majorHeading, fontEffects.center]}>Welcome Back!</Text>
        {this.renderModal()}
        {this.renderError()}
        {this.renderLoading()}
        <TextInput
          style={textFieldStyle}
          placeholder="Username"
          onChangeText={this.usernameInput}
          autoCapitalize='none'
          clearButtonMode='while-editing'
        />
        <TextInput
          style={textFieldStyle}
          placeholder="Password"
          onChangeText={this.passwordInput}
          secureTextEntry={true}
          autoCapitalize='none'
          clearButtonMode='while-editing'
        />
        <View style={{ justifyContent: 'flex-end' }}>
          <View style={[buttons.logInOutButton, buttons.logInButton]}>
            <TouchableOpacity
              onPress={this.checkSignIn}>
              <Text style={[fonts.minorHeading, colors.white, fontEffects.center]}>Log In</Text>
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

export default connect(mapStateToProps, { signinUser, resetErrors })(SignIn);
