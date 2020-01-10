import React from 'react';
import { StyleSheet, Text, ScrollView, View, TouchableOpacity, Image, TextInput } from 'react-native';
import { Dropdown } from 'react-native-material-dropdown';
import TouchableComponent from './touchableComponent';

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
      listenfollow: 50,
      frontEnd: false,
      backEnd: false,
      small: false,
      medium: false,
      large: false,
      meritocratic: false,
      nurturing: false,
      fratty: false,
      fast: false,
      organized: false,
      stable: false,
      formal: false,
      relaxed: false,
      web: false,
      user: false,
      design: false,
      mobile: false,
      security: false,
      algorithms: false,
      storage: false,

      // showing and hiding
      showSkills: false,
      showPreferences: false,
      showCompany: false
    };
    this.handleSliderChange = this.handleSliderChange.bind(this);
    this.handleFieldChange = this.handleFieldChange.bind(this);
    this.toggleSkills = this.toggleSkills.bind(this);
    this.togglePreferences = this.togglePreferences.bind(this);
    this.toggleCompany = this.toggleCompany.bind(this);

  }

  handleFieldChange(fieldId, value) {
    this.setState({ [fieldId]: value });
  }


    toggleSkills() {
      this.setState({
        showSkills: !this.state.showSkills
      });
    }

    togglePreferences() {
      this.setState({
        showPreferences: !this.state.showPreferences
      });
    }

    toggleCompany() {
      this.setState({
        showCompany: !this.state.showCompany
      });
    }

    showSkills(val) {
      if (val) {
        return (
          <View style={surveyStyle.items} >
            <TouchableComponent name='Web Applications' stateField='web' stateFieldStatus={this.state.web} onChange={this.handleFieldChange} />
            <TouchableComponent name='User Interaction' stateField='user' stateFieldStatus={this.state.user} onChange={this.handleFieldChange} />
            <TouchableComponent name='Design' stateField='design' stateFieldStatus={this.state.design} onChange={this.handleFieldChange} />
            <TouchableComponent name='Mobile Applications' stateField='mobile' stateFieldStatus={this.state.mobile} onChange={this.handleFieldChange} />
            <TouchableComponent name='Security' stateField='security' stateFieldStatus={this.state.security} onChange={this.handleFieldChange} />
            <TouchableComponent name='Algorithms & Math' stateField='algorithms' stateFieldStatus={this.state.algorithms} onChange={this.handleFieldChange} />
            <TouchableComponent name='Storage & Infrastructure' stateField='storage' stateFieldStatus={this.state.storage} onChange={this.handleFieldChange} />
          </View>
        )
      } else {
        return <Text>FALSEy false</Text>
      }
    }

    showPreferences(val) {
      if (val) {
        return (
          <View style={surveyStyle.items}>
            <TouchableComponent name='Front End' stateField='frontEnd' stateFieldStatus={this.state.frontEnd} onChange={this.handleFieldChange} />
            <TouchableComponent name='Back End' stateField='backEnd' stateFieldStatus={this.state.backEnd} onChange={this.handleFieldChange} />
          </View>
        );
      }
    }

    showCompany(val) {
      if (val) {
        return (
          <View style={surveyStyle.items}>
            <TouchableComponent name='Small' stateField='small' stateFieldStatus={this.state.small} onChange={this.handleFieldChange} />
            <TouchableComponent name='Medium' stateField='medium' stateFieldStatus={this.state.medium} onChange={this.handleFieldChange} />
            <TouchableComponent name='Large' stateField='large' stateFieldStatus={this.state.large} onChange={this.handleFieldChange} />
            <TouchableComponent name='Meritocratic' stateField='meritocratic' stateFieldStatus={this.state.meritocratic} onChange={this.handleFieldChange} />
            <TouchableComponent name='Nurturing' stateField='nurturing' stateFieldStatus={this.state.nurturing} onChange={this.handleFieldChange} />
            <TouchableComponent name='Fratty' stateField='fratty' stateFieldStatus={this.state.fratty} onChange={this.handleFieldChange} />
            <TouchableComponent name='Fast-Paced' stateField='fast' stateFieldStatus={this.state.fast} onChange={this.handleFieldChange} />
            <TouchableComponent name='Organized' stateField='organized' stateFieldStatus={this.state.organized} onChange={this.handleFieldChange} />
            <TouchableComponent name='Stable' stateField='stable' stateFieldStatus={this.state.stable} onChange={this.handleFieldChange} />
            <TouchableComponent name='Formal' stateField='formal' stateFieldStatus={this.state.formal} onChange={this.handleFieldChange} />
            <TouchableComponent name='Relaxed' stateField='relaxed' stateFieldStatus={this.state.relaxed} onChange={this.handleFieldChange} />
          </View>
        )
      }
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
    var headerText = [fonts.minorHeading, colors.deepPurple, surveyStyle.csComponentHeader]


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


        <View style={{ alignItems: 'center', width: '100%', marginTop: 10, marginBottom: 10 }}>
          <SurveyHeaderComponent text="Now, tell us what your interests are in computer science" header="CompSci Interests" />
        </View>

        <View>
          <Text style={headerText}>CS Strengths?</Text>
          <TouchableOpacity
            onPress={this.toggleSkills}
          >
            <Image
              source={require('./../assets/icons/arrownext.png')}
            />
          </TouchableOpacity>
          <View>
            {this.state.showSkills ? this.showSkills(true) : this.showSkills(false)}
          </View>
        </View>

        <View>
          <Text style={headerText}>CS Preferences</Text>
          <TouchableOpacity
            onPress={this.togglePreferences}>
            <Image
              source={require('./../assets/icons/arrownext.png')}
            />
          </TouchableOpacity>
          <View>
            {this.state.showPreferences ? this.showPreferences(true) : this.showPreferences(false)}
          </View>
        </View>

        <View>
          <Text style={headerText}>Company Preferences</Text>
          <TouchableOpacity
            onPress={this.toggleCompany}>
            <Image
              source={require('./../assets/icons/arrownext.png')}
            />
          </TouchableOpacity>
          <View>
            {this.state.showCompany ? this.showCompany(true) : this.showCompany(false)}
          </View>
        </View>


        <TouchableOpacity
            onPress={this.opacityOnPress}>
            <Text>go back</Text>
        </TouchableOpacity>
      </ScrollView>



    );
  }
}

export default EditProfile;
