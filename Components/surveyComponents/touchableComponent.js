import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import colors, { fonts } from '../../assets/styles/basicStyle';
import surveyStyle from '../../assets/styles/surveyStyle';

class TouchableComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: false,
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(value) {
    console.log('this props ' + this.props.stateField);
    this.props.onChange(this.props.stateField, !this.props.stateFieldStatus);
    this.setState(() => {
      return {
        selected: !this.state.selected,
      };
    });
  }

  render() {
    return (
      <View>
        <TouchableOpacity onPress={this.handleChange}>
          <Text
            style={
                    this.state.selected
                        ? surveyStyle.pressed
                        : surveyStyle.notPressed
            }>
            {this.props.name}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default TouchableComponent;
