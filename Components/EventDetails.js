import React, { Component } from 'react';
import axios from 'axios';
import ErrorModal from './ErrorModal'

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
import colors, { fonts, fontEffects, modal, buttons, profileImage } from '../assets/styles/basicStyle';
import { connect } from 'react-redux';
import { rsvpEvent, unrsvpEvent, getUser, fetchEvent, fetchRsvpConnections } from '../actions';
import EventMap from './EventMap.js'
import SurveyHeaderComponent from './surveyHeaderComponent.js'
export const ROOT_URL = 'https://for-the-girls.herokuapp.com/api';


class EventDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rsvp: null,
      showingModal: false,
      rsvpLength: 0,
      showModal: false,
      modalMessage: '',
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
    axios.get(`${ROOT_URL}/events/rsvp/your/${this.props.id}`).then((response) => {
      this.setState({rsvpLength: response.data.length})
    }).catch((error) => {
      console.log(error);
    });

  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.rsvp === null) {
      this.checkRSVP();
    }
  }

  changeModal() {
    this.setState({ showingModal: !this.state.showingModal });
  }

  renderConnections() {
    var connected = this.props.connections.map((connect) => {
      return (
        <View key={connect._id} style={{ margin: 7 }}>
          <Image source={connect.profileURL !== undefined ? { uri: connect.profileURL } : require('./../assets/icons/tim.jpg')} style={profileImage.eventConnection} />
          <Text style={[fonts.minorHeading, colors.deepPurple]}>
            {connect.firstName}
          </Text>
        </View>
      );
    })
    return connected;
  }

  renderModal() {
    if (this.state.showingModal) {
      return (
        <Modal
          animationType="fade"
          transparent={true}
          visible={this.state.showingModal}>
          <View style={modal.eventContainer}>
            <SurveyHeaderComponent header={`Attending ${this.props.navigation.getParam("eventName")}`} />
            <ScrollView>
              <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'flex-start' }}>{this.renderConnections()}</View>
            </ScrollView>
            <TouchableHighlight
              onPress={() => {
                this.changeModal();
              }}>
              <View style={[buttons.logInOutButton, modal.closeButton]}><Text style={[fonts.minorHeading, colors.white]}>Okay</Text></View>
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
    if (this.state.rsvp === false) {
      this.props.rsvpEvent(this.props.id, this.props.navigation.getParam("eventID", null));
      this.setState({ rsvp: true });
      console.log(this.state.rsvpLength)
      if (this.state.rsvpLength == 3){
        console.log("HEREEEEe")
        this.setState({showModal:true, modalMessage: "You got a badge!!"});
      }
    }
    else {
      this.props.unrsvpEvent(this.props.id, this.props.navigation.getParam("eventID", null));
      this.setState({ rsvp: false });
    }
  }

  renderMap = () => {
    if (this.props.event.latitude !== undefined && this.props.event.longitude !== undefined) {
      return (
        <EventMap latitude={this.props.event.latitude} longitude={this.props.event.longitude} />
      )
    }
  }

  renderModal = () => {
    if (this.state.showModal) {
      return (
        <ErrorModal errorMessage={this.state.modalMessage} reset={this.resetModal} />
      );
    }
  }

  resetModal = () => {
    this.setState({ showModal: false, modalMessage: "" });
  }

  render() {
    imageNoImage = require('../img/EventBackground.jpg')
    imageImage = { uri: this.props.navigation.getParam("eventPhotoURL") }

    image = this.props.navigation.getParam("eventPhotoURL") != "" && this.props.navigation.getParam("eventPhotoURL") != null ? imageImage : imageNoImage;

    return (
      <ScrollView>
      <View style={eventPage.eventDetail}>
      {this.renderModal()}

        <Image source={image} style={eventPage.eventDetailImage} />
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
        {//this.renderMap()
        }
        <View style={eventPage.eventDetailDescription}>
          <Text style={[eventPage.eventDetailDescriptionText, colors.black, fonts.bodyText]}>
            {this.props.event.description}
          </Text>
        </View>
        <View style={eventPage.eventDetailRSVPContainer} >
          {this.renderModal()}
          <View style={{ alignItems: 'center', backgroundColor: colors.lightGrey.color, padding: 10, borderRadius: 20 }}>
            <Text style={[colors.deepPurple, fonts.minorHeading]}>{this.props.connections ? this.props.connections.length : null} connections are attending</Text>
            <TouchableOpacity onPress={this.changeModal}>
              <Text style={[colors.turquoise, fonts.minorHeading]}>Click to see who!</Text>
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
      </ScrollView>
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
