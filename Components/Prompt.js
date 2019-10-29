import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import colors, { fonts } from '../assets/styles/basicStyle';
import { promptStyle } from '../assets/styles/profileStyle';

class Prompt extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={promptStyle.promptBox}>
        <Text style={[colors.turquoise, fonts.minorHeading]}>{this.props.prompt}</Text>
        <Text style={[fonts.bodyText, promptStyle.promptAnswer]}>{this.props.answer}</Text>
      </View>
    );
  }
}

export default Prompt;
