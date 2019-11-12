import React from 'react';
import { Image, Text, View, Button, Alert, TouchableOpacity } from 'react-native';
import TextField from 'react-native-text-field';
import colors, { fonts, buttons } from '../../assets/styles/basicStyle';
import surveyStyle from '../../assets/styles/surveyStyle';

class BasicSignUpComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      username: '',
      password: '',
    }
  }

  firstNameInput = (text) => {
    this.setState({ firstName: text });
  }

  lastNameInput = (text) => {
    this.setState({ lastName: text });
  }

  emailInput = (text) => {
    this.setState({ email: text });
  }

  usernameInput = (text) => {
    this.setState({ username: text });
  }

  passwordInput = (text) => {
    this.setState({ password: text });
  }

  checkState = () => {
    console.log(this.state);
  }

  submitPage = () => {
    // if (this.state.firstName === '' || this.state.lastName === '' || this.state.email === '' || this.state.username === '' || this.state.password === '') {
    //   //https://facebook.github.io/react-native/docs/alert
    //   Alert.alert(
    //     'Please Fill Out All Fields to Continue',
    //     '',
    //     [
    //       { text: 'Cancel', style: 'cancel' },
    //       { text: 'OK' },
    //     ],
    //     { cancelable: true }
    //   );
    // }
    // else {
    var basicInfo = {
      'firstname': this.state.firstName,
      'lastname': this.state.lastName,
      'email': this.state.email,
      'username': this.state.username,
      'password': this.state.password,
    }
    this.props.navigation.navigate('Header', { pastPage: "basicInfo", basicInfo: basicInfo });
    //  }

  }

  //need to check unique from here
  render() {
    var placeholderStyle = [fonts.bodyText, colors.lightGrey]
    var textInputStyle = [colors.black, fonts.bodyText]
    var textFieldStyle = surveyStyle.textField
    return (
      <View style={{ paddingLeft: 5, height: '100%', display: 'flex', backgroundColor: colors.veryLightPurple.color }}>
        <Text style={fonts.majorHeading}>Your Basic Info</Text>
        <TextField
          textFieldStyle={textFieldStyle}
          placeholderStyle={{ placeholderStyle }}
          textInputStyle={{ textInputStyle }}
          invalidTextFieldStyle={{ borderColor: colors.red.color }}
          placeholder="First Name"
          onInputChange={this.firstNameInput}
          clearButtonMode='while-editing'
          keyboardType='default'
        />
        <TextField
          textFieldStyle={textFieldStyle}
          placeholderStyle={{ placeholderStyle }}
          textInputStyle={{ textInputStyle }}
          invalidTextFieldStyle={{ borderColor: colors.red.color }}
          placeholder="Last Name"
          onInputChange={this.lastNameInput}
          clearButtonMode='while-editing'
        />
        <TextField
          textFieldStyle={textFieldStyle}
          placeholderStyle={{ placeholderStyle }}
          textInputStyle={{ textInputStyle }}
          invalidTextFieldStyle={{ borderColor: colors.red.color }}
          placeholder="Email"
          onInputChange={this.emailInput}
          clearButtonMode='while-editing'
          keyboardType='email-address'
        />
        <TextField
          textFieldStyle={textFieldStyle}
          placeholderStyle={{ placeholderStyle }}
          textInputStyle={{ textInputStyle }}
          invalidTextFieldStyle={{ borderColor: colors.red.color }}
          placeholder="Username"
          onInputChange={this.usernameInput}
          clearButtonMode='while-editing'
        />
        <TextField
          textFieldStyle={textFieldStyle}
          placeholderStyle={{ placeholderStyle }}
          textInputStyle={{ textInputStyle }}
          invalidTextFieldStyle={{ borderColor: colors.red.color }}
          placeholder="Password"
          isSecured={true}
          onInputChange={this.passwordInput}
          clearButtonMode='while-editing'
          secureTextEntry={true}
        />
        <View style={buttons.arrowView}>
          <TouchableOpacity
            onPress={this.submitPage}
            inputs={this.state}>
            <Image
              source={require('./../../assets/icons/arrownext.png')}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default BasicSignUpComponent;
