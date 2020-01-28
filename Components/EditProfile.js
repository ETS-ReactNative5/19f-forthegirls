import React from 'react';
import { StyleSheet, Text, ScrollView, View, TouchableOpacity, Image, TextInput, Modal, TouchableHighlight } from 'react-native';
import { Dropdown } from 'react-native-material-dropdown';
import TouchableComponent from './touchableComponent';

import TextField from 'react-native-text-field';
import colors, { buttons, fonts, profileImage } from '../assets/styles/basicStyle';
import surveyStyle from '../assets/styles/surveyStyle';
import { singleChat } from '../assets/styles/chatStyle';
import profile from '../assets/styles/profileStyle';
import SliderComponent from './sliderComponent';
import SurveyHeaderComponent from './surveyHeaderComponent'
import { addToSurvey, getUser } from '../actions/index'
import { connect } from 'react-redux';
import ErrorModal from './ErrorModal'
import { uploadImage } from '../s3';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';

class EditProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: this.props.firstName,
      lastName: this.props.lastName,
      location: this.props.location,

      promptOneQuestion: this.props.promptOneQuestion,
      promptOneAnswer: this.props.promptOneAnswer,
      promptTwoQuestion: this.props.promptTwoQuestion,
      promptTwoAnswer: this.props.promptTwoAnswer,
      promptThreeQuestion: this.props.promptThreeQuestion,

      extraversion: this.props.extraversion !== undefined ? this.props.extraversion : 50,
      listening: this.props.listening !== undefined ? this.props.listening : 50,

      frontEnd: this.props.frontEnd,
      backEnd: this.props.backEnd,
      small: this.props.small,
      medium: this.props.medium,
      large: this.props.large,
      meritocratic: this.props.meritocratic,
      nurturing: this.props.nurturing,
      fratty: this.props.fratty,
      fast: this.props.fast,
      organized: this.props.organized,
      stable: this.props.stable,
      formal: this.props.formal,
      relaxed: this.props.relaxed,
      web: this.props.web,
      user: this.props.user,
      design: this.props.design,
      mobile: this.props.mobile,
      security: this.props.security,
      algorithms: this.props.algorithms,
      storage: this.props.storage,
      profileURL: this.props.profileURL,

      // showing and hiding
      showSkills: false,
      showPreferences: false,
      showCompany: false,

      image: this.props.image,
      imagefull: null,
      showModal: false,
      modalMessage: '',
    };
    this.handleSliderChange = this.handleSliderChange.bind(this);
    this.handleFieldChange = this.handleFieldChange.bind(this);
    this.toggleSkills = this.toggleSkills.bind(this);
    this.togglePreferences = this.togglePreferences.bind(this);
    this.toggleCompany = this.toggleCompany.bind(this);
    this.goBack = this.goBack.bind(this);
  }

  componentDidMount() {
    this.props.getUser(this.props.id);

    console.log(this.props.extraversion);
    console.log(this.props.listening);
  }

  async componentWillMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if (status !== 'granted') {
      console.log('Please enable camera');
    }
  }

  handleFieldChange(fieldId, value) {
    this.setState({ [fieldId]: value });
  }

  photoUpload = async () => {
    console.log("in poto upload")
    const result = await ImagePicker.launchImageLibraryAsync({
      base64: true,
    });
    if (!result.cancelled) {
      this.setState({ image: result.uri, imagefull: result });
      console.log("settig image hehre")
    }
  };

  submitPage = () => {
    // console.log(this.state);
    if (this.state.promptOneQuestion === this.state.promptTwoQuestion || this.state.promptTwoQuestion === this.state.promptThreeQuestion || this.state.promptOneQuestion === this.state.promptThreeQuestion) {
      this.setState({ showModal: !this.state.showModal, modalMessage: "Please fill out different prompts!" });
    }
    else if (this.state.firstName === '' || this.state.lastName === '' || this.state.location === '') {
      this.setState({ showModal: !this.state.showModal, modalMessage: "Please fill out your basic information!" });
    }
    else {
      if (this.state.imagefull != null) {
        console.log("Bellow should work :()")
        //console.log(this.state.imagefull)
        let i = this.state.imagefull.uri.length;
        while (this.state.imagefull.uri.charAt(i) !== '/') {
          i--;
        }
        this.state.imagefull.name = this.state.imagefull.uri.substring(i + 1);
        uploadImage(this.state.imagefull).then((url) => {
          console.log(typeof (url))
          this.setState({ profileURL: String(url) })
          console.log("UTL")
          console.log(this.state.profileURL)
          this.setState({ imagefull: null })
          this.props.addToSurvey(this.state, this.props.username, this.props.navigation, 'Home');

        })
      }
      else {
        console.log("Here again")
        this.props.addToSurvey(this.state, this.props.username, this.props.navigation, 'Home');
      }
    }
  }

  renderModal = () => {
    if (this.state.showModal) {
      return (
        <ErrorModal errorMessage={this.state.modalMessage} reset={this.resetModal} />
      );
    }
  }

  setModalVisable = (value) => {
    this.setState({ showModal: value });
  }

  // submitPage = () => {

  //   console.log(this.state);
  //   //https://facebook.github.io/react-native/docs/modal
  //   //How to use a modal in react native
  //   if (this.promptOneQuestion === this.promptTwoQuestion || this.promptTwoQuestion === this.promptThreeQuestion || this.promptOneQuestion === this.promptThreeQuestion) {
  //     this.setState({ showModal: !this.state.showModal, modalMessage: "Please fill out different prompts!" });
  //   }
  //   if (this.state.firstName === '' || this.state.lastName === '' || this.state.location === '') {
  //     this.setState({ showModal: !this.state.showModal, modalMessage: "Please fill out your basic information!" });
  //   }
  //   else {

  //     this.props.addToSurvey(this.state, this.props.username, this.props.navigation, 'Home');
  //   }

  // }

  resetModal = () => {
    this.setState({ showModal: false, modalMessage: "" });
  }

  firstNameChange = (text) => {
    this.setState({ firstName: text });
  }

  lastNameChange = (text) => {
    this.setState({ lastName: text });
  }

  locationChange = (text) => {
    this.setState({ location: text });
  }

  toggleSkills = () => {
    this.setState({
      showSkills: !this.state.showSkills
    });
  }

  togglePreferences = () => {
    this.setState({
      showPreferences: !this.state.showPreferences
    });
  }

  toggleCompany = () => {
    this.setState({
      showCompany: !this.state.showCompany
    });
  }

  showSkills = (val) => {
    if (val) {
      return (
        <View style={surveyStyle.items} >
          <TouchableComponent name='Web Applications' stateField='web' stateFieldStatus={this.state.web} onChange={this.handleFieldChange} />
          <TouchableComponent name='User Interaction' stateField='user' stateFieldStatus={this.state.user} onChange={this.handleFieldChange} />
          <TouchableComponent name='Design' stateField='design' stateFieldStatus={this.state.design} onChange={this.handleFieldChange} />
          <TouchableComponent name='Mobile Applications' stateField='mobile' stateFieldStatus={this.state.mobile} onChange={this.handleFieldChange} />
          <TouchableComponent name='Security' stateField='security' stateFieldStatus={this.state.security} onChange={this.handleFieldChange} />
          <TouchableComponent name='Algorithms & Math' stateField='algorithms' stateFieldStatus={this.state.algorithms} onChange={this.handleFieldChange} />
          <TouchableComponent name='Storage & Infrastructure' stateField='storage' stateFieldStatus={this.state.storage} onChange={this.handleFieldChange} />
        </View>
      )
    }
  }

  showPreferences = (val) => {
    if (val) {
      return (
        <View style={surveyStyle.items}>
          <TouchableComponent name='Front End' stateField='frontEnd' stateFieldStatus={this.state.frontEnd} onChange={this.handleFieldChange} />
          <TouchableComponent name='Back End' stateField='backEnd' stateFieldStatus={this.state.backEnd} onChange={this.handleFieldChange} />
        </View>
      );
    }
  }

  showCompany = (val) => {
    if (val) {
      return (
        <View style={surveyStyle.items}>
          <TouchableComponent name='Small' stateField='small' stateFieldStatus={this.state.small} onChange={this.handleFieldChange} />
          <TouchableComponent name='Medium' stateField='medium' stateFieldStatus={this.state.medium} onChange={this.handleFieldChange} />
          <TouchableComponent name='Large' stateField='large' stateFieldStatus={this.state.large} onChange={this.handleFieldChange} />
          <TouchableComponent name='Meritocratic' stateField='meritocratic' stateFieldStatus={this.state.meritocratic} onChange={this.handleFieldChange} />
          <TouchableComponent name='Nurturing' stateField='nurturing' stateFieldStatus={this.state.nurturing} onChange={this.handleFieldChange} />
          <TouchableComponent name='Fratty' stateField='fratty' stateFieldStatus={this.state.fratty} onChange={this.handleFieldChange} />
          <TouchableComponent name='Fast-Paced' stateField='fast' stateFieldStatus={this.state.fast} onChange={this.handleFieldChange} />
          <TouchableComponent name='Organized' stateField='organized' stateFieldStatus={this.state.organized} onChange={this.handleFieldChange} />
          <TouchableComponent name='Stable' stateField='stable' stateFieldStatus={this.state.stable} onChange={this.handleFieldChange} />
          <TouchableComponent name='Formal' stateField='formal' stateFieldStatus={this.state.formal} onChange={this.handleFieldChange} />
          <TouchableComponent name='Relaxed' stateField='relaxed' stateFieldStatus={this.state.relaxed} onChange={this.handleFieldChange} />
        </View>
      )
    }
  }

  p1Question = (value) => {
    this.setState({ promptOneQuestion: value });
    console.log("ere")
  }

  p1Answer = (text) => {
    this.setState({ promptOneAnswer: text });
  }

  p2Question = (value) => {
    this.setState({ promptTwoQuestion: value });
  }

  p2Answer = (text) => {
    this.setState({ promptTwoAnswer: text });
  }

  p3Question = (value) => {
    this.setState({ promptThreeQuestion: value });
  }

  p3Answer = (text) => {
    this.setState({ promptThreeAnswer: text });
  }

  handleSliderChange(sliderId, value) {
    this.setState({ [sliderId]: value });
    // console.log(`parent: ${this.state.extraversion}`);
  }

  opacityOnPress = () => {
    this.props.navigation.navigate('Home', {})
  }

  goBack = () => {
    this.props.navigation.pop();
  }

  render() {
    let data = [{
      value: 'Woman in tech inspiration?',
    }, {
      value: 'Favorite app?',
    }, {
      value: 'iOS or android?',
    }, {
      value: 'favorite programming language',
    }, {
      value: 'coffee or tea',
    }, {
      value: 'spaces or tabs',
    }, {
      value: 'what could you give a ted talk on',
    }];


    var textFieldStyle = [surveyStyle.textField, fonts.bodyText]
    var itemTextStyle = [fonts.bodyText]
    var selectedItemColor = colors.turquoise.color
    var headerText = [fonts.minorHeading, colors.deepPurple, surveyStyle.csComponentHeader]
    var skillsHeaderT = { flexDirection: 'row', justifyContent: 'space-between' }


    var imageNoImage = <Image source={require('./../assets/icons/tim.jpg')} style={profileImage.basic} />
    var imageImage = <Image source={{ uri: this.props.profileURL }} style={profileImage.basic} />

    var image;
    if (this.state.imagefull != null) {
      image = <Image source={{ uri: this.state.imagefull.uri }} style={profileImage.basic} />
    }
    else if (this.props.profileURL != "" && this.props.profileURL != null) {
      image = imageImage;
    }
    else {
      image = imageNoImage;
    }

    return (
      <View style={{ backgroundColor: colors.lightGrey.color }}>
        <View style={singleChat.header}>
          <View style={[singleChat.arrowBack]}>
            <TouchableOpacity
              onPress={this.goBack}>
              <Image
                source={require('./../assets/icons/arrowback.png')}
              />
            </TouchableOpacity>
          </View>

          <View style={singleChat.headerTextContainer}>
            <Text style={fonts.minorHeading}>Edit Profile</Text>
          </View>
        </View>

        <ScrollView style={{ backgroundColor: colors.lightGrey.color, margin: 10, marginBottom: 50 }}>
          <View>
            {this.renderModal()}
            <TouchableOpacity onPress={this.photoUpload}>
              <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 10, marginBottom: 10 }}>
                {image}
                <Text style={[colors.turquoise, fonts.minorHeading]}>Change Profile Photo</Text>
              </View>
            </TouchableOpacity>

            <View style={{ alignItems: 'center', width: '100%', marginTop: 3, marginBottom: 3 }}>
              <SurveyHeaderComponent header="Basic Information" />
            </View>
            <View style={surveyStyle.textFieldContainer}>
              <TextInput
                style={textFieldStyle}
                placeholder={'First Name'}
                maxLength={30}
                defaultValue={this.props.firstName || ''}
                onChangeText={this.firstNameChange}
              />
            </View>
            <View style={surveyStyle.textFieldContainer}>
              <TextInput
                style={textFieldStyle}
                placeholder="Last Name"
                maxLength={30}
                defaultValue={this.props.lastName || ''}
                onChangeText={this.lastNameChange}
              />
            </View>
            <View style={surveyStyle.textFieldContainer}>
              <TextInput
                style={textFieldStyle}
                placeholder="Location (City, State)"
                maxLength={30}
                defaultValue={this.props.location || ''}
                onChangeText={this.locationChange}
              />
            </View>
          </View>
          <View style={{ alignItems: 'center', width: '100%' }}>
            <SurveyHeaderComponent header="Answer 3 Prompts!" />
          </View>
          <Dropdown
            itemTextStyle={itemTextStyle}
            selectedItemColor={selectedItemColor}
            label='Question 1'
            data={data}
            value={this.props.promptOneQuestion || 'Question 1'}
            onChangeText={this.p1Question}
          />
          <View>
            <View style={surveyStyle.textFieldContainer}>
              <TextInput
                style={textFieldStyle}
                placeholder="Prompt 1 Answer"
                defaultValue={this.props.promptOneAnswer || ''}
                onChangeText={this.p1Answer}
              />
            </View>
          </View>
          <Dropdown
            itemTextStyle={itemTextStyle}
            selectedItemColor={selectedItemColor}
            label='Question 2'
            value={this.props.promptTwoQuestion || 'Question 2'}
            data={data}
            onChangeText={this.p2Question}
          />
          <View style={surveyStyle.textFieldContainer}>
            <TextInput
              style={textFieldStyle}
              placeholder="Prompt 2 Answer"
              defaultValue={this.props.promptTwoAnswer || ''}
              onChangeText={this.p2Answer}
            />
          </View>
          <Dropdown
            itemTextStyle={itemTextStyle}
            selectedItemColor={selectedItemColor}
            label='Question 3'
            value={this.props.promptThreeQuestion || 'Question 3'}
            data={data}
            onChangeText={this.p3Question}
          />
          <View style={surveyStyle.textFieldContainer}>
            <TextInput
              style={textFieldStyle}
              placeholder="Prompt 3 Answer"
              defaultValue={this.props.promptThreeAnswer || ''}
              onChangeText={this.p3Answer}
            />
          </View>
          <View style={{ alignItems: 'center', width: '100%', marginTop: 3, marginBottom: 3 }}>
            <SurveyHeaderComponent header="Tell Us About You!" />
          </View>
          <SliderComponent id='extraversion' onChange={this.handleSliderChange} value={this.state.extraversion} min='introvert' max='extrovert' />
          <SliderComponent id='listening' onChange={this.handleSliderChange} value={this.state.listening} min='listener' max='leader' />
          <View style={{ alignItems: 'center', width: '100%', marginTop: 10, marginBottom: 10 }}>
            <SurveyHeaderComponent header="CS Skills and Preferences" />
          </View>
          <View style={profile.editProfileContainer}>
            <View style={skillsHeaderT}>
              <Text style={headerText}>CS Skills</Text>
              <TouchableOpacity
                onPress={this.toggleSkills}>
                <Image
                  source={this.state.showSkills ? require('./../assets/icons/arrowup.png') : require('./../assets/icons/arrowdown.png')}
                />
              </TouchableOpacity>
            </View>
            <View>
              <View>
                {this.state.showSkills ? this.showSkills(true) : this.showSkills(false)}
              </View>
            </View>
          </View>
          <View style={profile.editProfileContainer}>
            <View style={skillsHeaderT}>
              <Text style={headerText}>CS Preferences</Text>
              <TouchableOpacity
                onPress={this.togglePreferences}>
                <Image
                  source={this.state.showPreferences ? require('./../assets/icons/arrowup.png') : require('./../assets/icons/arrowdown.png')}
                />
              </TouchableOpacity>
            </View>
            <View>
              <View>
                {this.state.showPreferences ? this.showPreferences(true) : this.showPreferences(false)}
              </View>
            </View>
          </View>
          <View style={profile.editProfileContainer}>
            <View style={skillsHeaderT}>
              <Text style={headerText}>Company Preferences</Text>
              <TouchableOpacity
                onPress={this.toggleCompany}>
                <Image
                  source={this.state.showCompany ? require('./../assets/icons/arrowup.png') : require('./../assets/icons/arrowdown.png')}
                />
              </TouchableOpacity>
            </View>
            <View>
              <View>
                {this.state.showCompany ? this.showCompany(true) : this.showCompany(false)}
              </View>
            </View>
          </View>
          <TouchableOpacity
            onPress={this.submitPage}>
            <View style={[buttons.logInOutButton, buttons.logInButton]}><Text style={[fonts.minorHeading, colors.white]}>Submit</Text></View>
          </TouchableOpacity>
        </ScrollView>
      </View >
    );
  }
}


const mapStateToProps = reduxState => (
  {
    error: reduxState.error,
    id: reduxState.auth.id,
    username: reduxState.auth.username,
    firstName: reduxState.user.firstName,
    lastName: reduxState.user.lastName,
    location: reduxState.user.location,
    promptOneQuestion: reduxState.user.promptOneQuestion,
    promptOneAnswer: reduxState.user.promptOneAnswer,
    promptTwoQuestion: reduxState.user.promptTwoQuestion,
    promptTwoAnswer: reduxState.user.promptTwoAnswer,
    promptThreeQuestion: reduxState.user.promptThreeQuestion,
    promptThreeAnswer: reduxState.user.promptThreeAnswer,
    frontEnd: reduxState.user.frontEnd,
    backEnd: reduxState.user.backEnd,
    small: reduxState.user.small,
    medium: reduxState.user.medium,
    large: reduxState.user.large,
    meritocratic: reduxState.user.meritocratic,
    nurturing: reduxState.user.nurturing,
    fratty: reduxState.user.fratty,
    fast: reduxState.user.fast,
    organized: reduxState.user.organized,
    stable: reduxState.user.stable,
    formal: reduxState.user.formal,
    relaxed: reduxState.user.relaxed,
    web: reduxState.user.web,
    user: reduxState.user.user,
    design: reduxState.user.design,
    mobile: reduxState.user.mobile,
    security: reduxState.user.security,
    algorithms: reduxState.user.algorithms,
    storage: reduxState.user.storage,
    profileURL: reduxState.user.profileURL,
  }
);

export default connect(mapStateToProps, { addToSurvey, getUser })(EditProfile);
