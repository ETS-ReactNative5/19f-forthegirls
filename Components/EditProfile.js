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
    this.state = {   };
  }
  opacityOnPress = () => {
    this.props.navigation.navigate('Home', { })
  }
  render() {
    return (
     <View>
      <Text> edit me :) </Text>
      <TouchableOpacity
          onPress={this.opacityOnPress}>
          <Text>go back</Text>
      </TouchableOpacity>
     </View>
    );
  }
}

export default EditProfile;
