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
      rsvp: null,
    };

    this.rsvpEvent = this.rsvpEvent.bind(this);
    this.checkRSVP = this.checkRSVP.bind(this);
  }
  // ---------- componentDidMount here! -----------//
  componentDidMount() {
    this.props.fetchEvent(this.props.navigation.getParam("eventID", null))
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.rsvp === null) {
      this.checkRSVP();
    }
  }

  checkRSVP() {
    if (this.props.event && this.props.event.rsvps) {
      var seen = false
      this.props.event.rsvps.map((id) => {
        if (id === this.props.id) {
          seen = true;
        }
      })
      this.setState({ rsvp: seen });
    }
  }

  rsvpEvent() {
    this.props.rsvpEvent(this.props.id, this.props.navigation.getParam("eventID", null));
    this.setState({ rsvp: true });
  }

  render() {
    return (
      <View style={eventPage.eventDetail}>
        <Image source={require('../img/EventBackground.jpg')} style={eventPage.eventDetailImage} />
        <View style={eventPage.eventDetailTitleBox} >
          <Text style={[eventPage.eventDetailTitle, colors.black, fonts.majorHeading]}>
            {this.props.event.title}
          </Text>
        </View>
        <View style={eventPage.eventDetailLogistics}>
          <View style={eventPage.eventDetailDayTime}>
            <Text style={[colors.deepPurple, fonts.minorHeading]}> {this.props.event.date} </Text>
            <Text style={[colors.deepPurple, fonts.minorHeading, fontEffects.italic]}> {this.props.event.time} </Text>
          </View>
          <View style={eventPage.eventDetailLocation}>
            <Text style={[colors.deepPurple, fonts.minorHeading, fontEffects.italic]}> {this.props.event.location} </Text>
          </View>
        </View>
        <View style={eventPage.eventDetailDescription}>
          <Text style={[eventPage.eventDetailDescriptionText, colors.black, fonts.bodyText]}>
            {this.props.event.description}
          </Text>
        </View>
        <View style={eventPage.eventDetailRSVPContainer} >
          <TouchableOpacity style={eventPage.eventDetailRSVP} onPress={this.rsvpEvent}>
            <Text style={[eventPage.eventDetailRSVPText, colors.white, fonts.minorHeading]}>
              {this.state.rsvp
                ? 'You have RSVPd!'
                : 'RSVP'}
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
