import React from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity, ScrollView } from 'react-native';
import TextField from 'react-native-text-field';
import TouchableComponent from './touchableComponent';

import mainScreenStyle from '../../assets/styles/mainStyle';
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
    this.setState({age: number});
  }

  handleFieldChange(fieldId, value) {
    this.setState({ [fieldId]: value });
    console.log('field id is ' + fieldId);
    if(fieldId==='hs' && value===true){
      console.log('in for lop');
      this.setState({ pg: false });
      this.setState({ college: false });
    }
    else if(fieldId==='pg' && value){
      this.setState({ hs: false });
      this.setState({ college: false });
    }
    else if(fieldId==='college' && value){
      this.setState({ pg: false });
      this.setState({ hs: false });
    }
  }

  render() {
    var basicInfo = this.props.navigation.getParam("basicInfo",  null);
    var demoInfo = {
      'age': this.state.age,
      'hs': this.state.hs,
      'college': this.state.college,
      'pg': this.state.pg,
    }

    return (
      <ScrollView style={{marginTop: 100}}>
        <Text> Demographic Questions </Text>
        <View>
          <TextField
            title="Age"
            onInputChange={(input) => this.onAgeChange(input)}
          />
          <View>
            <Text> Stage of Life? </Text>
            <TouchableComponent name='High School' stateField='hs' stateFieldStatus={this.state.hs} onChange={this.handleFieldChange} />
            <TouchableComponent name='College' stateField='college' stateFieldStatus={this.state.college} onChange={this.handleFieldChange} />
            <TouchableComponent name='Post Grad' stateField='pg' stateFieldStatus={this.state.pg} onChange={this.handleFieldChange} />
          </View>
        </View>
        <Button
          title="next"
          onPress={() => {  this.props.navigation.navigate('Header', {pastPage: "demoInfo",
          basicInfo: basicInfo, demoInfo: demoInfo}) }}
          />
      </ScrollView>
    );
  }
}

export default DemographicComponent;
