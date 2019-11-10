import React from 'react';
import { StyleSheet, Text, View, Button, Alert } from 'react-native';
import { Dropdown } from 'react-native-material-dropdown';
import TextField from 'react-native-text-field';


class EducationComponent extends React.Component {
  constructor(props) {

    super(props);
    this.state = {
      highSchool: '',
      college: '',
      gradYear: '',
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

  checkState = () => {
    console.log(this.state);
  }


  submitPage = () => {

    if(this.state.highSchool === '' || this.state.college === '' || this.state.gradYear === '') {
      Alert.alert(
        'Please Fill Out All Fields to Continue',
        '',
        [
          {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ],
        { cancelable: true }
      );
    }
    else {
      this.props.navigation.navigate('Header', {pastPage: "eduInfo"});
    }
    
  }

  render() {
    const year = (new Date()).getFullYear();
    const years = Array.from(new Array(20),( val, index) => index + year);
    const data = {value: years}
    return (
      <View style={{marginTop: 100}}>
        <Text> Let's learn a little more about your education and job experience! </Text>
        <TextField
          title="High School"
          placeholder="High School"
          onInputChange={this.highSchoolInput}
          clearButtonMode='while-editing'
          keyboardType='default'
        />
        <TextField
          title="College"
          placeholder="College"
          onInputChange={this.collegeInput}
          clearButtonMode='while-editing'
          keyboardType='default'
        />
        <TextField
          title="Grad Year"
          placeholder="Graduation Year"
          onInputChange={this.gradYearInput}
          clearButtonMode='while-editing'
          keyboardType='default'
        />
        <Button
          title="Next"
          input={this.state}
          onPress={this.submitPage}
          />
      </View>
    );
  }
}

export default EducationComponent;
