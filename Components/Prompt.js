import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import colors, { fonts } from '../assets/styles/basicStyle';

class Prompt extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View>
        <Text style={[colors.turquoise, fonts.minorHeading]} class="prompt">{this.props.prompt}</Text>
        <Text style={fonts.bodyText} class="answer">{this.props.answer}</Text>
      </View>
    );
  }
}

export default Prompt;
