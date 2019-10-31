import React from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import Profile from './Profile';
import { buttons } from '../assets/styles/profileStyle';


class PotentialMentee extends Profile {
  constructor(props) {
    super(props);
  }

  render() {
    var yes = require('../assets/icons/chatSelected.png');
    var no = require('../assets/icons/dontMatch.png');

    return (
      <View>
        <Profile isMyProfile={false} />
        <View style={buttons.yesNoContainer}>
          <TouchableOpacity >
            <Image
              source={no}
            />
          </TouchableOpacity>
          <TouchableOpacity >
            <Image
              source={yes}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default PotentialMentee; 