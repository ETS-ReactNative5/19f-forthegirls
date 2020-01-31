import React from 'react';
import { Text, View } from 'react-native';
import colors, { fonts } from '../assets/styles/basicStyle';

class BadgesComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={{ marginTop: 20 }}>
        <Text> Badges </Text>
      </View>
    );
  }
}

export default BadgesComponent;
