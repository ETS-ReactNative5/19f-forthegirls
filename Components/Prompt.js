import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

class Prompt extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View>
        <Text class="prompt">prompt question</Text>
        <Text class="answer">answer</Text>
      </View>
    );
  }
}

export default Prompt;
