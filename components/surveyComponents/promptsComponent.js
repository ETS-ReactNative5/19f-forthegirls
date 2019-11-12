import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { Dropdown } from 'react-native-material-dropdown';
import TextField from 'react-native-text-field';
import colors, { buttons, fonts, fontEffects } from '../../assets/styles/basicStyle';
import surveyStyle from '../../assets/styles/surveyStyle';
import SliderComponent from './sliderComponent';

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
      <View style={surveyStyle.surveyBackground}>
        <Text style={[fonts.majorHeading, fontEffects.center]}>Choose a Prompt from the drop down to answer</Text>
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
        <Text style={[fonts.majorHeading, fontEffects.center]}>
          Fill out personality scales so we can best match you!
        </Text>
        <SliderComponent id='introextro' onChange={this.handleSliderChange} value={this.state.introextro} min='introvert' max='extrovert' />
        <SliderComponent id='listenfollow' onChange={this.handleSliderChange} value={this.state.listenfollow} min='listener' max='leader' />

        <View style={buttons.arrowView}>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate('Header', {
                pastPage: "promptInfo",
                basicInfo: basicInfo, demoInfo: demoInfo, csInfo: csInfo, eduInfo: eduInfo, promptInfo: promptInfo
              })
            }}>
            <Image
              source={require('./../../assets/icons/arrownext.png')}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default PromptsComponent;
