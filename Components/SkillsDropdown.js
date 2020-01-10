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
      /// come back to this!
      for (i = 0; i < data.length; i++) {
        return (
          <TouchableComponent name={data[i]}
            onChange={this.handleFieldChange} />)
        // stateField='meritocratic' 
        // stateFieldStatus={this.state.meritocratic} 
        // onChange={this.handleFieldChange} />)
      }
    }
  }


  render() {
    return (
      <View>
        // button to show
        <Text>Show</Text>
        {this.showSkills(this.props.data, this.props.label)}
      </View>


    );
  };
};

// need to loop through things in the data set 
// render each as 
/* <TouchableComponent
  name='Meritocratic'
  stateField='meritocratic'
  stateFieldStatus={this.state.meritocratic}
  onChange={this.handleFieldChange} />
*/


  // var textFieldStyle = [surveyStyle.textField, fonts.bodyText]
  // var itemTextStyle = [fonts.bodyText]
  // var selectedItemColor = colors.turquoise.color

//   return (
//     if (this.state.showSkills) {
//       for 
//     }
//   );
// }