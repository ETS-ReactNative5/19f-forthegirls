import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Button,
  TouchableOpacity,
  Image
} from 'react-native';
import mainScreenStyle from '../assets/styles/mainStyle';
import eventPage from '../assets/styles/eventPage';
import colors, { fonts, fontEffects, profileImage } from '../assets/styles/basicStyle';


class SingleEvent extends Component {
  constructor(props) {
    super(props);
    this.navToPage = this.navToPage.bind(this);
    this.render = this.render.bind(this);
  }
  // ---------- componentDidMount here! -----------//
  componentDidMount() {
  }

  navToPage() {
    this.props.navigation.navigate('Detail', { eventID: this.props.eventID, eventName: this.props.name, eventPhotoURL: this.props.eventPhotoURL });
  }

  render() {
    imageNoImage = require('../img/EventBackground.jpg')
    imageImage = { uri: this.props.eventPhotoURL }

    image = this.props.eventPhotoURL != "" && this.props.eventPhotoURL != null ? imageImage : imageNoImage;

    return (
      <TouchableOpacity onPress={this.navToPage}>
        <View style={eventPage.singleEventView}>
          <ImageBackground source={image} style={eventPage.backgroundImage}>
            <View style={eventPage.title}>
              <Text style={[eventPage.titleMargin, colors.white, fonts.majorHeading]}>
                {this.props.name}
              </Text>
              <Text style={[eventPage.titleMargin, colors.white, fonts.minorHeading]}>
                {this.props.location}
              </Text>
            </View>
            <View style={eventPage.date}>
              <Text style={[colors.white, fonts.majorHeading, fontEffects.italic]}>
                {this.props.date}
              </Text>
            </View>
            <View style={eventPage.rsvpCounts}>
              <Text style={[colors.white, fonts.majorHeading, fontEffects.italic]}>
                {this.props.rsvps ? this.props.rsvps.length : null} RSVPs
              </Text>
            </View>
          </ImageBackground>
        </View>
      </TouchableOpacity>
    );
  }
}

export default SingleEvent;
