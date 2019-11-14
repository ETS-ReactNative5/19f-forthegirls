import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, TextInput, View, Button } from 'react-native';
import Prompt from './Prompt.js';
import colors, { fonts, fontEffects } from '../assets/styles/basicStyle';
import profile, { promptStyle } from '../assets/styles/profileStyle';
import { getUser, editUser, signoutUser } from '../actions';


class Profile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      editing: false,
      questionAnswers:
      {
        name: 'test',
        hometown: 'Westchester, NY',
        age: 21,
        occupation: 'Student',
        college: 'Dartmouth',
        techInspo: 'GHC',
        favApp: 'VSCO',
        dogCat: 'Dog because dogs are so cute this is a long answer we love dogs so much',
      },
      isMyProfile: true
    };

    this.changeEditStatus = this.changeEditStatus.bind(this);
  }

  componentDidMount() {
    this.props.getUser(this.props.id);
    console.log(this.props.username);
    console.log(this.props.email);
  }

  isMyProfile() {
    if (this.props.isMyProfile && !this.state.editing) {
      return (<Button title="Edit" onPress={this.changeEditStatus} />)
    }
    else if (this.props.isMyProfile && this.state.editing) {
      return (<Button title="Save Changes" onPress={this.changeEditStatus} />)
    }
  }

  changeEditStatus() {
    this.setState({ editing: !this.state.editing });
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

  render() {
    if (this.state.editing === true) {
      return (
        <View style={profile.profileContainer}>
          {this.isMyProfile(this.props.isMyProfile)}
          <View style={profile.basicInfo}>
            <View style={profile.basicInfoLeft}>
              <View style={profile.nameHeading}>
                <Text style={[colors.black, fonts.majorHeading]}>Editing</Text>
                <Text style={[colors.deepPurple, fonts.minorHeading, profile.age]}>, 21</Text>
              </View >
              <Text style={[colors.deepPurple, fonts.minorHeading, fontEffects.italic]}>Westchester, NY</Text>
            </View>
            <TextInput style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
              placeholder="Waiting for input..."
              placeholderTextColor="#9a73ef"
              autoCapitalize="none"
              onChangeText={this.handleInput} />
            <View style={profile.jobStuff}>
              <Text style={[colors.deepPurple, fonts.minorHeading, fontEffects.italic]}>Student</Text>
              <Text style={[colors.deepPurple, fonts.minorHeading, fontEffects.italic]}>Dartmouth</Text>
            </View>
          </View>
          <View style={promptStyle.promptContainer}>
            <View >
              <Prompt prompt='tech inspo' answer='grace hopper' />
              <Prompt prompt='fav app' answer='vsco' />
              <Prompt prompt='dog or cat' answer='dog because dogs are so cute this is a long answer we love dogs so much' />
            </View>
          </View>
        </View>
      );
    }
    else if (this.state.editing === false) {
      return (
        <View style={profile.profileContainer}>
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
            <View >
              <Prompt prompt={this.props.promptOneQuestion} answer={this.props.promptOneAnswer} />
              <Prompt prompt={this.props.promptTwoQuestion} answer={this.props.promptTwoAnswer} />
              <Prompt prompt={this.props.promptThreeQuestion} answer={this.props.promptThreeAnswer} />
            </View>
          </View>
        </View>
      );
    }
    else {
      return (
        <View style={profile.profileContainer}>
          <Text style={[colors.black, fonts.majorHeading]}>Loading...</Text>
        </View>
      )
    }
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
  }
);

export default connect(mapStateToProps, { getUser, editUser, signoutUser })(Profile);
