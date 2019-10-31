import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import ExploreEvent from './ExploreEvent.js'

class Events extends React.Component {
  constructor(props) {
    super(props);

    this.renderEvent = this.renderEvent.bind(this);
    this.renderEvents = this.renderEvents.bind(this);
  }

  renderEvent (nameProp, uniqueKey) {
    return (
        <View key={uniqueKey}>
          <ExploreEvent name={nameProp} />
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
    //return this.renderEvent('Speech');
    return (
      <ScrollView>
        {this.renderEvents()}
      </ScrollView>
    );
  }
}

export default Events;
