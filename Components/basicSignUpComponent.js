import React from 'react';
import { Image, Text, View, Button, Alert, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import TextField from 'react-native-text-field';
import colors, { fonts, buttons } from '../assets/styles/basicStyle';
import surveyStyle from '../assets/styles/surveyStyle';
import TouchableComponent from './touchableComponent';
import SurveyHeaderComponent from './surveyHeaderComponent';
import { signUpUser } from '../actions/index'
import { connect } from 'react-redux';
import {Keyboard} from 'react-native';

class BasicSignUpComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      username: '',
      password: '',
      highSchool: '',
      collegeName: '',
      gradYear: '',
      currentJob: '',
      age: 0,
      hs: false,
      college: false,
      pg: false,
    }
    this.handleFieldChange = this.handleFieldChange.bind(this);
  }

  sumbitUser = () => {
    const fields = {
      email: this.state.email,
      username: this.state.username,
      password: this.state.password,
    }

    const otherAnswers = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      highSchool: this.state.highSchool,
      collegeName: this.state.collegeName,
      gradYear: this.state.gradYear,
      currentJob: this.state.currentJob,
      age: this.state.age,
      hs: this.state.hs,
      college: this.state.college,
      pg: this.state.pg,
    }

    this.props.signUpUser(fields, this.props.navigation, otherAnswers);

  }

  firstNameInput = (text) => {
    this.setState({ firstName: text });
  }

  lastNameInput = (text) => {
    this.setState({ lastName: text });
  }

  emailInput = (text) => {
    this.setState({ email: text });
  }

  usernameInput = (text) => {
    this.setState({ username: text });
  }

  passwordInput = (text) => {
    this.setState({ password: text });
  }

  ageInput = (text) => {
    this.setState({ age: text });
  }

  handleFieldChange(fieldId, value) {
    this.setState({ [fieldId]: value });
    console.log('field id is ' + fieldId);
    if (fieldId === 'hs' && value === true) {
      console.log('in for lop');
      this.setState({ pg: false });
      this.setState({ college: false });
    }
    else if (fieldId === 'pg' && value) {
      this.setState({ hs: false });
      this.setState({ college: false });
    }
    else if (fieldId === 'college' && value) {
      this.setState({ pg: false });
      this.setState({ hs: false });
    }
  }

  highSchoolInput = (text) => {
    this.setState({ highSchool: text });
  }

  collegeInput = (text) => {
    this.setState({ collegeName: text });
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
    if (this.state.firstName === '' || this.state.lastName === '' || this.state.email === '' || this.state.username === '' || this.state.password === '') {
      //https://facebook.github.io/react-native/docs/alert
      Alert.alert(
        'Please Fill Out All Fields to Continue',
        '',
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'OK' },
        ],
        { cancelable: true }
      );
    }
    else {
      var basicInfo = {
        'firstname': this.state.firstName,
        'lastname': this.state.lastName,
        'email': this.state.email,
        'username': this.state.username,
        'password': this.state.password,
        'age': this.state.age,
        'hs': this.state.hs,
        'college': this.state.college,
        'pg': this.state.pg,
        'highSchool': this.state.highSchool,
        'college': this.state.college,
        'gradYear': this.state.gradYear,
        'currentJob': this.state.currentJob,
      }
      this.props.navigation.navigate('CsInfo', { basicInfo: basicInfo });
    }

  }

  renderHS() {
    var textFieldStyle = [surveyStyle.textField, fonts.bodyText]
    var headerText = [fonts.minorHeading, colors.deepPurple, surveyStyle.csComponentHeader]
    return (<TextInput
      style={textFieldStyle}
      placeholder="High School"
      onChangeText={this.highSchoolInput}
      clearButtonMode='while-editing'
      keyboardType='default'
    />)

  }

  renderCollege() {
    var textFieldStyle = [surveyStyle.textField, fonts.bodyText]
    var headerText = [fonts.minorHeading, colors.deepPurple, surveyStyle.csComponentHeader]
    return (<View>
      <TextInput
        style={textFieldStyle}
        placeholder="High School Name"
        onChangeText={this.highSchoolInput}
        clearButtonMode='while-editing'
        keyboardType='default'
      />
      <TextInput
        style={textFieldStyle}
        placeholder="College"
        onChangeText={this.collegeInput}
        clearButtonMode='while-editing'
        keyboardType='default'
      />
      <TextInput
        style={textFieldStyle}
        placeholder="Graduation Year"
        onChangeText={this.gradYearInput}
        clearButtonMode='while-editing'
        keyboardType='default'
      />
      <TextInput
        style={textFieldStyle}
        placeholder="Current/Most Recent Job/Internship"
        onChangeText={this.currentJobInput}
        clearButtonMode='while-editing'
        keyboardType='default'
      />
    </View>
    );
  }

  renderNull() {
    return <View></View>
  }

  //need to check unique from here
  render() {
    var textFieldStyle = [surveyStyle.textField, fonts.bodyText]
    var headerText = [fonts.minorHeading, colors.deepPurple, surveyStyle.csComponentHeader]
    return (
      <ScrollView style={surveyStyle.surveyBackground}scrollEnabled={false} contentContainerStyle={{flex: 1}}>
        <View style={{ alignItems: 'center', width: '100%', marginTop: 10, marginBottom: 10 }}>
          <SurveyHeaderComponent text="Lets sign you up for an account!" header="Basic Information" />
        </View>
        <TextInput
          style={textFieldStyle}
          invalidTextFieldStyle={{ borderColor: colors.red.color }}
          placeholder="First Name"
          onChangeText={this.firstNameInput}
          clearButtonMode='while-editing'
          keyboardType='default'
        />
        <TextInput
          style={textFieldStyle}
          invalidTextFieldStyle={{ borderColor: colors.red.color }}
          placeholder="Last Name"
          onChangeText={this.lastNameInput}
          clearButtonMode='while-editing'
          keyboardType='default'
        />
        <TextInput
          style={textFieldStyle}
          onInputChange={(input) => this.onAgeChange(input)}
          placeholder="Age"
          onChangeText={this.ageInput}
          clearButtonMode='while-editing'
          keyboardType='phone-pad'
        />
        <TextInput
          style={textFieldStyle}
          invalidTextFieldStyle={{ borderColor: colors.red.color }}
          placeholder="Email"
          onChangeText={this.emailInput}
          clearButtonMode='while-editing'
          keyboardType='email-address'
        />
        <TextInput
          style={textFieldStyle}
          invalidTextFieldStyle={{ borderColor: colors.red.color }}
          placeholder="Username"
          onChangeText={this.usernameInput}
          clearButtonMode='while-editing'
        />
        <TextInput
          style={textFieldStyle}
          invalidTextFieldStyle={{ borderColor: colors.red.color }}
          placeholder="Password"
          secureTextEntry={true}
          onChangeText={this.passwordInput}
          clearButtonMode='while-editing'
          secureTextEntry={true}
        />

        <View>
          <Text style={headerText}>Stage of Life?</Text>
          <View style={{
            flexDirection: 'row',
            flexWrap: 'no-wrap',
            justifyContent: 'flex-start'
          }}>
            <TouchableComponent name='High School' stateField='hs' stateFieldStatus={this.state.hs} onChange={this.handleFieldChange} />
            <TouchableComponent name='College' stateField='college' stateFieldStatus={this.state.college} onChange={this.handleFieldChange} />
            <TouchableComponent name='Post Grad' stateField='pg' stateFieldStatus={this.state.pg} onChange={this.handleFieldChange} />
          </View>
        </View>
        {this.state.hs === true ? this.renderHS() : (this.state.college || this.state.pg === true ? this.renderCollege() : this.renderNull())}
        <View style={buttons.arrowView}>
          <TouchableOpacity
            onPress={this.sumbitUser}
            inputs={this.state}>
            <Image
              source={require('./../assets/icons/arrownext.png')}
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

export default connect(mapStateToProps, { signUpUser })(BasicSignUpComponent);
