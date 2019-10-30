import React from 'react';
import { View, Button } from 'react-native';
import Profile from './Profile';
import { buttons } from '../assets/styles/profileStyle';


class PotentialMentor extends Profile {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View>
        <Profile isMyProfile={false} />
        <View style={buttons.yesNoContainer}>
          <Button title="no" />
          <Button title="yes" />
        </View>
      </View>
    );
  }
}

export default PotentialMentor; 