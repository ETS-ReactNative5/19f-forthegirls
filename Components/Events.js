import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import SingleEvent from './SingleEvent.js'
import mainScreenStyle from '../assets/styles/mainStyle';
import eventPage from '../assets/styles/eventPage';



class Events extends React.Component {
  constructor(props) {
    super(props);

    this.renderEvent = this.renderEvent.bind(this);
    this.renderEvents = this.renderEvents.bind(this);
  }

  renderEvent (nameProp, uniqueKey) {
    return (
        <View key={uniqueKey}>
          <SingleEvent name={nameProp} />
        </View>
    );
  }

  renderEvents(){
    var eventList = ['Speech', 'Mixer', 'Hackathon'];

    var renderedEvents = eventList.map((anEvent) => {
        return (
          this.renderEvent(anEvent, anEvent.toString())
        );
      }
    )

    return renderedEvents;
  }

  render() {
    return (
      <View style={eventPage.wholeContainer}>
        <ScrollView contentContainerStyle={eventPage.scroll} >
          {this.renderEvents()}
        </ScrollView>
      </View>
    );
  }
}

export default Events;
