import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import Survey from './Survey.js'
import { Dropdown } from 'react-native-material-dropdown';
import TextField from 'react-native-text-field';




class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = { beginsurvey: false }
  }

  onInputChange = (text) => {
    console.log(text);
  }

  render() {
    if (this.state.beginsurvey) {
      return (
        <Survey />
      )
    }

    let data = [{
      value: 'Morgan',
    }, {
      value: 'Annika',
    }, {
      value: 'Frances',
    }, {
      value: 'Sami',
    }, {
      value: 'Alexis',
    }];

    return (
      <View style={{marginTop: 100}}>
        <Text>Yay you are signing up</Text>
        <Text> Need to fill out survey </Text>
        <TextField
          title="Name"
          placeholder="My Name Is..... "
          onInputChange={(text) => this.onInputChange(text)}
        />
        <Dropdown
                label='Favorite Team Member'
                data={data}
              />
        <Button title="clickToBeginSurvey" onPress={() => {  this.props.navigation.navigate('Header', {pastPage: "startScreen"}) }} />
      </View>
    );
  }
}

export default SignUp;
