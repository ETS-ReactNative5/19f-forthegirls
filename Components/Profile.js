import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, TextInput, View, Button, TouchableOpacity, Image, ScrollView } from 'react-native';
import Prompt from './Prompt.js';
import colors, { fonts, fontEffects, buttons, profileImage } from '../assets/styles/basicStyle';
import profile, { promptStyle } from '../assets/styles/profileStyle';
import { getUser, signoutUser, addToSurvey, fetchAwardStatus, fetchYourAwards } from '../actions';
import { withNavigation } from 'react-navigation';
import AwardModal from './AwardModal'

import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';

class Profile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      image: null,
      width: 0,
      height: 0,
      progress: 0,
      showModal: false,
      awardMessage: '',
      awardImage: null,
    };

  }

  componentDidMount() {
    const { navigation } = this.props;
    this.props.getUser(this.props.id);
    this.focusListener = navigation.addListener('didFocus', () => {
      this.props.getUser(this.props.id);
      this.props.fetchYourAwards(this.props.id);

    });
  }
  componentWillUnmount() {
    // Remove the event listener
    this.focusListener.remove();
  }

  handleInput = (text) => {
    this.setState(prevState => ({
      questionAnswers: {
        ...prevState.questionAnswers,
        name: text,
      }
    }));
  }

  logout = () => {
    this.props.signoutUser(this.props.navigation);
  }

  opacityOnPress = () => {
    this.sendMessage();

    this.props.navigation.navigate('EditProfile', {})
  }

  makeModalPopFirstMatch = () => {
    this.setState({ showModal: true, awardMessage: 'This badge is for having your first match!', awardImage: require('./../assets/icons/firstMatch.png') });
  }

  makeModalPopThreeRSVPS = () => {
    this.setState({ showModal: true, awardMessage: 'This badge is for RSVPing three events!', awardImage: require('./../assets/icons/globetrotter.png') });
  }

  makeModalPopMessageFive = () => {
    this.setState({ showModal: true, awardMessage: 'This badge is for messaging five people!', awardImage: require('./../assets/icons/messageFive.png') });
  }
  makeModalPopHundredMessages = () => {
    this.setState({ showModal: true, awardMessage: 'This badge is for sending 100 messages!', awardImage: require('./../assets/icons/chattyCathy.png') });
  }

  makeModalPopFirstEvent = () => {
    this.setState({ showModal: true, awardMessage: 'This badge is for creating your first event!', awardImage: require('./../assets/icons/socialbutterfly.png') });
  }

  makeModalPopFounders = () => {
    this.setState({ showModal: true, awardMessage: 'This badge is for being one of our first users!', awardImage: require('./../assets/icons/founders.png') });
  }

  threeRSVPS = () => {
    if (this.props.allYours[1]) {
      return (
        <TouchableOpacity onPress={this.makeModalPopThreeRSVPS}>
          <Image style={profile.award} source={require('./../assets/icons/globetrotter.png')} />
        </TouchableOpacity>

      )
    }
    return null;
  }

  sendMessage = async () => {
    console.log("HERE IN SEND MESSAGE");
    const MESSAGE_ENPOINT = 'http://e6a6945d.ngrok.io/message';
    fetch(MESSAGE_ENPOINT, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: "hello",
      }),
    });
  }


  messageFive = () => {
    if (this.props.allYours[3]) {
      return (
        <TouchableOpacity onPress={this.makeModalPopMessageFive}>
          <Image style={profile.award} source={require('./../assets/icons/messageFive.png')} />
        </TouchableOpacity>
      )
    }
    return null;
  }

  firstMatch = () => {
    if (this.props.allYours[5]) {
      return (
        <TouchableOpacity onPress={this.makeModalPopFirstMatch}>
          <Image style={profile.award} source={require('./../assets/icons/firstMatch.png')} />
        </TouchableOpacity>

      )
    }
    return null;
  }

  hundredMessages = () => {
    if (this.props.allYours[7]) {
      return (
        <TouchableOpacity onPress={this.makeModalPopHundredMessages}>
          <Image style={profile.award} source={require('./../assets/icons/chattyCathy.png')} />
        </TouchableOpacity>

      )
    }
    return null;
  }

  firstEvent = () => {
    if (this.props.allYours[9]) {
      return (
        <TouchableOpacity onPress={this.makeModalPopFirstEvent}>
          <Image style={profile.award} source={require('./../assets/icons/socialbutterfly.png')} />
        </TouchableOpacity>

      )
    }
    return null;
  }


  badge = () => {
    return (
      <ScrollView horizontal={true} contentContainerStyle={{ flexDirection: 'row' }}>
        {this.threeRSVPS()}
        {this.messageFive()}
        {this.firstMatch()}
        {this.firstEvent()}
        {this.hundredMessages()}
        {<TouchableOpacity onPress={this.makeModalPopFounders}>
          <Image style={profile.award} source={require('./../assets/icons/founders.png')} />
        </TouchableOpacity>
        }
      </ScrollView>
    )
  }

  renderModal = () => {
    if (this.state.showModal) {
      return (
        <AwardModal awardMessage={this.state.awardMessage} awardImage={this.state.awardImage} reset={this.resetModal} />
      );
    }
  }

  resetModal = () => {
    this.setState({ showModal: false, modalMessage: "", awardAward: false });
  }


  render() {
    var prompts;
    if (this.props.promptOneQuestion == null) {
      prompts = (
        <TouchableOpacity
          onPress={this.opacityOnPress}>
          <Text style={[colors.turquoise, fonts.minorHeading]}>click here to enhance your profile!</Text>
        </TouchableOpacity>
      )
    }
    else {
      prompts = (
        <View>
          <Prompt prompt={this.props.promptOneQuestion} answer={this.props.promptOneAnswer} />
          <Prompt prompt={this.props.promptTwoQuestion} answer={this.props.promptTwoAnswer} />
          <Prompt prompt={this.props.promptThreeQuestion} answer={this.props.promptThreeAnswer} />
        </View>
      )
    }

    imageNoImage = <Image source={require('./../assets/icons/propic.jpg')} style={profileImage.basic} />
    imageImage = <Image source={{ uri: this.props.profileURL }} style={profileImage.basic} />

    image = this.props.profileURL != "" && this.props.profileURL != null ? imageImage : imageNoImage;

    rewards = null;
    if (this.props.allYours != null) {
      rewards = this.badge()
    }

    return (
      <ScrollView>
        <View style={profile.profileContainer}>
          <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 20 }}>
            {image}
          </View>
          {this.renderModal()}
          <View style={[profile.basicInfo, { alignItems: 'center', justifyContent: 'space-between' }]}>
            <View style={[profile.basicInfoLeft, { alignItems: 'flex-start', flexWrap: 'wrap', flexShrink: 1, justifyContent: 'flex-start', width: 200 }]}>
              <Text style={[colors.black, fonts.majorHeading]}>{`${this.props.firstName}, ${this.props.age}`}</Text>
              <Text style={[colors.deepPurple, fonts.minorHeading]}>{this.props.location}</Text>
            </View>
            <View style={[profile.jobStuff, { flexWrap: 'wrap', flexShrink: 1, alignItems: 'flex-end', justifyContent: 'flex-end', width: 200 }]}>
              <Text style={[colors.deepPurple, fonts.minorHeading]}>{this.props.collegeName === '' ? this.props.highSchool : this.props.collegeName}</Text>
              <Text style={[colors.deepPurple, fonts.minorHeading]}>{this.props.gradYear === 0 ? '' : this.props.gradYear}</Text>
            </View>
          </View>
          <View style={{ justifyContent: 'flex-end' }}>
            <View style={buttons.container}>
              <TouchableOpacity
                onPress={this.opacityOnPress}>
                <View style={buttons.logInOutButton}><Text style={[fonts.minorHeading, colors.white]}>Edit Profile</Text></View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={this.logout}>
                <View style={buttons.logInOutButton}><Text style={[fonts.minorHeading, colors.white]}>Log Out</Text></View>
              </TouchableOpacity>
            </View>
          </View>
          <View style={promptStyle.promptContainer}>
            {prompts}
          </View>
          <View style={{ margin: 5 }}>
            {rewards}
          </View>

        </View>
      </ScrollView>
    )
  }
}


const mapStateToProps = reduxState => (
  {
    username: reduxState.auth.username,
    id: reduxState.auth.id,
    email: reduxState.user.email,
    matches: reduxState.user.matches,
    firstName: reduxState.user.firstName,
    age: reduxState.user.age,
    highSchool: reduxState.user.highSchool,
    collegeName: reduxState.user.collegeName,
    gradYear: reduxState.user.gradYear,
    currentJob: reduxState.user.currentJob,
    location: reduxState.user.location,
    promptOneQuestion: reduxState.user.promptOneQuestion,
    promptOneAnswer: reduxState.user.promptOneAnswer,
    promptTwoQuestion: reduxState.user.promptTwoQuestion,
    promptTwoAnswer: reduxState.user.promptTwoAnswer,
    promptThreeQuestion: reduxState.user.promptThreeQuestion,
    promptThreeAnswer: reduxState.user.promptThreeAnswer,
    profileURL: reduxState.user.profileURL,
    allYours: reduxState.awards.allYours,
  }
);

export default withNavigation(connect(mapStateToProps, { getUser, signoutUser, addToSurvey, fetchAwardStatus, fetchYourAwards })(Profile));
