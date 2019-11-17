import React, { Component } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
} from 'react-native';
import { connect } from 'react-redux';
import { addEvent } from '../actions';
import colors, { fonts, buttons } from '../assets/styles/basicStyle';
import surveyStyle from '../assets/styles/surveyStyle';

class AddEvent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      date: '',
      time: '',
      location: '',
      description: '',
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

  addEvent() {
    console.log(this.props.navigation);
    this.props.addEvent({
      title: this.state.title,
      date: this.state.date,
      time: this.state.time,
      location: this.state.location,
      description: this.state.description
    });
    this.props.navigation.pop();
  }

  render() {
    var textFieldStyle = [surveyStyle.textField, fonts.bodyText]
    return (
      <View>
        <TextInput
          style={textFieldStyle}
          keyboardType='default'
          placeholder="Event Title"
          onChangeText={this.titleInput}
          autoCapitalize='none'
          clearButtonMode='while-editing' />
        <TextInput
          style={textFieldStyle}
          placeholder="Event Date"
          keyboardType='default'
          onChangeText={this.dateInput}
          autoCapitalize='none'
          clearButtonMode='while-editing' />
        <TextInput
          style={textFieldStyle}
          placeholder="Event Time"
          keyboardType='default'
          onChangeText={this.timeInput}
          autoCapitalize='none'
          clearButtonMode='while-editing' />
        <TextInput
          style={textFieldStyle}
          placeholder="Event Location"
          keyboardType='default'
          onChangeText={this.locationInput}
          autoCapitalize='none'
          clearButtonMode='while-editing' />
        <TextInput
          style={textFieldStyle}
          placeholder="Event Description"
          keyboardType='default'
          onChangeText={this.descriptionInput}
          autoCapitalize='none'
          clearButtonMode='while-editing'
          multiline={true} />
        <Button title="Submit" onPress={this.addEvent} />
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
