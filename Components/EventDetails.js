import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Button,
} from 'react-native';
import Style from '../assets/styles/mainStyle';
import eventPage from '../assets/styles/eventPage';
import { connect } from 'react-redux';
import { rsvpEvent, getUser } from '../actions';

class EventDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.rsvpEvent = this.rsvpEvent.bind(this);
  }
  // ---------- componentDidMount here! -----------//
  componentDidMount() {
    this.props.getUser(this.props.id);
  }

  rsvpEvent(){
    //this won't work until we make a new Get Event ID backend route which ill do later
    this.props.rsvpEvent(this.props.id, this.props.navigation.getParam("eventID", null));
  }

  render() {
    return (
      <View style={eventPage.singleEventView}>
        <Image source={require('../img/EventBackground.jpg')} style={eventPage.backgroundImage} />
        <Button title="RSVP" onPress={this.rsvpEvent} />

        <Text>
          {this.props.navigation.getParam("eventName", null)}
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
      </View>
    );
  }
}

const mapStateToProps = reduxState => (
  {
    username: reduxState.auth.username,
    id: reduxState.auth.id,
    email: reduxState.user.email,
    matches: reduxState.user.matches,
  }
);

export default connect(mapStateToProps, { rsvpEvent, getUser })(EventDetails);
