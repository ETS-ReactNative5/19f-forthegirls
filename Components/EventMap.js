import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';


// https://github.com/react-native-community/react-native-maps
// Tools to make a map appear on the screen with the correct marker of the event



class EventMap extends Component {

  constructor(props) {
    super(props);


  }

  render() {
    if(this.props.latitude !== undefined && this.props.longitude !== undefined) {
      return (
        <MapView
           style={{ width: 200, height: 150 }}
           provider={PROVIDER_GOOGLE}
           showsUserLocation
           initialRegion={{
           latitude: this.props.latitude,
           longitude: this.props.longitude,
           latitudeDelta: 1,
           longitudeDelta: 1}}
        >
          <Marker
          coordinate={{latitude: this.props.latitude, longitude: this.props.longitude}}
          />
        </MapView>
      );
    }
    else {
      return (
        <Text>Loading...</Text>
      )
    }
  }
}

export default EventMap;

