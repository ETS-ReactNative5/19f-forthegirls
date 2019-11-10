import React from 'react';
import { Text, View, Button } from 'react-native';
import colors, { logo, fonts } from '../assets/styles/basicStyle';
import { signoutUser } from '../actions';
import { connect } from 'react-redux';

class LogoBar extends Component {
  constructor(props) {
    super(props);
  }

  logOut = () => {
    this.props.signoutUser();
  }

  render() {
    return (
      <View style={logo.barContainer}>
        <Text style={[fonts.majorHeading, colors.white]}>FTG</Text>
        <Button onPress={this.logOut}>Log Out</Button>
    </View>
    );
  }
}

function mapStateToProps(reduxState) {
  return {
    error: reduxState.error,
  };
}

export default connect(mapStateToProps, { signoutUser })(LogoBar);
