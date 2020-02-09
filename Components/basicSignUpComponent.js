import React from 'react';
import { Image, Text, View, Button, Alert, ScrollView, TouchableOpacity, TextInput, KeyboardAvoidingView } from 'react-native';
import TextField from 'react-native-text-field';
import colors, { fonts, buttons, fontEffects } from '../assets/styles/basicStyle';
import surveyStyle from '../assets/styles/surveyStyle';
import TouchableComponent from './touchableComponent';
import SurveyHeaderComponent from './surveyHeaderComponent';
import { signUpUser, resetErrors } from '../actions/index'
import { connect } from 'react-redux';
import ErrorModal from './ErrorModal'
import Geocoder from 'react-native-geocoding';

class BasicSignUpComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      username: '',
      password: '',
      location: '',
      highSchool: '',
      collegeName: '',
      gradYear: '',
      currentJob: '',
      age: 0,
      hs: false,
      college: true,
      pg: false,

      latitude: 0,
      longitude: 0,

      showModal: false,
      modalMessage: '',
    }
    this.handleFieldChange = this.handleFieldChange.bind(this);
  }

  componentWillUnmount() {
    this.props.resetErrors();
  }


  sumbitUser = () => {

    if (this.state.firstName === '' || this.state.lastName === '' || this.state.email === '' || this.state.username === '' || this.state.password === '') {
      this.setState({showModal: true, modalMessage: 'Please fill out the entire form.'});
    }
    else {
      const fields = {
        email: this.state.email,
        username: this.state.username,
        password: this.state.password,
      }

      Geocoder.init("AIzaSyBNKSL1ZVMGeaV41ObQ92nsfPbdszR2zTY"); // use a valid API key

      Geocoder.from(this.state.location)
          .then(json => {
            var location = json.results[0].geometry.location;
            // this.setState({latitude: location.lat, longitude: location.lng})

            const otherAnswers = {
              firstName: this.state.firstName,
              lastName: this.state.lastName,
              location: this.state.location,
              highSchool: this.state.highSchool,
              collegeName: this.state.collegeName,
              gradYear: this.state.gradYear,
              currentJob: this.state.currentJob,
              age: this.state.age,
              hs: this.state.hs,
              college: this.state.college,
              pg: this.state.pg,
              latitude: location.lat,
              longitude: location.lng,
            }

            this.props.signUpUser(fields, this.props.navigation, otherAnswers);

          })
          .catch((error) =>  {
              console.log(error);
              this.setState({showModal: true, modalMessage: 'Please input a valid location.'});
            }
          );

    }
  }

  firstNameInput = (text) => {
    this.setState({ firstName: text });
  }

  lastNameInput = (text) => {
    this.setState({ lastName: text });
  }

  locationInput = (text) => {
    this.setState({ location: text });
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
    if (fieldId === 'hs' && value === true) {
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

  renderModal = () => {
    if (this.state.showModal) {
      return (
        <ErrorModal errorMessage={this.state.modalMessage} reset={this.resetModal} />
      );
    }
  }

  resetModal = () => {
    this.setState({ showModal: false, modalMessage: "" });
  }

  renderHS() {
    var textFieldStyle = [surveyStyle.textField, fonts.bodyText]
    var headerText = [fonts.minorHeading, colors.deepPurple, surveyStyle.csComponentHeader]
    return (
      <TextInput
        style={textFieldStyle}
        placeholder="High School"
        onChangeText={this.highSchoolInput}
        clearButtonMode='while-editing'
        keyboardType='default'
      />
    )
  }

  renderCollege() {
    var textFieldStyle = [surveyStyle.textField, fonts.bodyText]
    var headerText = [fonts.minorHeading, colors.deepPurple, surveyStyle.csComponentHeader]
    return (
      <View>
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

  renderError = () => {
    if(this.props.error !== null) {
      return (
        <Text style={[fonts.bodyText, colors.red, fontEffects.center]}>{this.props.error}</Text>
      )
    }
  }

  //need to check unique from here
  render() {
    var textFieldStyle = [surveyStyle.signInUpTextField, fonts.bodyText]
    var headerText = [fonts.minorHeading, colors.deepPurple, surveyStyle.csComponentHeader]
    return (
      <KeyboardAvoidingView behavior="padding" enabled>
        <ScrollView style={surveyStyle.surveyBackground}>
          <View style={{ alignItems: 'center', width: '100%', marginTop: 10, marginBottom: 10 }}>
            <SurveyHeaderComponent text="Lets sign you up for an account!" header="Basic Information" />
            {this.renderModal()}
            {this.renderError()}
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
          />
          <TextInput
            style={textFieldStyle}
            invalidTextFieldStyle={{ borderColor: colors.red.color }}
            placeholder="Location (City, State)"
            onChangeText={this.locationInput}
            clearButtonMode='while-editing'
          />
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
          <View>
            <View style={{
              flexDirection: 'row',
              flexWrap: 'no-wrap',
              justifyContent: 'flex-start'
            }}>
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
      </KeyboardAvoidingView>
    );
  }
}

const mapStateToProps = reduxState => (
  {
    error: reduxState.error,
    username: reduxState.auth.username,
  }
);

export default connect(mapStateToProps, { signUpUser, resetErrors })(BasicSignUpComponent);
