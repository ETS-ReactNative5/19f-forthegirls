import React from 'react';
import { StyleSheet, Text, ScrollView, View, TouchableOpacity, Image, TextInput, TouchableHighlight, ProgressViewIOS } from 'react-native';
import { Dropdown } from 'react-native-material-dropdown';
import TouchableComponent from './touchableComponent';

import TextField from 'react-native-text-field';
import colors, { buttons, fonts, profileImage, fontEffects } from '../assets/styles/basicStyle';
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
import csc from 'country-state-city'
import { ICountry, IState, ICity } from 'country-state-city'
import Autocomplete from 'react-native-autocomplete-input';

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
      promptThreeAnswer: this.props.promptThreeAnswer,

      extraversion: this.props.extraversion !== undefined ? this.props.extraversion : 50,
      listening: this.props.listening !== undefined ? this.props.listening : 50,

      score_frontEnd: this.props.frontEnd,
      score_backEnd: this.props.backEnd,
      score_small: this.props.small,
      score_medium: this.props.medium,
      score_large: this.props.large,
      score_meritocratic: this.props.meritocratic,
      score_nurturing: this.props.nurturing,
      score_fratty: this.props.fratty,
      score_fast: this.props.fast,
      score_organized: this.props.organized,
      score_stable: this.props.stable,
      score_formal: this.props.formal,
      score_relaxed: this.props.relaxed,
      score_web: this.props.web,
      score_user: this.props.user,
      score_design: this.props.design,
      score_mobile: this.props.mobile,
      score_security: this.props.security,
      score_algorithms: this.props.algorithms,
      score_storage: this.props.storage,
      profileURL: this.props.profileURL,

      // showing and hiding
      showSkills: false,
      showPreferences: false,
      showCompany: false,

      image: this.props.image,
      imagefull: null,
      showModal: false,
      modalMessage: '',
      progress: 0.0,

      progressMessage: '',
      loading: false,
      query: '',
      queryTown: '',
      stateID: '',
      statelist: [],
      stateSelected: '',
    };
    this.handleSliderChange = this.handleSliderChange.bind(this);
    this.handleFieldChange = this.handleFieldChange.bind(this);
    this.toggleSkills = this.toggleSkills.bind(this);
    this.togglePreferences = this.togglePreferences.bind(this);
    this.toggleCompany = this.toggleCompany.bind(this);
    this.goBack = this.goBack.bind(this);
    this.calcProgress = this.calcProgress.bind(this);

  }

  componentDidMount() {
    this.props.getUser(this.props.id);
    this.calcProgress();

    var states = csc.getStatesOfCountry("231");
    var statelist = [];
    for (var i = 0; i< states.length; i++){
      statelist[i] = states[i].name;
    }
    this.setState({statelist: statelist, stateAbrv: this.createStateToAbbrvMap()});
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

  createStateToAbbrvMap = () => {
    var startsToAbbrv = {};
    startsToAbbrv["Alabama"] = "AL";
    startsToAbbrv["Alaska"] = "AK";
    startsToAbbrv["Arizona"] = "AZ";
    startsToAbbrv["Arkansas"] = "AR";
    startsToAbbrv["California"] = "CA";
    startsToAbbrv["Colorado"] = "CO";
    startsToAbbrv["Connecticut"] = "CT";
    startsToAbbrv["Delaware"] = "DE";
    startsToAbbrv["Florida"] = "FL";
    startsToAbbrv["Georgia"] = "GA";
    startsToAbbrv["Hawaii"] = "HI";
    startsToAbbrv["Idaho"] = "ID";
    startsToAbbrv["Illinois"] = "IL";
    startsToAbbrv["Indiana"] = "IN";
    startsToAbbrv["Iowa"] = "IA";
    startsToAbbrv["Kansas"] = "KS";
    startsToAbbrv["Kentucky"] = "KY";
    startsToAbbrv["Louisiana"] = "LA";
    startsToAbbrv["Maine"] = "ME";
    startsToAbbrv["Maryland"] = "MD";
    startsToAbbrv["Massachusetts"] = "MA";
    startsToAbbrv["Michigan"] = "MI";
    startsToAbbrv["Minnesota"] = "MN";
    startsToAbbrv["Mississippi"] = "MS";
    startsToAbbrv["Missouri"] = "MO";
    startsToAbbrv["Montana"] = "MT";
    startsToAbbrv["Nebraska"] = "NE";
    startsToAbbrv["Nevada"] = "NV";
    startsToAbbrv["New Hampshire"] = "NH";
    startsToAbbrv["New Jersey"] = "NJ";
    startsToAbbrv["New Mexico"] = "NM";
    startsToAbbrv["New York"] = "NY";
    startsToAbbrv["North Carolina"] = "NC";
    startsToAbbrv["North Dakota"] = "ND";
    startsToAbbrv["Ohio"] = "OH";
    startsToAbbrv["Oklahoma"] = "OK";
    startsToAbbrv["Oregon"] = "OR";
    startsToAbbrv["Pennsylvania"] = "PA";
    startsToAbbrv["Rhode Island"] = "RI";
    startsToAbbrv["South Carolina"] = "SC";
    startsToAbbrv["South Dakota"] = "SD";
    startsToAbbrv["Tennessee"] = "TN";
    startsToAbbrv["Texas"] = "TX";
    startsToAbbrv["Utah"] = "UT";
    startsToAbbrv["Vermont"] = "VT";
    startsToAbbrv["Virginia"] = "VA";
    startsToAbbrv["Washington"] = "WA";
    startsToAbbrv["West Virginia"] = "WV";
    startsToAbbrv["Wisconsin"] = "WI";
    startsToAbbrv["Wyoming"] = "WY";

    return startsToAbbrv;
  }

  photoUpload = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      base64: true,
    });
    if (!result.cancelled) {
      this.setState({ image: result.uri, imagefull: result });
    }
  };

  submitPage = () => {
    if ((this.state.promptOneQuestion === this.state.promptTwoQuestion || this.state.promptTwoQuestion === this.state.promptThreeQuestion || this.state.promptOneQuestion === this.state.promptThreeQuestion) && (this.state.promptOneQuestion !== undefined && this.state.promptTwoQuestion !== undefined && this.state.promptThreeQuestion !== undefined)) {
      console.log(this.state.promptOneQuestion);
      console.log(this.state.promptTwoQuestion);
      console.log(this.state.promptThreeQuestion);
      this.setState({ showModal: !this.state.showModal, modalMessage: "Please fill out different prompts!" });
    }
    else if (this.state.firstName === '' || this.state.lastName === '' || this.state.location === '') {
      this.setState({ showModal: !this.state.showModal, modalMessage: "Please fill out your basic information!" });
    }
    else {
      if (this.state.imagefull != null) {
        let i = this.state.imagefull.uri.length;
        while (this.state.imagefull.uri.charAt(i) !== '/') {
          i--;
        }
        this.state.imagefull.name = this.state.imagefull.uri.substring(i + 1);
        uploadImage(this.state.imagefull).then((url) => {
          this.setState({ profileURL: String(url) })
          this.setState({ imagefull: null })
          this.props.addToSurvey(this.state, this.props.username, this.props.navigation, 'Home');

        })
      }
      else {

        this.setState({ loading: true });

        this.props.addToSurvey(this.state, this.props.username, this.props.navigation, 'Home');
      }
    }
  }

  renderLoadingModal = () => {
    if (this.state.loading) {
      return (
        <Text style={[fonts.bodyText, colors.turquoise, fontEffects.center]}>Saving your info!</Text>
      );
    }
  }

  renderModal = () => {
    if (this.state.showModal) {
      return (
        <ErrorModal errorMessage={this.state.modalMessage} reset={this.resetModal} />
      );
    }
  }

  calcProgress = () => {
    let sum = 1.0;
    let message = '';
    if (this.state.promptOneAnswer === '' || this.state.promptOneAnswer === undefined) {
      sum -= .2;
      message = "Fill out the first prompt to fill up the progress bar!";
    }
    if (this.state.promptTwoAnswer === '' || this.state.promptTwoAnswer === undefined) {
      sum -= .2;
      if (message === '') {
        message = "Fill out the second prompt to fill up the progress bar!";
      }
    }
    if (this.state.promptThreeAnswer === '' || this.state.promptThreeAnswer === undefined) {
      sum -= .2;
      if (message === '') {
        message = "Fill out the third prompt to fill up the progress bar!";
      }
    }
    if (this.props.profileURL === "" || this.props.profileURL === null || this.props.profileURL === undefined) {
      sum -= .2;
      if (message === '') {
        message = "Add a profile picture to fill up the progress bar!";
      }
    }
    if (this.state.extraversion === 50 || this.state.listening === 50) {
      sum -= .2;
      if (message === '') {
        message = "Adjust the personality sliders to fill up the progress bar!";
      }
    }

    this.setState({ progress: sum, progressMessage: message });
  }

  showProgressModal = () => {
    if (this.state.progress !== 1.0) {
      return (
        <ErrorModal errorMessage={this.state.progressMessage} reset={this.resetProgressModal}></ErrorModal>
      )
    }
  }

  setModalVisable = (value) => {
    this.setState({ showModal: value });
  }

  resetModal = () => {
    this.setState({ showModal: false, modalMessage: "" });
  }

  resetProgressModal = () => {
    this.setState({ showModal: false, progressMessage: "" });
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

  progressBar = () => {
    if (this.state.progress !== 1) {
      return (
        <View>
          <ProgressViewIOS style={{ margin: 20 }} progressTintColor={colors.turquoise.color} progress={this.state.progress} />
        </View>
      )
    }
  }

  showSkills = (val) => {
    if (val) {
      return (
        <View style={surveyStyle.items} >
          <TouchableComponent name='Web Applications' stateField='score_web' stateFieldStatus={this.state.score_web} onChange={this.handleFieldChange} />
          <TouchableComponent name='User Interaction' stateField='score_user' stateFieldStatus={this.state.score_user} onChange={this.handleFieldChange} />
          <TouchableComponent name='Design' stateField='score_design' stateFieldStatus={this.state.score_design} onChange={this.handleFieldChange} />
          <TouchableComponent name='Mobile Applications' stateField='score_mobile' stateFieldStatus={this.state.score_mobile} onChange={this.handleFieldChange} />
          <TouchableComponent name='Security' stateField='score_security' stateFieldStatus={this.state.score_security} onChange={this.handleFieldChange} />
          <TouchableComponent name='Algorithms & Math' stateField='score_algorithms' stateFieldStatus={this.state.score_algorithms} onChange={this.handleFieldChange} />
          <TouchableComponent name='Storage & Infrastructure' stateField='score_storage' stateFieldStatus={this.state.score_storage} onChange={this.handleFieldChange} />
        </View>
      )
    }
  }

  showPreferences = (val) => {
    if (val) {
      return (
        <View style={surveyStyle.items}>
          <TouchableComponent name='Front End' stateField='score_frontEnd' stateFieldStatus={this.state.score_frontEnd} onChange={this.handleFieldChange} />
          <TouchableComponent name='Back End' stateField='score_backEnd' stateFieldStatus={this.state.score_backEnd} onChange={this.handleFieldChange} />
        </View>
      );
    }
  }

  showCompany = (val) => {
    if (val) {
      return (
        <View style={surveyStyle.items}>
          <TouchableComponent name='Small' stateField='score_small' stateFieldStatus={this.state.score_small} onChange={this.handleFieldChange} />
          <TouchableComponent name='Medium' stateField='score_medium' stateFieldStatus={this.state.score_medium} onChange={this.handleFieldChange} />
          <TouchableComponent name='Large' stateField='score_large' stateFieldStatus={this.state.score_large} onChange={this.handleFieldChange} />
          <TouchableComponent name='Meritocratic' stateField='score_meritocratic' stateFieldStatus={this.state.score_meritocratic} onChange={this.handleFieldChange} />
          <TouchableComponent name='Nurturing' stateField='score_nurturing' stateFieldStatus={this.state.score_nurturing} onChange={this.handleFieldChange} />
          <TouchableComponent name='Fratty' stateField='score_fratty' stateFieldStatus={this.state.score_fratty} onChange={this.handleFieldChange} />
          <TouchableComponent name='Fast-Paced' stateField='score_fast' stateFieldStatus={this.state.score_fast} onChange={this.handleFieldChange} />
          <TouchableComponent name='Organized' stateField='score_organized' stateFieldStatus={this.state.score_organized} onChange={this.handleFieldChange} />
          <TouchableComponent name='Stable' stateField='score_stable' stateFieldStatus={this.state.score_stable} onChange={this.handleFieldChange} />
          <TouchableComponent name='Formal' stateField='score_formal' stateFieldStatus={this.state.score_formal} onChange={this.handleFieldChange} />
          <TouchableComponent name='Relaxed' stateField='score_relaxed' stateFieldStatus={this.state.score_relaxed} onChange={this.handleFieldChange} />
        </View>
      )
    }
  }

  p1Question = (value) => {
    this.setState({ promptOneQuestion: value });
  }

  stateSelection = (value) => {
    this.setState({ stateSelected: value });
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
  }

  opacityOnPress = () => {
    this.props.navigation.navigate('Home', {})
  }

  goBack = () => {
    this.props.navigation.pop();
  }

  findQuery = (query) => {
    if (query === '') {
      return [];
    }
    var states = csc.getStatesOfCountry("231");
    for (var i = 0; i < states.length; i++){
      if(this.state.query == states[i].name)
      {
        return [];
      }
    }
    const regex = new RegExp(`${query.trim()}`, 'i');
    var filtered = states.filter(state => state.name.search(regex) >= 0);
    var result = []
    for (var i = 0; i < filtered.length; i++){
      result[i] = filtered[i].name
    }
    return result;
}

  findQueryTown = (query) => {
    if (query === '' || this.state.stateSelected == '') {
      return [];
    }
    var state = csc.getStatesOfCountry("231");
    var id = "";
    for(var i = 0; i< state.length; i++){
      if (state[i].name == this.state.stateSelected){
        id = state[i].id;
      }
    }
    if(id == ""){
      return [];
    }
    var cities = csc.getCitiesOfState(id);
    for (var i = 0; i < cities.length; i++){
      if(this.state.queryTown == cities[i].name)
      {
        return [];
      }
    }
    const regex = new RegExp(`${query.trim()}`, 'i');
    var filtered = cities.filter(city => city.name.search(regex) >= 0);
    var result = []
    for (var i = 0; i < filtered.length; i++){
      result[i] = filtered[i].name
    }

    return result;
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

    let stateDropdown = [];
    for (var i = 0; i< this.state.statelist.length; i++){
      var newVal = {};
      newVal["value"] = this.state.statelist[i];
      stateDropdown[i]= newVal;
    }



    var textFieldStyle = [surveyStyle.textField, fonts.bodyText]
    var itemTextStyle = [fonts.bodyText]
    var selectedItemColor = colors.turquoise.color
    var itemColor = colors.black.color
    var headerText = [fonts.minorHeading, colors.deepPurple, surveyStyle.csComponentHeader]
    var skillsHeaderT = { flexDirection: 'row', justifyContent: 'space-between' }
    var dropdownPickerStyle = { borderRadius: 20 }


    var imageNoImage = <Image source={require('./../assets/icons/tim.jpg')} style={profileImage.edit} />
    var imageImage = <Image source={{ uri: this.props.profileURL }} style={profileImage.edit} />

    var image;
    if (this.state.imagefull != null) {
      image = <Image source={{ uri: this.state.imagefull.uri }} style={profileImage.edit} />
    }
    else if (this.props.profileURL != "" && this.props.profileURL != null) {
      image = imageImage;
    }
    else {
      image = imageNoImage;
    }

    var queryDate= this.findQuery(this.state.query);
    var queryDateTown = this.findQueryTown(this.state.queryTown);

    return (
      <View style={{ backgroundColor: colors.lightGrey.color }}>
        <View style={profile.editProfileHeader}>
          <View style={[singleChat.arrowBack]}>
            <TouchableOpacity
              onPress={this.goBack}>
              <Image
                source={require('./../assets/icons/arrowback.png')}
              />
            </TouchableOpacity>
          </View>
          <View style={singleChat.headerTextContainer}>
            <Text style={[fonts.minorHeading, colors.deepPurple]}>Editing Profile</Text>
          </View>
          <TouchableOpacity
            onPress={this.submitPage}>
            <View style={buttons.submitProfileButton}><Text style={[fonts.minorHeading, colors.white]}>Done</Text></View>
          </TouchableOpacity>
        </View>
        {this.progressBar()}
        <ScrollView style={{ backgroundColor: colors.lightGrey.color, margin: 10, marginBottom: 85 }}>
          <View>
            {this.renderModal()}
            {this.renderLoadingModal()}
            {this.showProgressModal()}
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
                clearButtonMode='while-editing'
              />
            </View>
            <View style={surveyStyle.textFieldContainer}>
              <Autocomplete
                data={queryDate}
                defaultValue={this.state.query}
                onChangeText={text => this.setState({ query: text })}
                style={textFieldStyle}

                renderItem={({ item, i }) => (
                  <TouchableOpacity onPress={() => {
                    var stateID = '';
                    var states =  csc.getStatesOfCountry("231")
                    for (var i = 0; i<states.length; i++){
                      if (item == states[i].name){
                        stateID = states[i].id;
                      }
                    }
                    this.setState({ query: item, stateID: stateID })
                  }}>
                    <Text>{item}</Text>
                  </TouchableOpacity>
                )}
                />
              </View>
              <View style={surveyStyle.textFieldContainer}>
                <Autocomplete
                  data={queryDateTown}
                  style={textFieldStyle}
                  defaultValue={this.state.queryTown}
                  onChangeText={text => this.setState({ queryTown: text })}
                  renderItem={({ item, i }) => (
                    <TouchableOpacity onPress={() => this.setState({ queryTown: item })}>
                      <Text>{item}</Text>
                    </TouchableOpacity>
                  )}
               />
             </View>

            <View style={surveyStyle.textFieldContainer}>
              <TextInput
                style={textFieldStyle}
                placeholder="Last Name"
                maxLength={30}
                defaultValue={this.props.lastName || ''}
                onChangeText={this.lastNameChange}
                clearButtonMode='while-editing'
              />
            </View>
            <Dropdown
              pickerStyle={dropdownPickerStyle}
              itemTextStyle={itemTextStyle}
              selectedItemColor={selectedItemColor}
              label='Select your home state'
              labelTextStyle={fonts.bodyText}
              data={stateDropdown}
              value='State'
              onChangeText={this.stateSelection}
            />

            <View style={surveyStyle.textFieldContainer}>
              <Autocomplete
                data={queryDateTown}
                style={textFieldStyle}
                defaultValue={this.state.queryTown}
                onChangeText={text => this.setState({ queryTown: text })}
                renderItem={({ item, i }) => (
                  <TouchableOpacity onPress={() => this.setState({ queryTown: item })}>
                    <Text>{item}</Text>
                  </TouchableOpacity>
                )}
             />
           </View>

            <View style={surveyStyle.textFieldContainer}>
              <TextInput
                style={textFieldStyle}
                placeholder="Location (City, State)"
                maxLength={30}
                defaultValue={this.props.location || ''}
                onChangeText={this.locationChange}
                clearButtonMode='while-editing'
              />
            </View>
          </View>
          <View style={{ alignItems: 'center', width: '100%' }}>
            <SurveyHeaderComponent header="Answer 3 Prompts!" />
          </View>
          <Dropdown
            pickerStyle={dropdownPickerStyle}
            itemTextStyle={itemTextStyle}
            selectedItemColor={selectedItemColor}
            label='Question 1'
            labelTextStyle={fonts.bodyText}
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
                clearButtonMode='while-editing'
              />
            </View>
          </View>
          <Dropdown
            pickerStyle={dropdownPickerStyle}
            itemTextStyle={itemTextStyle}
            selectedItemColor={selectedItemColor}
            label='Question 2'
            labelTextStyle={fonts.bodyText}
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
              clearButtonMode='while-editing'
            />
          </View>
          <Dropdown
            pickerStyle={dropdownPickerStyle}
            itemTextStyle={itemTextStyle}
            selectedItemColor={selectedItemColor}
            label='Question 3'
            labelTextStyle={fonts.bodyText}
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
              clearButtonMode='while-editing'
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
    extraversion: reduxState.user.extraversion,
    listening: reduxState.user.listening
  }
);

export default connect(mapStateToProps, { addToSurvey, getUser })(EditProfile);
