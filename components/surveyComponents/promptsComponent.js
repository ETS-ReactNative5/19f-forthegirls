import React from 'react';
import { StyleSheet, Text, ScrollView, View, TouchableOpacity, Image } from 'react-native';
import { Dropdown } from 'react-native-material-dropdown';
import TextField from 'react-native-text-field';
import colors, { buttons, fonts, fontEffects } from '../../assets/styles/basicStyle';
import surveyStyle from '../../assets/styles/surveyStyle';
import SliderComponent from './sliderComponent';
import SurveyHeaderComponent from './surveyHeaderComponent'
import { addToSurvey } from '../../actions/index'
import { connect } from 'react-redux';


class PromptsComponent extends React.Component {
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

  onInputChange = (text) => {
    console.log(text)
    //change state in here
  }

  handleSliderChange(sliderId, value) {
    this.setState({ [sliderId]: value });
    console.log(`parent: ${this.state.introextro}`);
  }

  submitPage = () => {
    this.props.addToSurvey(this.state, this.props.username, this.props.navigation, 'Main');
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

    var eduInfo = this.props.navigation.getParam("eduInfo", null);
    var basicInfo = this.props.navigation.getParam("basicInfo", null);
    var demoInfo = this.props.navigation.getParam("demoInfo", null);
    var csInfo = this.props.navigation.getParam("csInfo", null);
    var promptInfo = {
      'promptOneQuestion': 'a',
      'promptOneAnswer': 'b',
      'promptTwoQuestion': 'c',
      'promptTwoAnswer': 'd',
      'promptThreeQuestion': 'e',
      'promptThreeAnswer': 'f',
    }

    var placeholderStyle = [fonts.bodyText, colors.lightGrey]
    var textInputStyle = [colors.black, fonts.bodyText]
    var textFieldStyle = surveyStyle.textField
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
        />
        <TextField
          textFieldStyle={textFieldStyle}
          placeholderStyle={{ placeholderStyle }}
          textInputStyle={{ textInputStyle }}
          placeholder="Prompt 1 Answer"
          onInputChange={(text) => this.onInputChange(text)}
        />
        <Dropdown
          label='Question 2'
          data={data}
        />
        <TextField
          textFieldStyle={textFieldStyle}
          placeholderStyle={{ placeholderStyle }}
          textInputStyle={{ textInputStyle }}
          placeholder="Prompt 2 Answer"
          onInputChange={(text) => this.onInputChange(text)}
        />
        <Dropdown
          label='Question 3'
          data={data}
        />
        <TextField
          textFieldStyle={textFieldStyle}
          placeholderStyle={{ placeholderStyle }}
          textInputStyle={{ textInputStyle }}
          placeholder="Prompt 3 Answer"
          onInputChange={(text) => this.onInputChange(text)}
        />

        <View style={{ alignItems: 'center', width: '100%', marginTop: 10, marginBottom: 10 }}>
          <SurveyHeaderComponent header="Personality Sliders" text="help us match you better!" />
        </View>
        <SliderComponent id='introextro' onChange={this.handleSliderChange} value={this.state.introextro} min='introvert' max='extrovert' />
        <SliderComponent id='listenfollow' onChange={this.handleSliderChange} value={this.state.listenfollow} min='listener' max='leader' />

        <View style={buttons.arrowView}>
          <TouchableOpacity
            onPress={this.submitPage}>
            <Image
              source={require('./../../assets/icons/arrownext.png')}
            />
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }
}

const mapStateToProps = reduxState => (
  {
    error: reduxState.error,
    username: reduxState.auth.username,
  }
);

export default connect(mapStateToProps, { addToSurvey })(PromptsComponent);
