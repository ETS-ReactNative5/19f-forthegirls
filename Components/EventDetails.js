import React, { Component } from 'react';
import axios from 'axios';
import ErrorModal from './ErrorModal'
import AwardModal from './AwardModal'
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
      showingConnectionsModal: false,
      rsvpLength: 0,
      showModal: false,
      modalMessage: '',
      showAwardModal: false,
      awardMessage: '',
      awardImage: null
    };
    this.handleRSVP = this.handleRSVP.bind(this);
    this.checkRSVP = this.checkRSVP.bind(this);
    this.changeConnectionsModal = this.changeConnectionsModal.bind(this);
    this.renderConnectionsModal = this.renderConnectionsModal.bind(this);
    this.renderConnections = this.renderConnections.bind(this);
    this.renderAwardModal = this.renderAwardModal.bind(this);
  }
  // ---------- componentDidMount here! -----------//
  componentDidMount() {
    this.props.fetchEvent(this.props.navigation.getParam("eventID", null))
    this.props.fetchRsvpConnections(this.props.id, this.props.navigation.getParam("eventID", null))
    axios.get(`${ROOT_URL}/events/rsvp/your/${this.props.id}`).then((response) => {
      this.setState({ rsvpLength: response.data.length })
    }).catch((error) => {
      console.log(error);
    });
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.state.rsvp === null) {
      this.checkRSVP();
    }
  }
  changeConnectionsModal() {
    this.setState({ showingConnectionsModal: !this.state.showingConnectionsModal });
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
  renderConnectionsModal() {
    if (this.state.showingConnectionsModal) {
      return (
        <Modal
          animationType="fade"
          transparent={true}
          visible={this.state.showingConnectionsModal}>
          <View style={modal.eventContainer}>
            <SurveyHeaderComponent header={`Attending ${this.props.navigation.getParam("eventName")}`} />
            <ScrollView>
              <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'flex-start' }}>{this.renderConnections()}</View>
            </ScrollView>
            <TouchableHighlight
              onPress={() => {
                this.changeConnectionsModal();
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
      if (this.state.rsvpLength == 2) {
        this.setState({ showAwardModal: true, awardMessage: 'You got the RSVP to 3 events badge!', awardImage: require('./../assets/icons/globetrotter.png') });
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
  renderAwardModal() {
    if (this.state.showAwardModal) {
      return (
        <AwardModal awardMessage={this.state.awardMessage} awardImage={this.state.awardImage} reset={this.resetAwardModal} />
      );
    }
  }
  resetAwardModal = () => {
    this.setState({ showAwardModal: false, awardMessage: "", awardImage: null });
  }

  goBack = () => {
    this.props.navigation.pop();
  }

  render() {
    imageNoImage = require('../img/EventBackground.jpg')
    imageImage = { uri: this.props.navigation.getParam("eventPhotoURL") }
    image = this.props.navigation.getParam("eventPhotoURL") != "" && this.props.navigation.getParam("eventPhotoURL") != null ? imageImage : imageNoImage;
    return (

      <View style={eventPage.eventDetail}>
        <ScrollView>
          {this.renderAwardModal()}
          <View style={{ width: '100%', flex: 1, alignItems: 'left', marginLeft: 10, marginTop: 10 }}>
            <TouchableOpacity
              onPress={this.goBack}>
              <Image
                source={require('./../assets/icons/arrowback.png')}
              />
            </TouchableOpacity>
          </View>
          <Image source={image} style={eventPage.eventDetailImage} />
          <View style={eventPage.eventDetailTitleBox} >
            <Text style={[eventPage.eventDetailTitle, colors.white, fonts.majorHeading]}>
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
            {this.renderConnectionsModal()}
            <View style={{ alignItems: 'center', backgroundColor: colors.lightGrey.color, padding: 10, borderRadius: 20 }}>
              <Text style={[colors.deepPurple, fonts.minorHeading]}>{this.props.connections ? this.props.connections.length : null} connections are attending</Text>
              <TouchableOpacity onPress={this.changeConnectionsModal}>
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

        </ScrollView>
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