import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import SingleEvent from './SingleEvent.js'
import mainScreenStyle from '../assets/styles/mainStyle';
import eventPage from '../assets/styles/eventPage';
import colors, { fonts, fontEffects } from '../assets/styles/basicStyle';
import { connect } from 'react-redux';
import { fetchEvents, fetchYourEvents, getUser } from '../actions';
import ErrorModal from './ErrorModal'
import { NavigationEvents } from 'react-navigation';
import AwardModal from './AwardModal'

class Events extends React.Component {
  static navigationOptions = {
    header: null,
  }

  constructor(props) {
    super(props);
    this.state = {
      viewAll: true,

      showModal: false,
      awardMessage: '',
      awardImage: null,
      awardChange: true,
    };

    this.displayEvents = this.displayEvents.bind(this);
    this.renderEvent = this.renderEvent.bind(this);
    this.renderEvents = this.renderEvents.bind(this);
    this.renderYourEvents = this.renderYourEvents.bind(this);
    this.navToAdd = this.navToAdd.bind(this);
    this.doViewAll = this.doViewAll.bind(this);
    this.dontViewAll = this.dontViewAll.bind(this);
    this.refetchOnBackPress = this.refetchOnBackPress.bind(this);
  }

  componentDidMount() {
    this.props.fetchEvents();
    this.props.fetchYourEvents();

    if (this.props.navigation.getParam('firstEventAward')) {
      this.setState({ showModal: true, awardMessage: 'You got the First Event Created Badge!', awardImage: require('./../assets/icons/socialbutterfly.png') });
    }
  }

  navToAdd() {
    this.props.navigation.navigate('Add', 5876700);
  }

  doViewAll() {
    this.setState({ viewAll: true });
    this.props.fetchEvents();
  }

  dontViewAll() {
    this.setState({ viewAll: false });
    this.props.fetchYourEvents(this.props.id);
  }

  displayEvents() {
    if (this.state.viewAll) {
      return this.renderEvents();
    }
    else {
      return this.renderYourEvents();
    }
  }

  renderEvent(nameProp, dateProp, rsvpsProp, locationProp, eventKey, photoProp) {
    return (
      <View key={eventKey + 1}>
        <SingleEvent
          key={eventKey}
          name={nameProp}
          date={dateProp}
          rsvps={rsvpsProp}
          location={locationProp}
          eventID={eventKey}
          eventPhotoURL={photoProp}
          navigation={this.props.navigation} />
      </View>
    );
  }

  renderEvents() {
    var renderedEvents = this.props.all.map((anEvent) => {
      return (
        this.renderEvent(anEvent.title, anEvent.date, anEvent.rsvps, anEvent.location, anEvent.id, anEvent.eventPhotoURL)
      );
    })
    return renderedEvents;
  }

  renderYourEvents() {
    var renderedEvents = this.props.allYours.map((anEvent) => {
      return (
        this.renderEvent(anEvent.title, anEvent.date, anEvent.rsvps, anEvent.location, anEvent.id, anEvent.eventPhotoURL)
      );
    })
    return renderedEvents;
  }

  changeState = () => {
    this.setState({ showModal: true, awardMessage: 'You got the First Event Created Badge!', awardImage: require('./../assets/icons/socialbutterfly.png'), awardChange: false });
  }

  refetchOnBackPress = () => {
    this.props.fetchEvents();
    this.props.fetchYourEvents();
  }


  renderModal = () => {
    if (this.state.showModal) {
      return (
        <AwardModal awardMessage={this.state.awardMessage} awardImage={this.state.awardImage} reset={this.resetModal} />
      );
    }
  }

  resetModal = () => {
    this.setState({ showModal: false, awardMessage: "" });
  }

  render() {
    if (this.props.navigation.getParam('firstEventAward') && this.state.awardChange) {
      this.changeState();
    }
    if (this.props.all !== undefined) {
      return (
        <View style={eventPage.wholeContainer}>
          <NavigationEvents onDidFocus={this.refetchOnBackPress}>
          </NavigationEvents>
          <View style={eventPage.viewOptionsContainer}>
            {this.renderModal()}
            <View style={this.state.viewAll
              ? eventPage.addEventOpacity
              : eventPage.notPressed}>
              <TouchableOpacity onPress={this.doViewAll}>
                <Text style={[eventPage.addEventText, this.state.viewAll
                  ? colors.white
                  : colors.turquoise, fonts.minorHeading]}>
                  See All
              </Text>
              </TouchableOpacity>
            </View>
            <View style={this.state.viewAll
              ? eventPage.notPressed
              : eventPage.addEventOpacity}>
              <TouchableOpacity onPress={this.dontViewAll}>
                <Text style={[eventPage.addEventText, this.state.viewAll
                  ? colors.turquoise
                  : colors.white, fonts.minorHeading]}>
                  See RSVP'd
              </Text>
              </TouchableOpacity>
            </View>
          </View>
          <ScrollView contentContainerStyle={eventPage.scroll} >
            {this.displayEvents()}
          </ScrollView>
          <View style={eventPage.addEventContainer}>
            <TouchableOpacity style={eventPage.addEventOpacity} onPress={this.navToAdd}>
              <Text style={[eventPage.addEventText, colors.white, fonts.minorHeading]}>
                Add Event
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    }
    else {
      return (
        <Text style={[fonts.bodyText, colors.turquoise, fontEffects.center]}>Loading Your Events!</Text>
      );
    }

  }
}

// connects particular parts of redux state to this components props
const mapStateToProps = state => (
  {
    id: state.auth.id,
    all: state.events.all,
    allYours: state.events.allYours,
  }
);

export default (connect(mapStateToProps, { getUser, fetchEvents, fetchYourEvents })(Events));
