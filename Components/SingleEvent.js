import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Button,
  TouchableOpacity,
} from 'react-native';
import mainScreenStyle from '../assets/styles/mainStyle';
import eventPage from '../assets/styles/eventPage';
import colors, { fonts, fontEffects } from '../assets/styles/basicStyle';


class SingleEvent extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.navToPage = this.navToPage.bind(this);
  }
  // ---------- componentDidMount here! -----------//
  componentDidMount() {
  }

  navToPage() {
    this.props.navigation.navigate('Detail', { eventID: this.props.eventID });
  }

  render() {
    return (
      <TouchableOpacity onPress={this.navToPage}>
        <View style={eventPage.singleEventView}>
          <ImageBackground source={require('../img/EventBackground.jpg')} style={eventPage.backgroundImage}>
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
          </ImageBackground>
        </View>
      </TouchableOpacity>
    );
  }
}

export default SingleEvent;
