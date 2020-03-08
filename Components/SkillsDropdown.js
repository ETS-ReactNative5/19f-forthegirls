import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import colors, { fonts } from '../assets/styles/basicStyle';
import { promptStyle } from '../assets/styles/profileStyle';

class SkillsDropdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showSkills: false
    }
    this.handleFieldChange = this.handleFieldChange.bind(this);
  }

  handleFieldChange(fieldId, value) {
    this.setState({ [fieldId]: value });
  }

  showSkills(data, label) {
    if (this.state.showSkills()) {
      for (i = 0; i < data.length; i++) {
        return (
          <TouchableComponent name={data[i]}
            onChange={this.handleFieldChange} />)
      }
    }
  }


  render() {
    return (
      <View>
        <Text>Show</Text>
        {this.showSkills(this.props.data, this.props.label)}
      </View>


    );
  };
};
