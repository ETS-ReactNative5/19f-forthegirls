import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { signUpUser } from '../../actions';
import { connect } from 'react-redux';


class PersonalComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  submitSignUp = () => {
    //need to create a fields object with all their answers
    const fields = 
    {
      username: 'newPerson5594',
      password: 'password',
      email: 'email12368242',
    }

    this.props.signUpUser(fields, this.props.navigation);
  }

  render() {
    return (
      <View style={{marginTop: 100}}>
        <Text> I am the basic personal componentr </Text>
        <Button
          title="submit survey"
          onPress={this.submitSignUp}
          />
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
