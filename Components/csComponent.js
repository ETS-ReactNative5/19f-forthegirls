import React from 'react';
import { StyleSheet, Text, View, Image, Button, TouchableOpacity, ScrollView } from 'react-native';
import TouchableComponent from './touchableComponent';
import colors, { fonts, buttons } from '../assets/styles/basicStyle';
import surveyStyle from '../assets/styles/surveyStyle';
import SurveyHeaderComponent from './surveyHeaderComponent'
import { addToSurvey } from '../actions/index'
import { connect } from 'react-redux';

class CsComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      frontEnd: false,
      backEnd: false,
      small: false,
      medium: false,
      large: false,
      meritocratic: false,
      nurturing: false,
      fratty: false,
      fast: false,
      organized: false,
      stable: false,
      formal: false,
      relaxed: false,
      web: false,
      user: false,
      design: false,
      mobile: false,
      security: false,
      algorithms: false,
      storage: false,

      // showing and hiding 
      showSkills: false,
      showPreferences: false,
      showCompany: false
    }

    this.handleFieldChange = this.handleFieldChange.bind(this);
    this.toggleSkills = this.toggleSkills.bind(this);
    this.togglePreferences = this.togglePreferences.bind(this);
    this.toggleCompany = this.toggleCompany.bind(this);
  }

  handleFieldChange(fieldId, value) {
    this.setState({ [fieldId]: value });
  }

  submitPage = () => {
    this.props.addToSurvey(this.state, this.props.username, this.props.navigation, 'Prompts');
  }

  toggleSkills() {
    this.setState({
      showSkills: !this.state.showSkills
    });
  }

  togglePreferences() {
    this.setState({
      showPreferences: !this.state.showPreferences
    });
  }

  toggleCompany() {
    this.setState({
      showCompany: !this.state.showCompany
    });
  }

  showSkills(val) {
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
    } else {
      return <Text>FALSEy false</Text>
    }
  }

  showPreferences(val) {
    if (val) {
      return (
        <View style={surveyStyle.items}>
          <TouchableComponent name='Front End' stateField='frontEnd' stateFieldStatus={this.state.frontEnd} onChange={this.handleFieldChange} />
          <TouchableComponent name='Back End' stateField='backEnd' stateFieldStatus={this.state.backEnd} onChange={this.handleFieldChange} />
        </View>
      );
    }
  }

  showCompany(val) {
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

  render() {
    var csInfo = {
      frontEnd: this.state.frontEnd,
      backEnd: this.state.backEnd,
      small: this.state.small,
      medium: this.state.medium,
      large: this.state.large,
      meritocratic: this.state.meritocratic,
      nurturing: this.state.nurturing,
      fratty: this.state.fratty,
      fast: this.state.fast,
      organized: this.state.organized,
      stable: this.state.stable,
      formal: this.state.formal,
      relaxed: this.state.relaxed,
      web: this.state.web,
      user: this.state.user,
      design: this.state.design,
      mobile: this.state.mobile,
      security: this.state.security,
      algorithms: this.state.algorithms,
      storage: this.state.storage,
    };
    // var basicInfo = this.props.navigation.getParam("basicInfo", null);
    var headerText = [fonts.minorHeading, colors.deepPurple, surveyStyle.csComponentHeader]

    return (
      <ScrollView style={surveyStyle.surveyBackground}>
        <View style={{ alignItems: 'center', width: '100%', marginTop: 10, marginBottom: 10 }}>
          <SurveyHeaderComponent text="Now, tell us what your interests are in computer science" header="CompSci Interests" />
        </View>

        <View>
          <Text style={headerText}>CS Strengths?</Text>
          <TouchableOpacity
            onPress={this.toggleSkills}
          >
            <Image
              source={require('./../assets/icons/arrownext.png')}
            />
          </TouchableOpacity>
          <View>
            {this.state.showSkills ? this.showSkills(true) : this.showSkills(false)}
          </View>
        </View>

        <View>
          <Text style={headerText}>CS Preferences</Text>
          <TouchableOpacity
            onPress={this.togglePreferences}>
            <Image
              source={require('./../assets/icons/arrownext.png')}
            />
          </TouchableOpacity>
          <View>
            {this.state.showPreferences ? this.showPreferences(true) : this.showPreferences(false)}
          </View>
        </View>

        <View>
          <Text style={headerText}>Company Preferences</Text>
          <TouchableOpacity
            onPress={this.toggleCompany}>
            <Image
              source={require('./../assets/icons/arrownext.png')}
            />
          </TouchableOpacity>
          <View>
            {this.state.showCompany ? this.showCompany(true) : this.showCompany(false)}
          </View>
        </View>

        <View style={buttons.arrowView}>
          <TouchableOpacity
            onPress={this.submitPage}>
            <Image
              source={require('./../assets/icons/arrownext.png')}
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

export default connect(mapStateToProps, { addToSurvey })(CsComponent);
