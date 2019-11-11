import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { Dropdown } from 'react-native-material-dropdown';
import TextField from 'react-native-text-field';
import colors, { fonts, fontEffects } from '../../assets/styles/basicStyle';



class PromptsComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      promptOneQuestion: '',
      promptOneAnswer:  '',
      promptTwoQuestion: '',
      promptTwoAnswer:  '',
      promptThreeQuestion: '',
      promptThreeAnswer:  '',
    }
  }

  onInputChange = (text) => {
    console.log(text)
    //change state in here
  }

  render() {
    let data = [{
      value: 'Woman in tech inspiration?',
    }, {
      value: 'Favorite app?',
    }, {
      value: 'iOS or android?',
    }, {
      value: 'favorite programming language',
    }, {
      value: 'coffee or tea',
    }, {
      value: 'spaces or tabs',
    }, {
      value: 'what could you give a ted talk on',
    }];

    var eduInfo =  this.props.navigation.getParam("eduInfo",  null);
    var basicInfo = this.props.navigation.getParam("basicInfo",  null);
    var demoInfo = this.props.navigation.getParam("demoInfo",  null);
    var csInfo = this.props.navigation.getParam("csInfo",  null);
    var promptInfo = {
      'promptOneQuestion': 'a',
      'promptOneAnswer':  'b',
      'promptTwoQuestion': 'c',
      'promptTwoAnswer':  'd',
      'promptThreeQuestion': 'e',
      'promptThreeAnswer':  'f',
    }

    return (
      <View style={{backgroundColor: '#28C3A975', width: '100%', height: '100%'}}>
        <Text style={[fonts.bodyText]} > Choose a Prompt from the drop down to answer </Text>

        <Dropdown
                label='Question 1'
                data={data}
        />
        <TextField
          //title="Question1"
          placeholder="Type Answer to Question one"
          onInputChange={(text) => this.onInputChange(text)}
        />
        <Dropdown
                label='Question 2'
                data={data}
        />
        <TextField
        //  title="Question2"
          placeholder="Type Answer to Question two"
          onInputChange={(text) => this.onInputChange(text)}
        />
        <Dropdown
                label='Question 3'
                data={data}
        />
        <TextField
        //  title="Question3"
          placeholder="Type Answer to Question three"
          onInputChange={(text) => this.onInputChange(text)}
        />
        <Button
          title="next"
          onPress={() => {  this.props.navigation.navigate('Header', {pastPage: "promptInfo", basicInfo: basicInfo, demoInfo: demoInfo, csInfo: csInfo, eduInfo: eduInfo, promptInfo: promptInfo}) }}
          />
      </View>
    );
  }
}

export default PromptsComponent;
