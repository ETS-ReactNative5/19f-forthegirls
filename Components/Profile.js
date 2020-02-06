import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, TextInput, View, Button, TouchableOpacity, Image } from 'react-native';
import Prompt from './Prompt.js';
import colors, { fonts, fontEffects, buttons, profileImage } from '../assets/styles/basicStyle';
import profile, { promptStyle } from '../assets/styles/profileStyle';
import { getUser, editUser, signoutUser, addToSurvey, fetchAwardStatus, fetchYourAwards } from '../actions';
import { withNavigation } from 'react-navigation';

import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';

class Profile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      editing: false,
      isMyProfile: true,
      image: null,
      width: 0,
      height: 0,
      progress: 0,
    };

  }

  componentDidMount() {
    const { navigation } = this.props;
    this.props.getUser(this.props.id);
    this.focusListener = navigation.addListener('didFocus', () => {
      this.props.getUser(this.props.id);
      this.props.fetchYourAwards(this.props.id);

    });

    // console.log('in profile, p1 q and a after get user on comp did mount')
    // console.log(this.props.promptOneQuestion);
    // console.log(this.props.promptOneAnswer);
    // this.listener = this.props.navigation.addListener("didFocus", this.props.getUser(this.props.id));
  }
  componentWillUnmount() {
    // Remove the event listener
    this.focusListener.remove();
  }


  isMyProfile() {
    if (this.props.isMyProfile && !this.state.editing) {
      return (<Button title="Edit" onPress={this.changeEditStatus} />)
    }
    else if (this.props.isMyProfile && this.state.editing) {
      return (<Button title="Save Changes" onPress={this.changeEditStatus} />)
    }
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
    this.props.navigation.navigate('EditProfile', {})
  }

  threeRSVPS = () => {
    if (this.props.allYours[1]) {
      return <Image source={require('./../assets/icons/eventsbadge.png')} />
    }
    return null;
  }

  messageFive = () => {
    if (this.props.allYours[3]) {
      return <Image source={require('./../assets/icons/messageFive.png')} />
    }
    return null;
  }

  firstMatch = () => {
    if (this.props.allYours[5]) {
      return <Image source={require('./../assets/icons/socialbutterfly.png')} />
    }
    return null;
  }

  firstEvent = () => {
    if(this.props.allYours[7]){
      return <Image source={require('./../assets/icons/firstevent.png')} />
    }
    return null;
  }

  hundredMessages = () => {
    if(this.props.allYours[9]){
      return <Image source={require('./../assets/icons/hundredMessages.png')} />
    }
    return null;
  }

  badge = () => {
    return (
      <View style={{flexDirection: 'row'}}>
      {this.threeRSVPS()}
      {this.messageFive()}
      {this.firstMatch()}
      {this.firstEvent()}
      {this.hundredMessages()}
      {<Image source={require('./../assets/icons/founders.png')} />}
      </View>
    )
  }


  render() {
    var prompts;
    if (this.props.promptOneQuestion == null) {
      prompts = (
        <TouchableOpacity
          onPress={this.opacityOnPress}>
          <Text>click here to add matching data</Text>
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

    imageNoImage = <Image source={require('./../assets/icons/tim.jpg')} style={profileImage.basic} />
    imageImage = <Image source={{ uri: this.props.profileURL }} style={profileImage.basic} />

    image = this.props.profileURL != "" && this.props.profileURL != null ? imageImage : imageNoImage;

    rewards = null;
    if (this.props.allYours != null) {
      rewards = this.badge()
    }

    console.log(this.props.allYours);
    console.log("^^^");


    return (
      <View style={profile.profileContainer}>
        <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 20 }}>
          {image}
        </View>

        {this.isMyProfile(this.props.isMyProfile)}
        {/* <Button onPress={this.logout} title="Log Out" /> */}

        <View style={profile.basicInfo}>
          <View style={profile.basicInfoLeft}>
            <Text style={[colors.black, fonts.majorHeading]}>{`${this.props.firstName}, ${this.props.age}`}</Text>
            <Text style={[colors.deepPurple, fonts.minorHeading, fontEffects.italic]}>{this.props.currentJob === '' ? 'high schooler' : this.props.currentJob}</Text>
          </View>
          <View style={profile.jobStuff}>
            <Text style={[colors.deepPurple, fonts.minorHeading, fontEffects.italic]}>{this.props.collegeName === '' ? this.props.highSchool : this.props.collegeName}</Text>
            <Text style={[colors.deepPurple, fonts.minorHeading, fontEffects.italic]}>{this.props.gradYear === 0 ? '' : this.props.gradYear}</Text>
          </View>
        </View>
        <View style={promptStyle.promptContainer}>
          {prompts}
        </View>
        <View>
          {rewards}
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
      </View>
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

export default withNavigation(connect(mapStateToProps, { getUser, editUser, signoutUser, addToSurvey, fetchAwardStatus, fetchYourAwards })(Profile));
