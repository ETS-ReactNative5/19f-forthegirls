import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { Dropdown } from 'react-native-material-dropdown';
import TextField from 'react-native-text-field';
import colors, { fonts, fontEffects } from '../../assets/styles/basicStyle';



class PromptsComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  onInputChange = (text) => {
    console.log(text)
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
          onPress={() => {  this.props.navigation.navigate('Header', {pastPage: "promptInfo"}) }}
          />
      </View>
    );
  }
}

export default PromptsComponent;
