import React from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity,  Image } from 'react-native';
import Survey from './Survey.js'
import { Dropdown } from 'react-native-material-dropdown';
import TextField from 'react-native-text-field';
import colors, { fonts, fontEffects } from '../assets/styles/basicStyle';


//this.props.navigation.navigate(name of page you want to go to)


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

    var  surveystuff = (
      <View>
        <TextField
          title="Name"
          placeholder="My Name Is..... "
          onInputChange={(text) => this.onInputChange(text)}
        />
        <Dropdown
                label='Favorite Team Member'
                data={data}
              />
      </View>
    )

    return (
      <View style={{backgroundColor: '#46518725', width: '100%', height: '100%', justifyContent: 'center'}}>
        <View style={{backgroundColor: '#FFFFFF', alignItems: 'center'}}>
          <Text style={[fonts.majorHeading, {alignItems: 'center'}]}>Hi! Welcome to <Text style={{color:'#28C3A9'}}> For the Girls </Text> </Text>
        </View>
        <View style={{backgroundColor: '#28C3A975', alignItems: 'center', paddingTop: 5, paddingBottom: 5}}>
          <Text style={[fonts.minorHeading, {textAlign: 'center'}]}> We are a mentorship app committed to creating lasting mentorship relationships bebtween fellow women in tech </Text>
          <Text  style={[fonts.minorHeading, {color:'#FFFFFF', marginTop:  '5%'}]}> created by women, for women </Text>
        </View>

        <View style={{width:'100%', flexDirection: 'row-reverse', alignItems: 'right', marginTop: 30}}>
          <TouchableOpacity
            onPress={() => {  this.props.navigation.navigate('Prompts', {pastPage: "startScreen"}) }}
            style={{marginRight: 20}}>
            <Image
              source={require('./../assets/icons/arrownext.png')}
              />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default SignUp;
