import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Button,
} from 'react-native';
import mainScreenStyle from '../assets/styles/mainStyle';
import eventPage from '../assets/styles/eventPage';

class EventDetails extends Component {
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
        <Image source={require('../img/EventBackground.jpg')} style={eventPage.backgroundImage}/>
          <Text>
            {this.props.name}
          </Text>
          <View>
            <Text> Time </Text>
            <Text> Date </Text>
            <Text> Location </Text>
          </View>
          <Text>
            Description
          </Text>
          <Text>
            Your connections who are attending
          </Text>
          <Button title="RSVP"/>
      </View>
    );
  }
}

export default EventDetails;
