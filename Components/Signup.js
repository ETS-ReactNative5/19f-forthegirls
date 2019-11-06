import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import Survey from './Survey.js'

//this.props.navigation.navigate(name of page you want to go to)


class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = { beginsurvey: false }
  }

  render() {
    if (this.state.beginsurvey) {
      return (
        <Survey />
      )
    }
    return (
      <View style={{marginTop: 100}}>
        <Text>Yay you are signing up</Text>
        <Text> Need to fill out survey </Text>
        <Button title="clickToBeginSurvey" onPress={() => {  this.props.navigation.navigate('Header', {pastPage: "startScreen"}) }} />
      </View>
    );
  }
}

export default SignUp;
