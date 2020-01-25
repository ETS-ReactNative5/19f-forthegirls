import React, { Component } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { StackActions } from 'react-navigation'
import { connect } from 'react-redux';
import { addEvent } from '../actions';
import colors, { fonts, fontEffects, buttons } from '../assets/styles/basicStyle';
import surveyStyle from '../assets/styles/surveyStyle';
import Geocoder from 'react-native-geocoding';

class AddEvent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      date: '',
      time: '',
      location: '',
      description: '',
      latitude: 0,
      longitude: 0,
    };

    this.titleInput = this.titleInput.bind(this);
    this.dateInput = this.dateInput.bind(this);
    this.timeInput = this.timeInput.bind(this);
    this.locationInput = this.locationInput.bind(this);
    this.descriptionInput = this.descriptionInput.bind(this);

    this.addEvent = this.addEvent.bind(this);
  }
  // ---------- componentDidMount here! -----------//
  componentDidMount() {
  }

  titleInput(text) {
    this.setState({ title: text });
  }
  dateInput(text) {
    this.setState({ date: text });
  }
  timeInput(text) {
    this.setState({ time: text });
  }
  locationInput(text) {
    this.setState({ location: text });
  }

  descriptionInput(text) {
    this.setState({ description: text });
  }

  addEvent = () => {
    if (this.state.title === '' || this.state.description === '' || this.state.date === '' || this.state.time === '' || this.state.location === '') {
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

      Geocoder.init("AIzaSyBNKSL1ZVMGeaV41ObQ92nsfPbdszR2zTY"); // use a valid API key
      Geocoder.from(this.state.location)
        .then(json => {
          var location = json.results[0].geometry.location;
          this.setState({latitude: location.lat, longitude: location.lng})

          this.props.addEvent({ title: this.state.title, date: this.state.date, time: this.state.time, location: this.state.location, description: this.state.description, latitude: this.state.latitude, longitude: this.state.longitude });
          const popAction = StackActions.pop({
          n: 1,
          });
          this.props.navigation.dispatch(popAction);
        })
        .catch(error => console.warn(error));

      
    }
  }

  render() {
    var textFieldStyle = [fonts.bodyText]
    return (
      <View style={{ backgroundColor: colors.white.color }}>
        <View style={surveyStyle.textFieldContainer}>
          <TextInput
            style={textFieldStyle}
            keyboardType='default'
            placeholder="Event Title"
            onChangeText={this.titleInput}
            autoCapitalize='none'
            clearButtonMode='while-editing' />
        </View>
        <View style={surveyStyle.textFieldContainer}>
          <TextInput
            style={textFieldStyle}
            placeholder="Event Date (MM/DD/YY)"
            keyboardType='default'
            onChangeText={this.dateInput}
            autoCapitalize='none'
            clearButtonMode='while-editing' />
        </View>
        <View style={surveyStyle.textFieldContainer}>
          <TextInput
            style={textFieldStyle}
            placeholder="Event Time (24:00)"
            keyboardType='default'
            onChangeText={this.timeInput}
            autoCapitalize='none'
            clearButtonMode='while-editing' />
        </View>
        <View style={surveyStyle.textFieldContainer}>
          <TextInput
            style={textFieldStyle}
            placeholder="Event Location"
            keyboardType='default'
            onChangeText={this.locationInput}
            autoCapitalize='none'
            clearButtonMode='while-editing' />
        </View>
        <View style={surveyStyle.textFieldContainer}>
          <TextInput
            style={textFieldStyle}
            placeholder="Event Description"
            keyboardType='default'
            onChangeText={this.descriptionInput}
            autoCapitalize='none'
            clearButtonMode='while-editing'
            multiline={true} />
        </View>
        <View style={{ justifyContent: 'flex-end' }}>
          <TouchableOpacity
            onPress={this.addEvent}>
            <View style={[buttons.logInOutButton, buttons.logInButton]}><Text style={[fonts.minorHeading, colors.white]}>Submit</Text></View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const mapStateToProps = reduxState => (
  {
    username: reduxState.user.username,
    email: reduxState.user.email,
    matches: reduxState.user.matches,
  }
);

export default connect(mapStateToProps, { addEvent })(AddEvent);
