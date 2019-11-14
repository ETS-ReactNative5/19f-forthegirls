import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Button,
} from 'react-native';
import mainScreenStyle from '../assets/styles/mainStyle';
import eventPage from '../assets/styles/eventPage';

class SingleEvent extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.navToPage = this.navToPage.bind(this);
  }
  // ---------- componentDidMount here! -----------//
  componentDidMount() {
    console.log('SINGEL event key ' + this.props.eventID);
  }

  navToPage() {
    this.props.navigation.navigate('Detail', {eventID: this.props.eventID});
  }

  render() {
    return (

      <View style={eventPage.singleEventView}>
        <ImageBackground source={require('../img/EventBackground.jpg')} style={eventPage.backgroundImage}>
          <Text>
            This is {this.props.name}
          </Text>
          <Button title="Learn More" onPress={this.navToPage} />
        </ImageBackground>
      </View>
    );
  }
}

export default SingleEvent;
