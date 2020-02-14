import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { singleChat } from '../assets/styles/chatStyle';
import {fonts } from '../assets/styles/basicStyle';


//this.props.navigation.navigate(name of page you want to go to)


class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  goBack = () => {
    this.props.navigation.pop();
  }

  render() {

    return (
      <View style={{ backgroundColor: '#46518725', width: '100%', height: '100%', justifyContent: 'center' }}>
        <View style={[singleChat.arrowBack]}>
          <TouchableOpacity
            onPress={this.goBack}>
            <Image
              source={require('./../assets/icons/arrowback.png')}
            />
         </TouchableOpacity>
      </View>
        <View style={{ backgroundColor: '#FFFFFF', alignItems: 'center' }}>
          <Text style={[fonts.majorHeading, { alignItems: 'center' }]}>Hi! Welcome to <Text style={{ color: '#28C3A9' }}> For the Girls </Text> </Text>
        </View>
        <View style={{ backgroundColor: '#28C3A975', alignItems: 'center', paddingTop: 5, paddingBottom: 5 }}>
          <Text style={[fonts.minorHeading, { textAlign: 'center' }]}> We are a mentorship app committed to creating lasting mentorship relationships between fellow women in tech </Text>
          <Text style={[fonts.minorHeading, { color: '#FFFFFF', marginTop: '5%' }]}> created by women, for women </Text>
        </View>

        <View style={{ width: '100%', flexDirection: 'row-reverse', alignItems: 'right', marginTop: 30 }}>
          <TouchableOpacity
            onPress={() => { this.props.navigation.navigate('BasicInfo', {}) }}
            style={{ marginRight: 20 }}>
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
