import React from 'react';
import { connect } from 'react-redux';
import { Text, View, TouchableOpacity, Image } from 'react-native';
import Prompt from './Prompt.js';
import colors, { fonts, fontEffects, profileImage } from '../assets/styles/basicStyle';
import profile, { promptStyle, buttons } from '../assets/styles/profileStyle';
import { pairMatchToUser, rejectAMatch } from '../actions';
import { Linking } from 'react-native'
import axios from 'axios';

class PotentialMentor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userMatch: {},
      matched: false,
      noAction: true,
    }
  }

  componentDidMount() {
    this.setState({ mounted: true });
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

  yesMatchCallback = (prompt) => {
    if (prompt === '0') {
      prompt = "Hi " + this.state.userMatch.firstName + '!';
    }
    if (prompt === '1') {
      prompt = this.state.userMatch.promptOneAnswer;
    }
    if (prompt === '2') {
      prompt = this.state.userMatch.promptTwoAnswer;
    }
    if (prompt === '3') {
      prompt = this.state.userMatch.promptThreeAnswer;
    }
    this.props.pairMatchToUser(this.props.username, this.state.userMatch.username, prompt, this.props.navigation, this.state.userMatch.id);
    // this.props.refresh(this.props.username);
  }

  rejectMatch = () => {
    this.props.rejectAMatch(this.props.username, this.state.userMatch.username)
  }

  getPrompt = (num) => {
    if (num === 1) {
      return (
        <TouchableOpacity onPress={() => this.yesMatchCallback('1')}>
          <Prompt prompt={this.state.userMatch.promptOneQuestion} answer={this.state.userMatch.promptOneAnswer} />
        </TouchableOpacity>
      );
    }
    else if (num === 2) {
      return (
        <TouchableOpacity onPress={() => this.yesMatchCallback('2')}>
          <Prompt prompt={this.state.userMatch.promptTwoQuestion} answer={this.state.userMatch.promptTwoAnswer} />
        </TouchableOpacity>
      );
    }
    else {
      return (
        <TouchableOpacity onPress={() => this.yesMatchCallback('3')}>
          <Prompt prompt={this.state.userMatch.promptThreeQuestion} answer={this.state.userMatch.promptThreeAnswer} />
        </TouchableOpacity>
      );
    }
  }



  render() {
    var yesMatch = require('../assets/icons/yesMatch.png');
    var noMatch = require('../assets/icons/dontMatch.png');

    imageNoImage = <Image source={require('./../assets/icons/tim.jpg')} style={profileImage.basic} />
    imageImage = <Image source={{ uri: this.state.userMatch.profileURL }} style={profileImage.basic} />

    image = this.state.userMatch.profileURL != "" && this.state.userMatch.profileURL != null ? imageImage : imageNoImage;


    if (this.state.userMatch !== undefined) {
      return (
        <View style={
          [this.state.noAction ? profile.normal : (this.state.matched ? profile.match : profile.dimmed),
          profile.profileContainer]}>
          {/* {this.showMatch()} */}

          <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 20 }}>
            <TouchableOpacity onPress={() => this.yesMatchCallback('0')}>
              {image}
            </TouchableOpacity>
          </View>
          <View style={profile.basicInfo}>
            <View style={profile.basicInfoLeft}>
              <TouchableOpacity onPress={() => this.yesMatchCallback('0')}>
                <Text style={[colors.black, fonts.majorHeading]}>{`${this.state.userMatch.firstName}, ${this.state.userMatch.age}`}</Text>
                <Text style={[colors.deepPurple, fonts.minorHeading, fontEffects.italic]}>{this.state.userMatch.location}</Text>
              </TouchableOpacity>
            </View>
            <View style={profile.jobStuff}>
              <TouchableOpacity onPress={() => this.yesMatchCallback('0')}>
                <Text style={[colors.deepPurple, fonts.minorHeading, fontEffects.italic]}>{this.state.userMatch.collegeName === '' ? this.state.userMatch.highSchool : this.state.userMatch.collegeName}</Text>
                <Text style={[colors.deepPurple, fonts.minorHeading, fontEffects.italic]}>{this.state.userMatch.gradYear}</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={promptStyle.promptContainer}>
            <View>
              {this.state.userMatch.promptOneAnswer ? this.getPrompt(1) : null}
              {this.state.userMatch.promptTwoAnswer ? this.getPrompt(2) : null}
              {this.state.userMatch.promptThreeAnswer ? this.getPrompt(3) : null}
            </View>
          </View>
          <View style={buttons.yesNoContainer}>
            <TouchableOpacity onPress={this.noMatchCallback}>
              <Image
                source={noMatch}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.yesMatchCallback('0')}>
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
        <Text style={[fonts.bodyText, colors.turquoise, fontEffects.center]}>Loading Your Matches!</Text>
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

export default connect(mapStateToProps, { pairMatchToUser, rejectAMatch })(PotentialMentor);
