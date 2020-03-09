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
            
          </View>
        );
  
    }
  }
  
  
  
  export default StartScreen;
  
