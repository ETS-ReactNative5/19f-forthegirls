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
        <Text style={[fonts.majorHeading, surveyStyle.surveyHeaderText]}> {this.props.header} </Text>
        <Text style={[fonts.bodyText, colors.deepPurple, { textAlign: 'center' }]}> {this.props.text} </Text>
      </View>
    );
  }
}

export default SurveyHeaderComponent;
