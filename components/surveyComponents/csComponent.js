import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';


class CsComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={{marginTop: 100}}>
        <Text> I am the basic cs componentr </Text>
        <Button
          title="next"
          onPress={() => {  this.props.navigation.navigate('Header', {pastPage: "csInfo"}) }}
          />
      </View>
    );
  }
}

export default CsComponent;
