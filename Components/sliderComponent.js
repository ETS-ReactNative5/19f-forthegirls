import React from 'react';
import { Text, View, Slider } from 'react-native';
import colors, { fonts } from '../assets/styles/basicStyle';

class SliderComponent extends React.Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.state = {
    };
  }

  onChange(e) {
    console.log(e);
    const value = e;
    this.props.onChange(this.props.id, value)
    // this.setState(() => {
    //   return {
    //     value: parseFloat(value),
    //   };
    // });
  }

  render() {
    return (
      <View style={{ marginTop: 20 }}>
        <Slider
          step={1}
          maximumValue={100}
          onValueChange={this.onChange}
          value={this.props.value}
          maximumTrackTintColor={colors.white.color}
          minimumTrackTintColor={colors.white.color}
          width={300}
          style={{ marginLeft: 30 }}

        />
        <View style={{
          width: 350,
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginLeft: 12
        }}>
          <Text style={[fonts.bodyText, colors.deepPurple]}>{this.props.min}</Text>
          <Text style={[fonts.bodyText, colors.deepPurple]}>{this.props.max}</Text>
        </View>
      </View>
    );
  }
}

export default SliderComponent;
