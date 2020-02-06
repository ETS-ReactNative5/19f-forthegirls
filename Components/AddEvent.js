import React, { Component } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  Keyboard
} from 'react-native';
import { StackActions } from 'react-navigation'
import { connect } from 'react-redux';
import { addEvent } from '../actions';
import colors, { fonts, fontEffects, buttons } from '../assets/styles/basicStyle';
import surveyStyle from '../assets/styles/surveyStyle';
import Geocoder from 'react-native-geocoding';
import ErrorModal from './ErrorModal';
import { uploadImage } from '../s3';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';

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
      eventPhotoURL: '',

      image: this.props.image,
      imagefull: null,

      showModal: false,
      modalMessage: '',
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

  async componentWillMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if (status !== 'granted') {
      console.log('Please enable camera');
    }
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

  photoUpload = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      base64: true,
    });
    if (!result.cancelled) {
      this.setState({ image: result.uri, imagefull: result });
    }
  };

  addEvent = () => {
    if (this.state.title === '' || this.state.description === '' || this.state.date === '' || this.state.time === '' || this.state.location === '') {
      this.setState({ showModal: true, modalMessage: 'Please fill out the entire form.' });
    }

    Geocoder.init("AIzaSyBNKSL1ZVMGeaV41ObQ92nsfPbdszR2zTY"); // use a valid API key
    Geocoder.from(this.state.location)
      .then(json => {
        var location = json.results[0].geometry.location;
        this.setState({ latitude: location.lat, longitude: location.lng })

        // this.props.addEvent({
        //   title: this.state.title,
        //   date: this.state.date,
        //   time: this.state.time,
        //   location: this.state.location,
        //   description: this.state.description,
        //   latitude: this.state.latitude,
        //   longitude: this.state.longitude,
        //   eventPhotoURL: photoURL
        // });
        const popAction = StackActions.pop({
          n: 1,
        });
        this.props.navigation.dispatch(popAction);
      })
      .catch((error) => {
        console.log(error);
        this.setState({ showModal: true, modalMessage: 'Please input a valid location.' });
      }
      );

    if (this.state.imagefull != null) {
      console.log('image full state not null');
      let i = this.state.imagefull.uri.length;
      while (this.state.imagefull.uri.charAt(i) !== '/') {
        i--;
      }
      this.state.imagefull.name = this.state.imagefull.uri.substring(i + 1);
      uploadImage(this.state.imagefull).then((url) => {
        this.setState({ eventPhotoURL: String(url) })
        this.setState({ imagefull: null })

        this.props.addEvent({
          title: this.state.title,
          date: this.state.date,
          time: this.state.time,
          location: this.state.location,
          description: this.state.description,
          latitude: this.state.latitude,
          longitude: this.state.longitude,
          eventPhotoURL: this.state.eventPhotoURL,
          authorID: this.props.id,
        });

        console.log('event photo url state in upload image : ');
        console.log(`${this.state.eventPhotoURL}`);

      })
    } else {
      console.log('image full state ISSSSS null');
      this.props.addEvent({
        title: this.state.title,
        date: this.state.date,
        time: this.state.time,
        location: this.state.location,
        description: this.state.description,
        latitude: this.state.latitude,
        longitude: this.state.longitude,
        eventPhotoURL: this.state.photoURL,
        authorID: this.props.id,
      });
    }

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

  render() {
    var imageNoImage = <Image source={require('../img/EventBackground.jpg')} />
    var imageImage = <Image source={{ uri: this.state.eventPhotoURL }} />

    var image;

    if (this.state.imagefull != null) {
      image = <Image source={{ uri: this.state.imagefull.uri }} style={{ width: 100, height: 100 }} />
    }
    else if (this.state.eventPhotoURL != "" && this.state.eventPhotoURL != null) {
      image = imageImage;
    }
    else {
      image = imageNoImage;
    }

    var textFieldStyle = [fonts.bodyText]
    return (
      <ScrollView contentContainerStyle={{ backgroundColor: colors.white.color }}>
        {this.renderModal()}
        <TouchableOpacity onPress={this.photoUpload}>
          <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 10, marginBottom: 10 }}>
            {image}
            <Text style={[colors.turquoise, fonts.minorHeading]}>Change Event Photo</Text>
          </View>
        </TouchableOpacity>
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
            multiline={true}
            onSubmitEditing={() => { Keyboard.dismiss() }} />
        </View>
        <View style={{ justifyContent: 'flex-end' }}>
          <TouchableOpacity
            onPress={this.addEvent}>
            <View style={[buttons.logInOutButton, buttons.logInButton]}><Text style={[fonts.minorHeading, colors.white]}>Submit</Text></View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }
}

const mapStateToProps = reduxState => (
  {
    username: reduxState.user.username,
    id: reduxState.auth.id,
    email: reduxState.user.email,
    matches: reduxState.user.matches,
  }
);

export default connect(mapStateToProps, { addEvent })(AddEvent);
