import React from 'react';
import { Text, View, TouchableOpacity, Image } from 'react-native';
import Profile from './Profile';
import { buttons } from '../assets/styles/profileStyle';
import profile from '../assets/styles/profileStyle';
import colors, { fonts } from '../assets/styles/basicStyle';

class PotentialMentor extends React.Component {
  constructor(props) {
    super(props);
    this.state = { matched: false, noAction: true }
  }

  noMatchCallback = () => {
    // api call to remove person from matches
    this.setState({ matched: false, noAction: false })
  }

  yesMatchCallback = () => {
    // api call to add person to matches 
    this.setState({ matched: true, noAction: false })
  }

  showMatch = () => {
    if (this.state.matched) {
      return (<Text style={[colors.turquoise, fonts.minorHeading]}>time to chat!</Text>);
    }
  }

  render() {
    var yesMatch = require('../assets/icons/chatSelected.png');
    var noMatch = require('../assets/icons/dontMatch.png');

    return (
      <View style={
        [this.state.noAction ? profile.normal : (this.state.matched ? profile.match : profile.dimmed),
        profile.matchProfile]}>
        {this.showMatch()}
        <Profile isMyProfile={false} />
        <View style={buttons.yesNoContainer}>
          <TouchableOpacity onPress={this.noMatchCallback}>
            <Image
              source={noMatch}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={this.yesMatchCallback} >
            <Image
              source={yesMatch}
            />
          </TouchableOpacity>
        </View>
      </View >
    );
  }
}

export default PotentialMentor;
