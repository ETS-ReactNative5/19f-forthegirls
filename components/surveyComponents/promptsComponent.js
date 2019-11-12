import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { Dropdown } from 'react-native-material-dropdown';
import TextField from 'react-native-text-field';
import colors, { buttons, fonts, fontEffects } from '../../assets/styles/basicStyle';
import surveyStyle from '../../assets/styles/surveyStyle';
import SurveyHeaderComponent from './surveyHeaderComponent'


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
    }
  }

  onInputChange = (text) => {
    console.log(text)
    //change state in here
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
        <View  style={{alignItems: 'center', width:'100%', marginTop: 10, marginBottom: 10}}>
          <SurveyHeaderComponent text="Tell us about your personality" header= "How Chill Are You?" />
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

        <View style={buttons.arrowView}>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate('Main', {
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
