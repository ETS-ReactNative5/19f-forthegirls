import React, { Component } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
} from 'react-native';
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
    this.props.addEvent({title: this.state.title, date: this.state.date, time: this.state.time, location: this.state.location, description: this.state.description});
  }

  render() {
    return (
      <View>
        <TextInput defaultValue="Enter Your Title" onChangeText={this.titleInput} autoCapitalize='none' clearButtonMode='while-editing'/>
        <TextInput defaultValue="Enter Your Date" onChangeText={this.dateInput} autoCapitalize='none' clearButtonMode='while-editing'/>
        <TextInput defaultValue="Enter Your Time" onChangeText={this.timeInput} autoCapitalize='none' clearButtonMode='while-editing'/>
        <TextInput defaultValue="Enter Your Location" onChangeText={this.locationInput} autoCapitalize='none' clearButtonMode='while-editing'/>
        <TextInput defaultValue="Enter Your Description" onChangeText={this.descriptionInput} autoCapitalize='none' clearButtonMode='while-editing'/>
        <Text>
          This is the adding page!
        </Text>
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
