import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import SingleEvent from './SingleEvent.js'
import mainScreenStyle from '../assets/styles/mainStyle';
import eventPage from '../assets/styles/eventPage';
import colors, { fonts, fontEffects } from '../assets/styles/basicStyle';
import { connect } from 'react-redux';
import { fetchEvents } from '../actions';

class Events extends React.Component {
  static navigationOptions = {
    header: null,
  }

  constructor(props) {
    super(props);
    this.state = {
      viewAll: true,
    };

    this.renderEvent = this.renderEvent.bind(this);
    this.renderEvents = this.renderEvents.bind(this);
    this.navToAdd = this.navToAdd.bind(this);
    this.doViewAll = this.doViewAll.bind(this);
    this.dontViewAll = this.dontViewAll.bind(this);
  }

  componentDidMount() {
    this.props.fetchEvents();
  }

  componentDidUpdate(prevProps, prevState) {
    this.props.fetchEvents();
  }

  navToAdd() {
    this.props.navigation.navigate('Add', 5876700);
  }

  doViewAll() {
    this.setState({viewAll:true});
  }

  dontViewAll() {
    this.setState({viewAll:false});
  }

  renderEvent(nameProp, dateProp, rsvpsProp, locationProp, eventKey) {
    return (
      <View key={eventKey + 1}>
        <SingleEvent
          key={eventKey}
          name={nameProp}
          date={dateProp}
          rsvps={rsvpsProp}
          location={locationProp}
          eventID={eventKey}
          navigation={this.props.navigation} />
      </View>
    );
  }

  renderEvents() {
    var renderedEvents = this.props.events.all.map((anEvent) => {
      return (
        this.renderEvent(anEvent.title, anEvent.date, anEvent.rsvps, anEvent.location, anEvent.id)
      );
    })

    return renderedEvents;
  }

  render() {
    return (
      <View style={eventPage.wholeContainer}>
      <View style={eventPage.viewOptionsContainer}>
        <View style={this.state.viewAll
          ? eventPage.addEventOpacity
          : eventPage.notPressed}>
          <TouchableOpacity onPress={this.doViewAll}>
            <Text style={[eventPage.addEventText, this.state.viewAll
              ? colors.white
              : colors.deepPurple,  fonts.minorHeading]}>
              See All
            </Text>
          </TouchableOpacity>
        </View>
        <View style={this.state.viewAll
          ? eventPage.notPressed
          : eventPage.addEventOpacity}>
          <TouchableOpacity onPress={this.dontViewAll}>
            <Text style={[eventPage.addEventText, this.state.viewAll
              ? colors.deepPurple
              : colors.white, fonts.minorHeading]}>
              See RSVP'd
            </Text>
          </TouchableOpacity>
        </View>
      </View>
        <ScrollView contentContainerStyle={eventPage.scroll} >
          {this.renderEvents()}
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
}

// connects particular parts of redux state to this components props
const mapStateToProps = state => (
  {
    events: state.events,
  }
);

export default (connect(mapStateToProps, { fetchEvents })(Events));
