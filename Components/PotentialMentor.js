import React from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import Profile from './Profile';
import { buttons } from '../assets/styles/profileStyle';


class PotentialMentor extends Profile {
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
          {/* 
          <Button title="no" />
          <Button title="yes" /> */}
        </View>
      </View>
    );
  }
}

export default PotentialMentor; 