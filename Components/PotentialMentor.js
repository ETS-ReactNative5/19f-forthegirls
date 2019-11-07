import React from 'react';
import { connect } from 'react-redux';
import { Text, View, TouchableOpacity, Image } from 'react-native';
import Prompt from './Prompt.js';
import colors, { fonts, fontEffects } from '../assets/styles/basicStyle';
import profile, { promptStyle, buttons } from '../assets/styles/profileStyle';
import { pairMatchToUser, getUser } from '../actions';

class PotentialMentor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      questionAnswers:
      {
        name: 'user2',
        hometown: 'Westchester, NY',
        age: 21,
        occupation: 'Student',
        college: 'Dartmouth',
        techInspo: 'tim',
        favApp: 'insta',
        dogCat: 'cats!',
      },
      matched: false,
      noAction: true
    }

  }

  componentDidMount() {
    //hardcoded -- need to get rid of 
    this.props.getUser(this.props.username);
  }

  noMatchCallback = () => {
    // api call to remove person from matches
    this.setState({ matched: false, noAction: false })
  }

  yesMatchCallback = () => {
    this.props.pairMatchToUser(this.props.username, this.state.questionAnswers.name)
    this.setState({ matched: true, noAction: false })
  }

  showMatch = () => {
    if (this.state.matched) {
      return (<Text style={[colors.turquoise, fonts.minorHeading]}>time to chat!</Text>);
    }
  }

  render() {
    var yesMatch = require('../assets/icons/chatSelected.png');
    var noMatch = require('../assets/icons/dontMatch.png');

    return (
      <View style={
        [this.state.noAction ? profile.normal : (this.state.matched ? profile.match : profile.dimmed),
        profile.profileContainer]}>
        {this.showMatch()}
        <View style={profile.basicInfo}>
          <View style={profile.basicInfoLeft}>
            <View style={profile.nameHeading}>
              <Text style={[colors.black, fonts.majorHeading]}>{this.state.questionAnswers.name}</Text>
              <Text style={[colors.deepPurple, fonts.minorHeading, profile.age]}>, {this.state.questionAnswers.age}</Text>
            </View >
            <Text style={[colors.deepPurple, fonts.minorHeading, fontEffects.italic]}>{this.state.questionAnswers.hometown}</Text>
          </View>
          <View style={profile.jobStuff}>
            <Text style={[colors.deepPurple, fonts.minorHeading, fontEffects.italic]}>{this.state.questionAnswers.occupation}</Text>
            <Text style={[colors.deepPurple, fonts.minorHeading, fontEffects.italic]}>{this.state.questionAnswers.college}</Text>
          </View>
        </View>
        <View style={promptStyle.promptContainer}>
          <View >
            <Prompt prompt='tech inspo' answer={this.state.questionAnswers.techInspo} />
            <Prompt prompt='fav app' answer={this.state.questionAnswers.favApp} />
            <Prompt prompt='dog or cat' answer={this.state.questionAnswers.dogCat} />
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
    );
  }
}

const mapStateToProps = reduxState => (
  {
    username: reduxState.auth.username,
    email: reduxState.user.email,
    matches: reduxState.user.matches,
  }
);

export default connect(mapStateToProps, { pairMatchToUser, getUser })(PotentialMentor);