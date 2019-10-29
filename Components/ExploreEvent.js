import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';


class ExploreEvent extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  // ---------- componentDidMount here! -----------//
  componentDidMount() {
  }

  render() {
    return (
      <View style={MainStyle.explore}>
          <Text>
            This is {this.props.name}
          </Text>
      </View>
    );
  }
}

const MainStyle = StyleSheet.create({
  explore: {
    backgroundColor: '#FFFBAF',
    width: 400,
    paddingTop: 100,
    paddingBottom: 100,
    marginTop: 10,
    marginBottom: 10,
    textAlign: 'center',
  },
});


export default ExploreEvent;
