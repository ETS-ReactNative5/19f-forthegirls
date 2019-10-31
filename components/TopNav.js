import React from 'react';
import { StyleSheet, Text, View, Button, Image, TouchableOpacity } from 'react-native';
import bottomNav from '../assets/styles/bottomNav';


class TopNav extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={[bottomNav.topLayout, bottomNav.borderTop]}>
        <TouchableOpacity onPress={this.props.matchesCallBack} >
          <Image source={require('../assets/icons/home.png')} />
        </TouchableOpacity>
        <TouchableOpacity onPress={console.log("Here3")} >
          <Text> logo </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.props.settingsCallBack} >
          <Image source={require('../assets/icons/settings.png')} />
        </TouchableOpacity>
      </View>
    );
  }
}

export default TopNav;
