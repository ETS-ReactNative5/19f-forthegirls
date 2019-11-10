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

    this.onChange = this.onChange.bind(this);
  }

  onChange(value) {
    this.setState(() => {
      return {
        selected: !this.state.selected,
      };
    });
  }

  render() {
    return (
      <View>
        <TouchableOpacity onPress={this.onChange}>
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
