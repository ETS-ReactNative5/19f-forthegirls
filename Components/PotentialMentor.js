import React from 'react';
import { connect } from 'react-redux';
import { Text, View, TouchableOpacity, Image } from 'react-native';
import Prompt from './Prompt.js';
import colors, { fonts, fontEffects } from '../assets/styles/basicStyle';
import profile, { promptStyle, buttons } from '../assets/styles/profileStyle';
import { pairMatchToUser } from '../actions';
import { Linking } from 'react-native'
import axios from 'axios';

class PotentialMentor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userMatch: {},
      matched: false,
      noAction: true
    }

  }

  componentDidMount() {
    axios.get(`https://for-the-girls.herokuapp.com/api/users/${this.props.userId}`)
      .then((response) => {
        this.setState({ userMatch: response.data.result });
      }).catch((error) => {
        console.log(error);
      });
  }

  noMatchCallback = () => {
    // api call to remove person from matches
    this.setState({ matched: false, noAction: false })
  }

  yesMatchCallback = () => {
    this.props.pairMatchToUser(this.props.username, this.state.userMatch.username);
    setTimeout(this.props.refresh, 2000);

    this.setState({ matched: true, noAction: false })
  }

  showMatch = () => {
    if (this.state.matched) {
      const email = this.state.userMatch.username;
      Linking.openURL('mailto:' + email + '?subject=We Matched!')
        .catch((error) => console.log(error));
    }
  }

  render() {
    var yesMatch = require('../assets/icons/chatSelected.png');
    var noMatch = require('../assets/icons/dontMatch.png');

    if (this.state.userMatch !== undefined) {
      return (
        <View style={
          [this.state.noAction ? profile.normal : (this.state.matched ? profile.match : profile.dimmed),
          profile.profileContainer]}>
          {this.showMatch()}
          <View style={profile.basicInfo}>
            <View style={profile.basicInfoLeft}>
              <Text style={[colors.black, fonts.majorHeading]}>{`${this.state.userMatch.firstName}, ${this.state.userMatch.age}`}</Text>
              <Text style={[colors.deepPurple, fonts.minorHeading, fontEffects.italic]}>{this.state.userMatch.currentJob === '' ? 'high schooler' : this.state.userMatch.currentJob}</Text>
            </View>
            <View style={profile.jobStuff}>
              <Text style={[colors.deepPurple, fonts.minorHeading, fontEffects.italic]}>{this.state.userMatch.collegeName === '' ? this.state.userMatch.highSchool : this.state.userMatch.collegeName}</Text>
              <Text style={[colors.deepPurple, fonts.minorHeading, fontEffects.italic]}>{this.state.userMatch.gradYear}</Text>
            </View>
          </View>
          <View style={promptStyle.promptContainer}>
            <View >
              <Prompt prompt={this.state.userMatch.promptOneQuestion} answer={this.state.userMatch.promptOneAnswer} />
              <Prompt prompt={this.state.userMatch.promptTwoQuestion} answer={this.state.userMatch.promptTwoAnswer} />
              <Prompt prompt={this.state.userMatch.promptThreeQuestion} answer={this.state.userMatch.promptThreeAnswer} />
            </View>
          </View>
          <View style={buttons.yesNoContainer}>
            <TouchableOpacity onPress={this.noMatchCallback}>
              <Image
                source={noMatch}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={this.yesMatchCallback} >
              <Image
                source={yesMatch}
              />
            </TouchableOpacity>
          </View>
        </View >
      )
    }
    else {
      return (
        <Text>Loading...</Text>
      )
    }
  }
}

const mapStateToProps = reduxState => (
  {
    username: reduxState.auth.username,
    id: reduxState.auth.id,
    email: reduxState.user.email,
  }
);

export default connect(mapStateToProps, { pairMatchToUser })(PotentialMentor);
