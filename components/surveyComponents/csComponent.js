import React from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity, ScrollView } from 'react-native';
import TouchableComponent from './touchableComponent';
import mainScreenStyle from '../../assets/styles/mainStyle';
import surveyStyle from '../../assets/styles/surveyStyle';

class CsComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render() {
    return (
      <ScrollView style={{marginTop: 100}}>
        <Text> CS Questions </Text>
        <View>
          <Text> Front End or Back End? </Text>
          <TouchableComponent name='Front End' />
          <TouchableComponent name='Back End' />
        </View>
        <View>
          <Text> Dream Company Size? </Text>
          <TouchableComponent name='Small' />
          <TouchableComponent name='Medium' />
          <TouchableComponent name='Large' />
        </View>
        <View>
          <Text> Preferred Work Culture? </Text>
          <TouchableComponent name='Meritocratic' />
          <TouchableComponent name='Nurturing' />
          <TouchableComponent name='Fratty' />
          <TouchableComponent name='Fast-Paced' />
          <TouchableComponent name='Organized' />
          <TouchableComponent name='Stable' />
          <TouchableComponent name='Formal' />
          <TouchableComponent name='Relaxed' />
        </View>
        <View>
          <Text> CS Strengths? </Text>
          <TouchableComponent name='Web Applications' />
          <TouchableComponent name='User Interaction' />
          <TouchableComponent name='Design' />
          <TouchableComponent name='Mobile Applications' />
          <TouchableComponent name='Security' />
          <TouchableComponent name='Algorithms & Math' />
          <TouchableComponent name='Storage & Infrastructure' />
        </View>
        <Button
          title="next"
          onPress={() => {  this.props.navigation.navigate('Header', {pastPage: "csInfo"}) }}
          />
      </ScrollView>
    );
  }
}

export default CsComponent;
