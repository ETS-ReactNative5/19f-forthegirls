import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, Alert } from 'react-native';
import { Dropdown } from 'react-native-material-dropdown';
import TextField from 'react-native-text-field';
import colors, { fonts, fontEffects, buttons } from '../../assets/styles/basicStyle';
import surveyStyle from '../../assets/styles/surveyStyle';

class EducationComponent extends React.Component {
  constructor(props) {

    super(props);
    this.state = {
      highSchool: '',
      college: '',
      gradYear: '',
      currentJob: '',
    }
  }

  highSchoolInput = (text) => {
    this.setState({ highSchool: text });
  }

  collegeInput = (text) => {
    this.setState({ college: text });
  }

  gradYearInput = (text) => {
    this.setState({ gradYear: text });
  }

  currentJobInput = (text) => {
    this.setState({ currentJob: text });
  }

  checkState = () => {
    console.log(this.state);
  }


  submitPage = () => {
    var eduInfo = {
      'highSchool': this.state.highSchool,
      'college': this.state.college,
      'gradYear': this.state.gradYear,
      'currentJob': this.state.currentJob,
    }
    var basicInfo = this.props.navigation.getParam("basicInfo", null);
    var demoInfo = this.props.navigation.getParam("demoInfo", null);
    var csInfo = this.props.navigation.getParam("csInfo", null);


    // if (this.state.highSchool === '' || this.state.college === '' || this.state.gradYear === '' || this.state.currentJob === '') {
    //   Alert.alert(
    //     'Please Fill Out All Fields to Continue',
    //     '',
    //     [
    //       { text: 'Cancel', style: 'cancel' },
    //       { text: 'OK' },
    //     ],
    //     { cancelable: true }
    //   );
    // }
    // else {
    this.props.navigation.navigate('Header', { pastPage: "eduInfo", basicInfo: basicInfo, demoInfo: demoInfo, csInfo: csInfo, eduInfo: eduInfo });
    //}

  }

  render() {
    const year = (new Date()).getFullYear();
    const years = Array.from(new Array(20), (val, index) => index + year);
    const data = { value: years }

    var placeholderStyle = [fonts.bodyText, colors.lightGrey]
    var textInputStyle = [colors.black, fonts.bodyText]
    var textFieldStyle = surveyStyle.textField
    return (
      <View style={surveyStyle.surveyBackground}>
        <Text style={[fonts.majorHeading, fontEffects.center]}>Tell us a little more about your education and job experience!</Text>

        <View style={buttons.arrowView}>
          <TouchableOpacity
            onPress={this.submitPage}
            input={this.state}>
            <Image
              source={require('./../../assets/icons/arrownext.png')}
            />
          </TouchableOpacity>
        </View>
      </ View>
    );
  }
}

export default EducationComponent;
