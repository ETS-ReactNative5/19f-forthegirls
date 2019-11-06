import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';


class PersonalComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={{marginTop: 100}}>
        <Text> I am the basic personal componentr </Text>
        <Button
          title="submit survey"
          onPress={() => {  this.props.navigation.navigate('Main', {}) }}
          />
      </View>
    );
  }
}

export default PersonalComponent;
