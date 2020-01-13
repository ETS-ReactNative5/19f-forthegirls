import React from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity, Image } from 'react-native';
import colors, { fonts, buttons } from '../assets/styles/basicStyle';
import surveyStyle from '../assets/styles/surveyStyle';

class SurveyHeaderComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={surveyStyle.surveyHeader}>
        <Text style={[fonts.minorHeading, surveyStyle.surveyHeaderText]}>{this.props.header}</Text>
      </View>
    );
  }
}

export default SurveyHeaderComponent;
