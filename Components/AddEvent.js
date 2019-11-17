import React, { Component } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
} from 'react-native';
import { StackActions } from 'react-navigation'
import { connect } from 'react-redux';
import { addEvent } from '../actions';


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

  addEvent(){
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
    else{
      this.props.addEvent({title: this.state.title, date: this.state.date, time: this.state.time, location: this.state.location, description: this.state.description});
      const popAction = StackActions.pop({
        n:1,
      });
      this.props.navigation.dispatch(popAction);
    }
  }

  render() {
    return (
      <View>
        <TextInput placeholder="Enter Your Title" onChangeText={this.titleInput} autoCapitalize='none' clearButtonMode='while-editing'/>
        <TextInput placeholder="Enter Your Date (MM/DD/YY)" onChangeText={this.dateInput} autoCapitalize='none' clearButtonMode='while-editing'/>
        <TextInput placeholder="Enter Your Time (24:00)" onChangeText={this.timeInput} autoCapitalize='none' clearButtonMode='while-editing'/>
        <TextInput placeholder="Enter Your Location" onChangeText={this.locationInput} autoCapitalize='none' clearButtonMode='while-editing'/>
        <TextInput placeholder="Enter Your Description" onChangeText={this.descriptionInput} autoCapitalize='none' clearButtonMode='while-editing'/>
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
