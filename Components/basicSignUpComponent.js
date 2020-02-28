import React from 'react';
import { Image, Text, View, Button, Alert, ScrollView, TouchableOpacity, TextInput, KeyboardAvoidingView } from 'react-native';
import { singleChat } from '../assets/styles/chatStyle';
import colors, { fonts, buttons, fontEffects } from '../assets/styles/basicStyle';
import surveyStyle from '../assets/styles/surveyStyle';
import SurveyHeaderComponent from './surveyHeaderComponent';
import { signUpUser, resetErrors } from '../actions/index'
import { connect } from 'react-redux';
import ErrorModal from './ErrorModal'
import Geocoder from 'react-native-geocoding';
import { Dropdown } from 'react-native-material-dropdown';
import { ICountry, IState, ICity } from 'country-state-city'
import Autocomplete from 'react-native-autocomplete-input';
import csc from 'country-state-city'



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
      queryTown: '',
      statelist: [],
      stateSelected: '',
    }
    this.handleFieldChange = this.handleFieldChange.bind(this);
  }

  componentWillUnmount() {
    this.props.resetErrors();
  }

  stateSelection = (value) => {
    this.setState({ stateSelected: value });
  }

  componentDidMount() {
    var states = csc.getStatesOfCountry("231");
    var statelist = [];
    for (var i = 0; i< states.length; i++){
      statelist[i] = states[i].name;
    }

    var stateAbrv = this.createStateToAbbrvMap();
    console.log(stateAbrv);
    this.setState({statelist: statelist, stateAbrv: stateAbrv});
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


  sumbitUser = () => {

    if (this.state.firstName === '' || this.state.lastName === '' || this.state.email === '' || this.state.username === '' || this.state.password === '') {
      this.setState({ showModal: true, modalMessage: 'Please fill out the entire form.' });
    }
    else {
      const fields = {
        email: this.state.email,
        username: this.state.username,
        password: this.state.password,
      }



      console.log("printing push token");
      console.log(this.props.pushToken);
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
              pushToken: this.state.pushToken,

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
    if(this.stateSelected!=""){
      var stateAbbrv = this.state.stateAbrv[this.state.stateSelected];
      var newLoc = text + ", " + stateAbbrv;
      this.setState({ location: newLoc });
    }
    else {
      this.setState({location: text});
    }
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

  renderError = () => {
    if (this.props.error !== null) {
      return (
        <Text style={[fonts.bodyText, colors.red, fontEffects.center]}>{this.props.error}</Text>
      )
    }
  }

  goBack = () => {
    this.props.navigation.pop();
  }

  autocompleteSelection = (item) => {
    if(this.state.stateSelected != "" && this.state.queryTown != ""){
      var stateAbbrv = this.state.stateAbrv[this.state.stateSelected];
      var newLocation = item + ", " + stateAbbrv;
      this.setState({location: newLocation});
      return newLocation;
    }
  }

  findQueryTown = (query) => {
    console.log("This state seelected: " + this.state.stateSelected);

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


  //need to check unique from here
  render() {

    // var autocomplete =(
    //   <View style={surveyStyle.textFieldContainer}>
    //     <Autocomplete
    //       data={queryDateTown}
    //       style={textFieldStyle}
    //       defaultValue={this.state.queryTown}
    //       onChangeText={text => this.setState({ queryTown: text })}
    //       renderItem={({ item, i }) => (
    //         <TouchableOpacity onPress={() => {
    //           this.setState({ queryTown: item })
    //           var newLocation = this.autocompleteSelection(item);
    //           this.setState({location: newLocation});
    //           }
    //         }>
    //           <Text>{item}</Text>
    //         </TouchableOpacity>
    //       )}
    //    />
    //  </View>
    // )
//    console.log(this.state.queryTown);
    var queryDateTown = this.findQueryTown(this.state.queryTown);
    //console.log(queryDateTown)

    let stateDropdown = [];
    for (var i = 0; i< this.state.statelist.length; i++){
      var newVal = {};
      newVal["value"] = this.state.statelist[i];
      stateDropdown[i]= newVal;
    }

    var dropdownPickerStyle = { borderRadius: 20 }
    var itemTextStyle = [fonts.bodyText]
    var selectedItemColor = colors.turquoise.color
    var itemColor = colors.black.color

    var textFieldStyle = [surveyStyle.signInUpTextField, fonts.bodyText]
    var endFieldStyle = [surveyStyle.signInUpTextField, fonts.bodyText, surveyStyle.endField]
    var secondaryHeaderText = [fonts.minorHeading, colors.turquoise, surveyStyle.secondaryHeader]
    return (
      <KeyboardAvoidingView behavior="padding" enabled keyboardVerticalOffset={100}>
        <ScrollView style={surveyStyle.surveyBackground}>
          <View style={[singleChat.arrowBack]}>
            <TouchableOpacity
              onPress={this.goBack}>
              <Image
                source={require('./../assets/icons/arrowback.png')}
              />
            </TouchableOpacity>
          </View>
          <View style={{ alignItems: 'center', width: '100%', marginTop: 10, marginBottom: 10 }}>
            <SurveyHeaderComponent header="Sign up!" goBack={this.goBack} />
            {this.renderModal()}
            {this.renderError()}
          </View>
          <Text style={secondaryHeaderText}>First, the basics:</Text>
          <View style={{ flexDirection: 'row', width: '100%' }}>
            <View style={{ flex: 2 }}>
              <TextInput
                style={textFieldStyle}
                invalidTextFieldStyle={{ borderColor: colors.red.color }}
                placeholder="First Name"
                onChangeText={this.firstNameInput}
                clearButtonMode='while-editing'
                keyboardType='default'
              /></View>
            <View style={{ flex: 2 }}>
              <TextInput
                style={textFieldStyle}
                invalidTextFieldStyle={{ borderColor: colors.red.color }}
                placeholder="Last Name"
                onChangeText={this.lastNameInput}
                clearButtonMode='while-editing'
                keyboardType='default'
              /></View>
            <View style={{ flex: 1 }}>
              <TextInput
                style={endFieldStyle}
                onInputChange={(input) => this.onAgeChange(input)}
                placeholder="Age"
                onChangeText={this.ageInput}
                clearButtonMode='while-editing'
                keyboardType='phone-pad'
              />
            </View>
          </View>
          <TextInput
            style={endFieldStyle}
            invalidTextFieldStyle={{ borderColor: colors.red.color }}
            placeholder="Email"
            onChangeText={this.emailInput}
            clearButtonMode='while-editing'
            keyboardType='email-address'
          />
          <View style={{ alignItems: 'center', justifyContent: 'center' }}><Text style={{ fontSize: 50, color: colors.turquoise.color }}>• • •</Text></View>
          <Text style={secondaryHeaderText}>Next, a few specifics:</Text>
          <Dropdown
            pickerStyle={dropdownPickerStyle}
            itemTextStyle={itemTextStyle}
            selectedItemColor={selectedItemColor}
            label='Select your home state'
            labelTextStyle={fonts.bodyText}
            data={stateDropdown}
            value={this.state.stateSelected != "" ? this.state.stateSelected : "State"}
            onChangeText={this.stateSelection}
          />

          <TextInput
            style={endFieldStyle}
            placeholder="City"
            onChangeText={this.locationInput}
            clearButtonMode='while-editing'
            keyboardType='default'
          />

          <TextInput
            style={endFieldStyle}
            placeholder="High School Name"
            onChangeText={this.highSchoolInput}
            clearButtonMode='while-editing'
            keyboardType='default'
          />
          <View style={{ flexDirection: 'row', width: '100%' }}>
            <View style={{ flex: 2 }}>
              <TextInput
                style={textFieldStyle}
                placeholder="College or University"
                onChangeText={this.collegeInput}
                clearButtonMode='while-editing'
                keyboardType='default'
              /></View>
            <View style={{ flex: 1 }}>
              <TextInput
                style={endFieldStyle}
                placeholder="Grad Year"
                onChangeText={this.gradYearInput}
                clearButtonMode='while-editing'
                returnKeyType='done'
                keyboardType='numeric'
              />
            </View>
          </View>
          <View style={{ alignItems: 'center', justifyContent: 'center' }}><Text style={{ fontSize: 50, color: colors.turquoise.color }}>• • •</Text></View>
          <Text style={secondaryHeaderText}>And finally, your log-in information:</Text>
          <View style={{ flexDirection: 'row', width: '100%' }}>
            <View style={{ flex: 1 }}>
              <TextInput
                style={textFieldStyle}
                invalidTextFieldStyle={{ borderColor: colors.red.color }}
                placeholder="Username"
                onChangeText={this.usernameInput}
                clearButtonMode='while-editing'
              /></View>
            <View style={{ flex: 1 }}>
              <TextInput
                style={endFieldStyle}
                invalidTextFieldStyle={{ borderColor: colors.red.color }}
                placeholder="Password"
                secureTextEntry={true}
                onChangeText={this.passwordInput}
                clearButtonMode='while-editing'
              /></View>
          </View>
          <View>
            <View style={{
              flexDirection: 'row',
              flexWrap: 'no-wrap',
              justifyContent: 'flex-start'
            }}>
            </View>
          </View>
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
      </KeyboardAvoidingView >
    );
  }
}

const mapStateToProps = reduxState => (
  {
    error: reduxState.error,
    username: reduxState.auth.username,
    pushToken: reduxState.auth.pushToken,
  }
);

export default connect(mapStateToProps, { signUpUser, resetErrors })(BasicSignUpComponent);
