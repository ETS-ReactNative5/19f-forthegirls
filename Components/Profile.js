import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import Prompt from './Prompt.js';
import colors, { fonts } from '../assets/styles/basicStyle';

class Profile extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View>
        <Button title="edit" />
        <View class="basicInfo">
          <Text style={[colors.black, fonts.majorHeading]} class="myName">Name</Text>
          <Text style={[colors.deepPurple, fonts.minorHeading]} class="myAge">21</Text>
          <Text style={[colors.deepPurple, fonts.minorHeading]} class="myOccupation">Student</Text>
          <Text style={[colors.deepPurple, fonts.minorHeading]} class="mySchool">Dartmouth</Text>
        </View>
        <View class="prompts">
          <Prompt prompt='tech inspo' answer='grace hopper' />
          <Prompt prompt='fav app' answer='vsco' />
          <Prompt prompt='dog or cat' answer='dog' />
        </View>
        <Button title="no" />
        <Button title="yes" />
      </View>
    );
  }
}

export default Profile;
