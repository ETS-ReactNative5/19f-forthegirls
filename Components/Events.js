import React from 'react';
import { StyleSheet, Text, View, ScrollView, Button } from 'react-native';
import SingleEvent from './SingleEvent.js'
import mainScreenStyle from '../assets/styles/mainStyle';
import eventPage from '../assets/styles/eventPage';
import { connect } from 'react-redux';
import { fetchEvents } from '../actions';

class Events extends React.Component {
  static navigationOptions = {
    header: null,
  }

  constructor(props) {
    super(props);

    this.renderEvent = this.renderEvent.bind(this);
    this.renderEvents = this.renderEvents.bind(this);
    this.navToAdd = this.navToAdd.bind(this);
  }

  componentDidMount() {
    this.props.fetchEvents();
  }

  navToAdd() {
    this.props.navigation.navigate('Add', 5876700);
  }

  renderEvent(nameProp, eventKey) {
    console.log('events key ' + eventKey);
    return (
      <View key={eventKey}>
        <SingleEvent name={nameProp} eventID={eventKey} navigation={this.props.navigation} />
      </View>
    );
  }

  renderEvents() {
    var eventList = ['Speech', 'Mixer', 'Hackathon'];

    var renderedEvents = this.props.events.all.map((anEvent) => {
      return (
        this.renderEvent(anEvent.title, anEvent.id)
      );
    })

    return renderedEvents;
  }

  render() {
    return (
      <View style={eventPage.wholeContainer}>
        <ScrollView contentContainerStyle={eventPage.scroll} >
          {this.renderEvents()}
        </ScrollView>
        <Button title="Add Event" onPress={this.navToAdd} />
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
