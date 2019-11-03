import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
} from 'react-native';
import mainScreenStyle from '../assets/styles/mainStyle';
import eventPage from '../assets/styles/eventPage';

class SingleEvent extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  // ---------- componentDidMount here! -----------//
  componentDidMount() {
  }

  render() {
    return (

      <View style={eventPage.singleEventView}>
        <ImageBackground source={require('../img/EventBackground.jpg')} style={eventPage.backgroundImage}>
          <Text>
            This is {this.props.name}
          </Text>
        </ImageBackground>
      </View>
    );
  }
}

export default SingleEvent;
