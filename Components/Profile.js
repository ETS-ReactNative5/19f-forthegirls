import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Prompt from '../Components/Prompt';

class Profile extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View>
        <View class="basicInfo">
          <Text class="myName">Name</Text>
          <Text class="myAge">21</Text>
          <Text class="myOccupation">Student</Text>
          <Text class="mySchool">Dartmouth</Text>
        </View>
        <View class="prompts">
          <Prompt />
          <Prompt />
          <Prompt />
        </View>
      </View>
    );
  }
}

export default Profile;
