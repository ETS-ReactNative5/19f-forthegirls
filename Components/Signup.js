import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import Survey from './Survey.js'


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
      <View>
        <Text>Yay you are signing up</Text>
        <Text> Need to fill out survey </Text>
        <Button title="click to begin survey" onPress={() => { this.setState({ beginsurvey: true }) }} />
      </View>
    );
  }
}

export default SignUp;
