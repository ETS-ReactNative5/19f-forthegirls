import React from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity, Image, ScrollView } from 'react-native';
import TextField from 'react-native-text-field';
import TouchableComponent from './touchableComponent';
import colors, { buttons, fonts, fontEffects } from '../../assets/styles/basicStyle';
import surveyStyle from '../../assets/styles/surveyStyle';

class DemographicComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      age: 0,
      hs: false,
      college: false,
      pg: false,
    }

    this.onAgeChange = this.onAgeChange.bind(this);
    this.handleFieldChange = this.handleFieldChange.bind(this);
  }

  onAgeChange(number) {
    this.setState({ age: number });
  }

  handleFieldChange(fieldId, value) {
    this.setState({ [fieldId]: value });
    console.log('field id is ' + fieldId);
    if (fieldId === 'hs' && value === true) {
      console.log('in for lop');
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

  render() {
    var basicInfo = this.props.navigation.getParam("basicInfo", null);
    var demoInfo = {
      'age': this.state.age,
      'hs': this.state.hs,
      'college': this.state.college,
      'pg': this.state.pg,
    }

    var placeholderStyle = [fonts.bodyText, colors.lightGrey]
    var textInputStyle = [colors.black, fonts.bodyText]
    var textFieldStyle = surveyStyle.textField
    var headerText = [fonts.minorHeading, colors.deepPurple, surveyStyle.csComponentHeader]

    return (
      <ScrollView style={{ paddingLeft: 5, height: '100%', display: 'flex', backgroundColor: colors.veryLightPurple.color }}>
        <Text style={[fonts.majorHeading, fontEffects.center]}>Demographic Questions</Text>
        <View>
          <Text style={headerText}>Age</Text>
          <TextField
            textFieldStyle={textFieldStyle}
            placeholderStyle={{ placeholderStyle }}
            textInputStyle={{ textInputStyle }}
            onInputChange={(input) => this.onAgeChange(input)}
          />
          <View>
            <Text style={headerText}>Stage of Life?</Text>
            <View style={{
              flexDirection: 'row',
              flexWrap: 'no-wrap',
              justifyContent: 'flex-start'
            }}>
              <TouchableComponent name='High School' stateField='hs' stateFieldStatus={this.state.hs} onChange={this.handleFieldChange} />
              <TouchableComponent name='College' stateField='college' stateFieldStatus={this.state.college} onChange={this.handleFieldChange} />
              <TouchableComponent name='Post Grad' stateField='pg' stateFieldStatus={this.state.pg} onChange={this.handleFieldChange} />
            </View>
          </View>
        </View>
        <View style={buttons.arrowView}>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate('Header', {
                pastPage: "demoInfo",
                basicInfo: basicInfo, demoInfo: demoInfo
              })
            }}>
            <Image
              source={require('./../../assets/icons/arrownext.png')}
            />
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }
}

export default DemographicComponent;
