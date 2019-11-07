import React from 'react';
import { StyleSheet, Text, View, ScrollView, Button } from 'react-native';
import SingleEvent from './SingleEvent.js'
import mainScreenStyle from '../assets/styles/mainStyle';
import eventPage from '../assets/styles/eventPage';

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

  navToAdd() {
    this.props.navigation.navigate('Add', 5876700);
  }

  renderEvent(nameProp, uniqueKey) {
    return (
      <View key={uniqueKey}>
        <SingleEvent name={nameProp} navigation={this.props.navigation} />
      </View>
    );
  }

  renderEvents() {
    var eventList = ['Speech', 'Mixer', 'Hackathon'];

    var renderedEvents = eventList.map((anEvent) => {
      return (
        this.renderEvent(anEvent, anEvent.toString())
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

export default Events;
