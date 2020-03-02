import React from 'react';
import { StyleSheet, Text, View, Button, Image } from 'react-native';
import colors, { fonts, buttons } from '../assets/styles/basicStyle';
import { TouchableOpacity } from 'react-native-gesture-handler';

class StartScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
      var logo = require('../assets/icons/logo.png');
      return (
        <View style={{ height: '100%', backgroundColor: colors.turquoise.color }}>
          <Image style={{ width: '96%', height: '75%', alignSelf: 'center' }} source={logo} />
          <View style={buttons.container}>
            <TouchableOpacity title="signup" onPress={() => { this.props.navigation.navigate('SignUp', {}) }}>
              <View style={buttons.signUpInButton}><Text style={[fonts.minorHeading, colors.white]}>Sign Up</Text></View>
            </TouchableOpacity>
            <TouchableOpacity title="signin" onPress={() => { this.props.navigation.navigate('SignIn', {}) }} >
              <View style={buttons.signUpInButton}><Text style={[fonts.minorHeading, colors.white]}>Sign In</Text></View>
            </TouchableOpacity>
          </View>
        </View>
      );

  }
}



export default StartScreen;
