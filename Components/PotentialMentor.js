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
      noAction: true,
    }

  }

  componentDidMount() {
    this.setState({mounted: true});
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
    if(prompt!==undefined) {
      this.props.pairMatchToUser(this.props.username, this.state.userMatch.username, prompt, this.props.navigation, this.state.userMatch.id);
      // console.log("handling chat");
    }
    // setTimeout(this.props.refresh, 2000);

    // this.setState({ matched: true, noAction: false })
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
              {/*  */}
              <TouchableOpacity onPress={() => this.yesMatchCallback(this.state.userMatch.promptOneQuestion)}>
                <Prompt prompt={this.state.userMatch.promptOneQuestion} answer={this.state.userMatch.promptOneAnswer} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.yesMatchCallback(this.state.userMatch.promptTwoQuestion)}>
                <Prompt prompt={this.state.userMatch.promptTwoQuestion} answer={this.state.userMatch.promptTwoAnswer} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.yesMatchCallback(this.state.userMatch.promptThreeQuestion)}>
                <Prompt prompt={this.state.userMatch.promptThreeQuestion} answer={this.state.userMatch.promptThreeAnswer} />
              </TouchableOpacity>
            </View>
          </View>
          <View style={buttons.yesNoContainer}>
            <TouchableOpacity onPress={this.noMatchCallback}>
              <Image
                source={noMatch}
              />
            </TouchableOpacity>
            {/* <TouchableOpacity onPress={this.yesMatchCallback} >
              <Image
                source={yesMatch}
              />
            </TouchableOpacity> */}
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
