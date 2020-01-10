import React from 'react';
import { StyleSheet, Text, ScrollView, View, TouchableOpacity, Image, TextInput } from 'react-native';
import { Dropdown } from 'react-native-material-dropdown';
import TextField from 'react-native-text-field';
import colors, { buttons, fonts, fontEffects } from '../assets/styles/basicStyle';
import surveyStyle from '../assets/styles/surveyStyle';
import SliderComponent from './sliderComponent';
import SurveyHeaderComponent from './surveyHeaderComponent'
import { addToSurvey } from '../actions/index'
import { connect } from 'react-redux';


class EditProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      promptOneQuestion: '',
      promptOneAnswer: '',
      promptTwoQuestion: '',
      promptTwoAnswer: '',
      promptThreeQuestion: '',
      promptThreeAnswer: '',
      introextro: 50,
      listenfollow: 50
    };
    this.handleSliderChange = this.handleSliderChange.bind(this);

  }

  p1Question = (value) => {
    this.setState({ promptOneQuestion: value });
  }

  p1Answer = (text) => {
    this.setState({ promptOneAnswer: text });
  }

  p2Question = (value) => {
    this.setState({ promptTwoQuestion: value });
  }

  p2Answer = (text) => {
    this.setState({ promptTwoAnswer: text });
  }

  p3Question = (value) => {
    this.setState({ promptThreeQuestion: value });
  }

  p3Answer = (text) => {
    this.setState({ promptThreeAnswer: text });
  }

  handleSliderChange(sliderId, value) {
    this.setState({ [sliderId]: value });
    // console.log(`parent: ${this.state.introextro}`);
  }

  opacityOnPress = () => {
    this.props.navigation.navigate('Home', { })
  }

  render() {
    let data = [{
      value: 'Woman in tech inspiration?',
    }, {
      value: 'Favorite app?',
    }, {
      value: 'iOS or android?',
    }, {
      value: 'favorite programming language',
    }, {
      value: 'coffee or tea',
    }, {
      value: 'spaces or tabs',
    }, {
      value: 'what could you give a ted talk on',
    }];


    var textFieldStyle = [surveyStyle.textField, fonts.bodyText]
    var itemTextStyle = [fonts.bodyText]
    var selectedItemColor = colors.turquoise.color

    return (

      <ScrollView style={surveyStyle.surveyBackground}>
        <View style={{ alignItems: 'center', width: '100%', marginTop: 10, marginBottom: 10 }}>
          <SurveyHeaderComponent text="Tell us about your personality" header="How Chill Are You?" />
        </View>
        <Dropdown
          itemTextStyle={itemTextStyle}
          selectedItemColor={selectedItemColor}
          label='Question 1'
          data={data}
          onChangeText={this.p1Question}
        />
        <TextInput
          style={textFieldStyle}
          placeholder="Prompt 1 Answer"
          onChangeText={this.p1Answer}
        />
        <Dropdown
          itemTextStyle={itemTextStyle}
          selectedItemColor={selectedItemColor}
          label='Question 2'
          data={data}
          onChangeText={this.p2Question}
        />
        <TextInput
          style={textFieldStyle}
          placeholder="Prompt 2 Answer"
          onChangeText={this.p2Answer}
        />
        <Dropdown
          itemTextStyle={itemTextStyle}
          selectedItemColor={selectedItemColor}
          label='Question 3'
          data={data}
          onChangeText={this.p3Question}
        />
        <TextInput
          style={textFieldStyle}
          placeholder="Prompt 3 Answer"
          onChangeText={this.p3Answer}
        />

        <View style={{ alignItems: 'center', width: '100%', marginTop: 10, marginBottom: 10 }}>
          <SurveyHeaderComponent header="Personality Sliders" text="help us match you better!" />
        </View>
        <SliderComponent id='introextro' onChange={this.handleSliderChange} value={this.state.introextro} min='introvert' max='extrovert' />
        <SliderComponent id='listenfollow' onChange={this.handleSliderChange} value={this.state.listenfollow} min='listener' max='leader' />

        <TouchableOpacity
            onPress={this.opacityOnPress}>
            <Text>go back</Text>
        </TouchableOpacity>
      </ScrollView>



    );
  }
}

export default EditProfile;
