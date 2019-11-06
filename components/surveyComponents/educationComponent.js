import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';


class EducationComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={{marginTop: 100}}>
        <Text> I am the basic education componentr </Text>
        <Button
          title="next"
          onPress={() => {  this.props.navigation.navigate('Header', {pastPage: "eduInfo"}) }}
          />
      </View>
    );
  }
}

export default EducationComponent;
