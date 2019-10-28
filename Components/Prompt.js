import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

class Prompt extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View>
        <Text class="prompt">{this.props.prompt}</Text>
        <Text class="answer">{this.props.answer}</Text>
      </View>
    );
  }
}

export default Prompt;
