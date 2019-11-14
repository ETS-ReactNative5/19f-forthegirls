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
import { rsvpEvent, getUser, fetchEvent } from '../actions';

class EventDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.rsvpEvent = this.rsvpEvent.bind(this);
  }
  // ---------- componentDidMount here! -----------//
  componentDidMount() {
    // this.props.getUser(this.props.id);
    this.props.fetchEvent(this.props.navigation.getParam("eventID", null));
  }

  rsvpEvent(){
    console.log('this userid ' + this.props.id);

    this.props.rsvpEvent(this.props.id, this.props.navigation.getParam("eventID", null));
  }

  render() {
    return (
      <View style={eventPage.singleEventView}>
        <Image source={require('../img/EventBackground.jpg')} style={eventPage.backgroundImage} />
        <Button title="RSVP" onPress={this.rsvpEvent} />

        <Text>
          {this.props.event.title}
        </Text>
        <View>
          <Text> {this.props.event.date} </Text>
          <Text> {this.props.event.time} </Text>
          <Text> {this.props.event.location} </Text>
        </View>
        <Text>
          Description
          </Text>
        <Text> {this.props.event.description} </Text>
        <Text>
          Your connections who are attending
          </Text>
      </View>
    );
  }
}

const mapStateToProps = reduxState => (
  {
    id: reduxState.auth.id,
    event: reduxState.events.event,
  }
);

export default connect(mapStateToProps, { rsvpEvent, getUser, fetchEvent })(EventDetails);
