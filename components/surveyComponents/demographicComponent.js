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
    }

    this.onAgeChange = this.onAgeChange.bind(this);
  }

  onAgeChange(number) {
    this.setState({age: number});
  }

  render() {
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
            <TouchableComponent name='High School' />
            <TouchableComponent name='College' />
            <TouchableComponent name='Post Grad' />
          </View>
        </View>
        <Button
          title="next"
          onPress={() => {  this.props.navigation.navigate('Header', {pastPage: "demoInfo"}) }}
          />
      </ScrollView>
    );
  }
}

export default DemographicComponent;
