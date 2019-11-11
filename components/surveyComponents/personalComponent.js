import React from 'react';
import { Button, View, Text } from 'react-native';
import SliderComponent from './sliderComponent';
import { signUpUser } from '../../actions';
import { connect } from 'react-redux';
import colors, { fonts } from '../../assets/styles/basicStyle';

class PersonalComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 50,
    };
    this.handleSliderChange = this.handleSliderChange.bind(this);
  }

  submitSignUp = () => {
    //need to create a fields object with all their answers
    const fields =
    {
      username: 'newP',
      password: 'password',
      email: 'email',
    }

    this.props.signUpUser(fields, this.props.navigation);
  }

  handleSliderChange(sliderId, value) {
    this.setState({ [sliderId]: value });
  }

  render() {
    var eduInfo =  this.props.navigation.getParam("eduInfo",  null);
    var basicInfo = this.props.navigation.getParam("basicInfo",  null);
    var demoInfo = this.props.navigation.getParam("demoInfo",  null);
    var csInfo = this.props.navigation.getParam("csInfo",  null);
    var promptInfo = this.props.navigation.getParam("promptInfo",  null);
    return (
      <View>
        <View>
          <Text style={fonts.majorHeading}>
            fill out personality scales so we can best match you
        </Text>
        </View>
        <View style={{ backgroundColor: colors.turquoise.color }}>
          <SliderComponent id='introextro' onChange={this.handleSliderChange} value={this.state[id]} min='introvert' max='extrovert' />
          <SliderComponent id='listenfollow' onChange={this.handleSliderChange} value={this.state[id]} min='listener' max='leader' />
          <Button
            title="submit survey"
            onPress={this.submitSignUp}
          />
        </View>
      </View>
    );
  }
}

function mapStateToProps(reduxState) {
  return {
    error: reduxState.error,
  };
}

export default connect(mapStateToProps, { signUpUser })(PersonalComponent);
