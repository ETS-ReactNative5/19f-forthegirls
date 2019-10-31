import React from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import Profile from './Profile';
import { buttons } from '../assets/styles/profileStyle';
<<<<<<< HEAD
import profile from '../assets/styles/profileStyle';
=======

>>>>>>> 010583fc234bdef728c6ddc2ae0ecbcd3ba7351d

class PotentialMentor extends Profile {
  constructor(props) {
    super(props);
<<<<<<< HEAD
=======

>>>>>>> 010583fc234bdef728c6ddc2ae0ecbcd3ba7351d
  }

  render() {
    var yes = require('../assets/icons/chatSelected.png');
    var no = require('../assets/icons/dontMatch.png');

    return (
<<<<<<< HEAD
      <View style={profile.matchProfile}>
        <Profile isMyProfile={false} />
        <View style={buttons.yesNoContainer}>
=======
      <View>
        <Profile isMyProfile={false} />
        <View style={buttons.yesNoContainer}>

>>>>>>> 010583fc234bdef728c6ddc2ae0ecbcd3ba7351d
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
<<<<<<< HEAD
=======
          {/* 
          <Button title="no" />
          <Button title="yes" /> */}
>>>>>>> 010583fc234bdef728c6ddc2ae0ecbcd3ba7351d
        </View>
      </View>
    );
  }
}

export default PotentialMentor; 