import React from 'react';
import { StyleSheet, Text, TextInput, View, Button } from 'react-native';
import Prompt from './Prompt.js';
import colors, { fonts, fontEffects } from '../assets/styles/basicStyle';
import profile, { promptStyle } from '../assets/styles/profileStyle';

class Profile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      editing: false,
      questionAnswers:
      {
        name: 'Sami',
        hometown: 'Westchester, NY',
        age: 21,
        occupation: 'Student',
        college: 'Dartmouth',
        techInspo: 'GHC',
        favApp: 'VSCO',
        dogCat: 'Dog because dogs are so cute this is a long answer we love dogs so much',
      }
    };

    this.changeEditStatus = this.changeEditStatus.bind(this);
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

  render() {
    if(this.state.editing===true){
      return (
        <View >
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
    else if(this.state.editing===false){
      return (
        <View >
          {this.isMyProfile(this.props.isMyProfile)}
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
              <Prompt prompt='fav app' answer={this.state.questionAnswers.favApp}/>
              <Prompt prompt='dog or cat' answer={this.state.questionAnswers.dogCat} />
            </View>
          </View>
        </View>
      );
    }
  }
}

export default Profile;
