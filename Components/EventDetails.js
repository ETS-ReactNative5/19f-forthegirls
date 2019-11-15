import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Button,
  TouchableOpacity,
} from 'react-native';
import Style from '../assets/styles/mainStyle';
import eventPage from '../assets/styles/eventPage';
import colors, { fonts, fontEffects } from '../assets/styles/basicStyle';
import { connect } from 'react-redux';
import { rsvpEvent, getUser, fetchEvent } from '../actions';

class EventDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rsvp: false,
    };

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
      <View style={eventPage.eventDetail}>
        <Image source={require('../img/EventBackground.jpg')} style={eventPage.eventDetailImage} />
        <View style={eventPage.eventDetailTitleBox} >
          <Text style={[eventPage.eventDetailTitle, colors.black, fonts.majorHeading, fontEffects.italic]}>
            {this.props.event.title}
          </Text>
        </View>
        <View style={eventPage.eventDetailLogistics}>
          <View style={eventPage.eventDetailDayTime}>
            <Text style={[colors.deepPurple, fonts.minorHeading, fontEffects.italic]}> {this.props.event.date} </Text>
            <Text style={[colors.deepPurple, fonts.minorHeading, fontEffects.italic]}> {this.props.event.time} </Text>
          </View>
          <View style={eventPage.eventDetailLocation}>
            <Text style={[colors.deepPurple, fonts.minorHeading, fontEffects.italic]}> {this.props.event.location} </Text>
          </View>
        </View>
        <View style={eventPage.eventDetailDescription}>
          <Text style={[eventPage.eventDetailDescriptionText, colors.black, fonts.bodyText, fontEffects.italic]}>
            {this.props.event.description}
          </Text>
        </View>
        <View style={eventPage.eventDetailRSVPContainer} >
          <TouchableOpacity style={eventPage.eventDetailRSVP} onPress={this.rsvpEvent}>
            <Text style={[eventPage.eventDetailRSVPText, colors.white, fonts.minorHeading, fontEffects.italic]}>
              RSVP
            </Text>
          </TouchableOpacity>
        </View>
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
