import React from 'react';
import { Text, View } from 'react-native';
import colors, { logo, fonts } from '../assets/styles/basicStyle';

const LogoBar = () => {
  return (<View style={logo.barContainer}>
    <Text style={[fonts.majorHeading, colors.white]}>hi this is the logo bar</Text>
  </View>);
}

export default LogoBar;