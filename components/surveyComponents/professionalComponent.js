import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';


class ProfessionalComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      
    }
  }

  //dream company
  //dream company size
  //dream job
  //favorite thing about past work experience

  render() {
    return (
      <View style={{marginTop: 100}}>
        <Text> I am the basic professional componentr </Text>
        <Button
          title="next"
          onPress={() => {  this.props.navigation.navigate('Header', {pastPage: "profInfo"}) }}
          />
      </View>
    );
  }
}

export default ProfessionalComponent;
