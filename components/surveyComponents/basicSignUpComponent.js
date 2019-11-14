import React from 'react';
import { Image, Text, View, Button, Alert, ScrollView, TouchableOpacity } from 'react-native';
import TextField from 'react-native-text-field';
import colors, { fonts, buttons } from '../../assets/styles/basicStyle';
import surveyStyle from '../../assets/styles/surveyStyle';
import TouchableComponent from './touchableComponent';
import SurveyHeaderComponent from './surveyHeaderComponent';
import { signUpUser } from '../../actions/index'
import { connect } from 'react-redux';

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
    var placeholderStyle = [fonts.bodyText, colors.lightGrey]
    var textInputStyle = [colors.black, fonts.bodyText]
    var textFieldStyle = surveyStyle.textField
    var headerText = [fonts.minorHeading, colors.deepPurple, surveyStyle.csComponentHeader]
    return (<TextField
      textFieldStyle={textFieldStyle}
      placeholderStyle={{ placeholderStyle }}
      textInputStyle={{ textInputStyle }}
      placeholder="High School"
      onInputChange={this.highSchoolInput}
      clearButtonMode='while-editing'
      keyboardType='default'
    />)

  }

  renderCollege() {
    var placeholderStyle = [fonts.bodyText, colors.lightGrey]
    var textInputStyle = [colors.black, fonts.bodyText]
    var textFieldStyle = surveyStyle.textField
    var headerText = [fonts.minorHeading, colors.deepPurple, surveyStyle.csComponentHeader]
    return (<View>
      <TextField
        textFieldStyle={textFieldStyle}
        placeholderStyle={{ placeholderStyle }}
        textInputStyle={{ textInputStyle }}
        placeholder="High School Name"
        onInputChange={this.highSchoolInput}
        clearButtonMode='while-editing'
        keyboardType='default'
      />
      <TextField
        textFieldStyle={textFieldStyle}
        placeholderStyle={{ placeholderStyle }}
        textInputStyle={{ textInputStyle }}
        placeholder="College"
        onInputChange={this.collegeInput}
        clearButtonMode='while-editing'
        keyboardType='default'
      />
      <TextField
        textFieldStyle={textFieldStyle}
        placeholderStyle={{ placeholderStyle }}
        textInputStyle={{ textInputStyle }}
        placeholder="Graduation Year"
        onInputChange={this.gradYearInput}
        clearButtonMode='while-editing'
        keyboardType='default'
      />
      <TextField
        textFieldStyle={textFieldStyle}
        placeholderStyle={{ placeholderStyle }}
        textInputStyle={{ textInputStyle }}
        placeholder="Current/Most Recent Job/Internship"
        onInputChange={this.currentJobInput}
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
    var placeholderStyle = [fonts.bodyText, colors.lightGrey]
    var textInputStyle = [colors.black, fonts.bodyText]
    var textFieldStyle = surveyStyle.textField
    var headerText = [fonts.minorHeading, colors.deepPurple, surveyStyle.csComponentHeader]
    return (
      <ScrollView style={surveyStyle.surveyBackground}>
        <View style={{ alignItems: 'center', width: '100%', marginTop: 10, marginBottom: 10 }}>
          <SurveyHeaderComponent text="Lets sign you up for an account!" header="Basic Information" />
        </View>
        <TextField
          textFieldStyle={textFieldStyle}
          placeholderStyle={{ placeholderStyle }}
          textInputStyle={{ textInputStyle }}
          invalidTextFieldStyle={{ borderColor: colors.red.color }}
          placeholder="First Name"
          onInputChange={this.firstNameInput}
          clearButtonMode='while-editing'
          keyboardType='default'
        />
        <TextField
          textFieldStyle={textFieldStyle}
          placeholderStyle={{ placeholderStyle }}
          textInputStyle={{ textInputStyle }}
          invalidTextFieldStyle={{ borderColor: colors.red.color }}
          placeholder="Last Name"
          onInputChange={this.lastNameInput}
          clearButtonMode='while-editing'
        />
        <TextField
          textFieldStyle={textFieldStyle}
          placeholderStyle={{ placeholderStyle }}
          textInputStyle={{ textInputStyle }}
          onInputChange={(input) => this.onAgeChange(input)}
          placeholder="Age"
          onInputChange={this.ageInput}
          clearButtonMode='while-editing'
          keyboardType='phone-pad'
        />
        <TextField
          textFieldStyle={textFieldStyle}
          placeholderStyle={{ placeholderStyle }}
          textInputStyle={{ textInputStyle }}
          invalidTextFieldStyle={{ borderColor: colors.red.color }}
          placeholder="Email"
          onInputChange={this.emailInput}
          clearButtonMode='while-editing'
          keyboardType='email-address'
        />
        <TextField
          textFieldStyle={textFieldStyle}
          placeholderStyle={{ placeholderStyle }}
          textInputStyle={{ textInputStyle }}
          invalidTextFieldStyle={{ borderColor: colors.red.color }}
          placeholder="Username"
          onInputChange={this.usernameInput}
          clearButtonMode='while-editing'
        />
        <TextField
          textFieldStyle={textFieldStyle}
          placeholderStyle={{ placeholderStyle }}
          textInputStyle={{ textInputStyle }}
          invalidTextFieldStyle={{ borderColor: colors.red.color }}
          placeholder="Password"
          isSecured={true}
          onInputChange={this.passwordInput}
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

export default connect(mapStateToProps, { signUpUser })(BasicSignUpComponent);
