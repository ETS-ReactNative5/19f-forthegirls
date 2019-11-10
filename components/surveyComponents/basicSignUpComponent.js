import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import TextField from 'react-native-text-field';


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
    if(this.state.firstName === '' || this.state.lastName === '' || this.state.email === '' || this.state.username === '' || this.state.password === '') {
      return (
        //come back tot his
        <Text> Please fill out the entire form </Text>
      );
    }
    else {
      this.props.navigation.navigate('Header', {pastPage: "basicInfo"});
    }
    
  }

  //need to check unique from here
  render() {
    return (
      <View style={{marginTop: 100}}>
        <Text> First, Let's Make an Account! </Text>
        <TextField
          title="First Name"
          placeholder="My Name Is..... "
          onInputChange={this.firstNameInput}
          clearButtonMode='while-editing'
          keyboardType='default'
        />
        <TextField
          title="Last Name"
          placeholder="My Name Is..... "
          onInputChange={this.lastNameInput}
          clearButtonMode='while-editing'
        />
        <TextField
          title="Email"
          placeholder="My Email Is..... "
          onInputChange={this.emailInput}
          clearButtonMode='while-editing'
          keyboardType='email-address'
        />
        <TextField
          title="Username"
          placeholder="My Username Is..... "
          onInputChange={this.usernameInput}
          clearButtonMode='while-editing'
        />
        <TextField
          title="Password"
          placeholder="My Password Is..... "
          onInputChange={this.passwordInput}
          clearButtonMode='while-editing'
          secureTextEntry={true}
        />
        <Button
          //maybe make this an arrow
          title="Next"
          //add checks regarding empty/email
          onPress={this.submitPage}
          inputs={this.state}
          />

      </View>
    );
  }
}

export default BasicSignUpComponent;
