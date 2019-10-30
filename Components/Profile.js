import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import Prompt from './Prompt.js';
import colors, { fonts } from '../assets/styles/basicStyle';
import profile, { promptStyle } from '../assets/styles/profileStyle';

class Profile extends React.Component {
  constructor(props) {
    super(props);
  }

  isMyProfile() {
    if (this.props.isMyProfile) {
      return (<Button title="edit" />)
    }
  }

  render() {
    return (
      <View >
        {this.isMyProfile(this.props.isMyProfile)}
        <View style={profile.basicInfo}>
          <View style={profile.nameHeading}>
            <Text style={[colors.black, fonts.majorHeading]}>Name</Text>
            <Text style={[colors.deepPurple, fonts.minorHeading, profile.age]}>, 21</Text>
          </View>
          <View style={profile.jobStuff}>
            <Text style={[colors.deepPurple, fonts.minorHeading]}>Student</Text>
            <Text style={[colors.deepPurple, fonts.minorHeading]}>Dartmouth</Text>
          </View>
        </View>
        <View style={promptStyle.promptContainer}>
          <View >
            <Prompt prompt='tech inspo' answer='grace hopper' />
            <Prompt prompt='fav app' answer='vsco' />
            <Prompt prompt='dog or cat' answer='dog because dogs are so cute this is a long answer we love dogs so much' />
          </View>
        </View>
      </View>
    );
  }
}

export default Profile;
