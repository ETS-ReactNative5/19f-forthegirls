import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
//import MainScreen from './MainScreen.js'
import { signUpUser } from '../actions';
import { connect } from 'react-redux';

class Survey extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
       goToMatches: false,
       results: '',
    }
  }

  submitSignUp = () => {
    //need to create a fields object with all their answers
    this.props.signUpUser(fields, this.props.navigation);
  }

  render() {
    if (this.state.goToMatches) {
      return (
        null //<MainScreen />
      )
    }
    return (
      <View>
        <Text>I am a survey </Text>
        <Text> Question 1.... </Text>
        <Text> Question 2.... </Text>
        <Button title="Finish... See My Matches" onPress={this.submitSignUp} />
      </View>
    );
  }
}

function mapStateToProps(reduxState) {
  return {
    error: reduxState.error,
  };
}

export default connect(mapStateToProps, { signUpUser })(Survey);
