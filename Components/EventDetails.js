import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Button,
  Modal,
  TouchableOpacity,
  TouchableHighlight,
  ScrollView,
} from 'react-native';
import Style from '../assets/styles/mainStyle';
import eventPage from '../assets/styles/eventPage';
import modalStyle from '../assets/styles/modalStyle';
import colors, { fonts, fontEffects } from '../assets/styles/basicStyle';
import { connect } from 'react-redux';
import { rsvpEvent, unrsvpEvent, getUser, fetchEvent, fetchRsvpConnections } from '../actions';
import EventMap from './EventMap.js'

class EventDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rsvp: null,
      showingModal: false,
    };

    this.handleRSVP = this.handleRSVP.bind(this);
    this.checkRSVP = this.checkRSVP.bind(this);
    this.changeModal = this.changeModal.bind(this);
    this.renderModal = this.renderModal.bind(this);
    this.renderConnections = this.renderConnections.bind(this);

  }
  // ---------- componentDidMount here! -----------//
  componentDidMount() {
    this.props.fetchEvent(this.props.navigation.getParam("eventID", null))
    this.props.fetchRsvpConnections(this.props.id, this.props.navigation.getParam("eventID", null))
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.rsvp === null) {
      this.checkRSVP();
    }
  }

  changeModal(){
    this.setState({ showingModal: !this.state.showingModal });
  }

  renderConnections() {
    var connected = this.props.connections.map((connect) => {
      console.log(connect);
      return (
        <Text key={connect}>
          {connect}
        </Text>
      );
    })
    return connected;
  }

  renderModal() {
    if(this.state.showingModal){
      return (
        <Modal
          animationType="fade"
          transparent={false}
          visible={this.state.showingModal}>
          <View style={modalStyle.wholeModal}>
            <ScrollView contentContainerStyle={modalStyle.scroll} >
              {this.renderConnections()}
            </ScrollView>
            <TouchableHighlight
              onPress={() => {
                this.changeModal();
              }}>
              <Text style={modalStyle.hideModal}>Hide Modal</Text>
            </TouchableHighlight>
          </View>
        </Modal>
      );
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

  handleRSVP() {
    if(this.state.rsvp===false){
      this.props.rsvpEvent(this.props.id, this.props.navigation.getParam("eventID", null));
      this.setState({ rsvp: true });
    }
    else{
      this.props.unrsvpEvent(this.props.id, this.props.navigation.getParam("eventID", null));
      this.setState({ rsvp: false });
    }
  }

  renderMap = () => {
    if(this.props.event.latitude !== undefined && this.props.event.longitude !== undefined) {
      return (
        <EventMap latitude={this.props.event.latitude} longitude={this.props.event.longitude}/>
      )
    }
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
        {this.renderMap()}
        <View style={eventPage.eventDetailDescription}>
          <Text style={[eventPage.eventDetailDescriptionText, colors.black, fonts.bodyText]}>
            {this.props.event.description}
          </Text>
        </View>
        <View style={eventPage.eventDetailRSVPContainer} >
          {this.renderModal()}
          <View>
            <TouchableOpacity onPress={this.changeModal}>
              <Text style={[colors.deepPurple, fonts.minorHeading]}> {this.props.connections ? this.props.connections.length : null} Connections have Rsvp'd! </Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={eventPage.eventDetailRSVP} onPress={this.handleRSVP}>
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
    connections: reduxState.events.connections,
  }
);

export default connect(mapStateToProps, { unrsvpEvent, rsvpEvent, getUser, fetchEvent, fetchRsvpConnections })(EventDetails);
