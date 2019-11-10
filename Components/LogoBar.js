import React from 'react';
import { Text, View, Button } from 'react-native';
import colors, { logo, fonts } from '../assets/styles/basicStyle';

const LogoBar = () => {
    return (
      <View style={logo.barContainer}>
        <Text style={[fonts.majorHeading, colors.white]}>FTG</Text>
    </View>
    );
}


export default LogoBar;
