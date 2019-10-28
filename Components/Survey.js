import React from 'react';
import { StyleSheet, Text, View, Button} from 'react-native';
import MainScreen from './MainScreen.js'


class Survey extends React.Component {
  constructor(props) {
    super(props);
    this.state = {goToMatches:false}
  }

  render() {
    if(this.state.goToMatches){
      return(
        <MainScreen />
      )
    }
    return (
      <View>
        <Text>I am a survey </Text>
        <Text> Question 1.... </Text>
        <Text> Question 2.... </Text>
        <Button title="Finish... See My Matches" onPress={()=> {this.setState({goToMatches:true})}}/>
      </View>
    );
  }
}

export default Survey;
