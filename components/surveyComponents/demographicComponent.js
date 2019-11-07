import React from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity, ScrollView } from 'react-native';
import TextField from 'react-native-text-field';
import mainScreenStyle from '../../assets/styles/mainStyle';
import surveyStyle from '../../assets/styles/surveyStyle';

class DemographicComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      age: 0,
      hsPress: false,
      collegePress: false,
      pgPress: false,
    }

    this.onAgeChange = this.onAgeChange.bind(this);
    this.pressHS = this.pressHS.bind(this);
    this.pressCollege = this.pressCollege.bind(this);
    this.pressPG = this.pressPG.bind(this);

  }

  onAgeChange(number) {
    this.setState({age: number});
  }

  pressHS() {
    this.setState({hsPress: !this.state.hsPress});
  }
  pressCollege() {
    this.setState({collegePress: !this.state.collegePress});
  }
  pressPG() {
    this.setState({pgPress: !this.state.pgPress});
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
            <TouchableOpacity onPress={this.pressHS}>
              <Text
              style={
                      this.state.hsPress
                          ? surveyStyle.pressed
                          : surveyStyle.notPressed
              }>
              High School </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.pressCollege}>
              <Text
              style={
                      this.state.collegePress
                          ? surveyStyle.pressed
                          : surveyStyle.notPressed
              }>
              College </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.pressPG}>
              <Text
              style={
                      this.state.pgPress
                          ? surveyStyle.pressed
                          : surveyStyle.notPressed
              }>
              Post Grad </Text>
            </TouchableOpacity>
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
