import React from 'react';
import { Button, View, Text } from 'react-native';
import SliderComponent from './sliderComponent';
import { signUpUser } from '../../actions';
import { connect } from 'react-redux';
import colors, { fonts, fontEffects } from '../../assets/styles/basicStyle';
import { TouchableOpacity } from 'react-native-gesture-handler';
import surveyStyle from '../../assets/styles/surveyStyle';

class PersonalComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      introextro: 50,
      listenfollow: 50
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
    console.log(`parent: ${this.state.introextro}`);
  }

  render() {
    var eduInfo = this.props.navigation.getParam("eduInfo", null);
    var basicInfo = this.props.navigation.getParam("basicInfo", null);
    var demoInfo = this.props.navigation.getParam("demoInfo", null);
    var csInfo = this.props.navigation.getParam("csInfo", null);
    var promptInfo = this.props.navigation.getParam("promptInfo", null);
    var personalInfo = {
      introextro: this.state.introextro,
      listenfollow: this.state.listenfollow
    }
    return (
      <View style={surveyStyle.surveyBackground}>
        <Text style={[fonts.majorHeading, fontEffects.center]}>
          Fill out personality scales so we can best match you!
        </Text>
        <SliderComponent id='introextro' onChange={this.handleSliderChange} value={this.state.introextro} min='introvert' max='extrovert' />
        <SliderComponent id='listenfollow' onChange={this.handleSliderChange} value={this.state.listenfollow} min='listener' max='leader' />
        <View style={surveyStyle.submitButton}>
          <TouchableOpacity
            onPress={this.submitSignUp}>
            <Text style={[fonts.majorHeading, colors.white]}>Submit Survey</Text>
          </TouchableOpacity>
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
