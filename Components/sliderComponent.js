import React from 'react';
import { Text, View, Slider } from 'react-native';
import colors, { fonts } from '../assets/styles/basicStyle';

class SliderComponent extends React.Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    const value = e;
    this.props.onChange(this.props.id, value)
  }

  render() {
    return (
      <View style={{ marginTop: 20 }}>
        <Slider
          step={1}
          maximumValue={100}
          onSlidingComplete={this.onChange}
          value={this.props.value}
          maximumTrackTintColor={colors.veryLightPurple.color}
          minimumTrackTintColor={colors.veryLightPurple.color}
          width={300}
          style={{ marginLeft: 30 }}

        />
        <View style={{
          width: 350,
          flexDirection: 'row',
          justifyContent: 'space-between'
        }}>
          <Text style={[fonts.bodyText, colors.deepPurple]}>{this.props.min}</Text>
          <Text style={[fonts.bodyText, colors.deepPurple]}>{this.props.max}</Text>
        </View>
      </View>
    );
  }
}

export default SliderComponent;

