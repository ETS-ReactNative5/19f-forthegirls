import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';


class BasicSignUpComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={{marginTop: 100}}>
        <Text> I am the basic sign up component </Text>
        <Button
          title="next"
          onPress={() => {  this.props.navigation.navigate('Header', {pastPage: "basicInfo"}) }}
          />

      </View>
    );
  }
}

export default BasicSignUpComponent;
