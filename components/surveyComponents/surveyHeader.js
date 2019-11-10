import React from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity, Image } from 'react-native';
import colors, { fonts, fontEffects } from '../../assets/styles/basicStyle';



class SurveyHeader extends React.Component {
  constructor(props) {
    super(props);
  }

  nextPage = () => {
    var currentPage = this.props.navigation.getParam("pastPage", "none");
    if (currentPage === "startScreen") {
      this.props.navigation.navigate('BasicInfo', {})

    }
    else if(currentPage=== "basicInfo"){
      this.props.navigation.navigate('DemographicInfo', {})
    }
    else if(currentPage=== "demoInfo"){
      this.props.navigation.navigate('CsInfo', {})
    }
    else if(currentPage=== "csInfo"){
      this.props.navigation.navigate('EducationInfo', {})
    }
    else if(currentPage=== "eduInfo"){
    //  this.props.navigation.navigate('ProfessionalInfo', {})
    this.props.navigation.navigate('Prompts', {})

    }
    else if(currentPage=== "profInfo"){
      this.props.navigation.navigate('Prompts', {})
    }
    else if(currentPage=== "promptInfo"){
      this.props.navigation.navigate('PersonalInfo', {})
    }

  }

  render() {
    var currentPage = this.props.navigation.getParam("pastPage", "none");
    var textMessage = "";
    var headerMessage= "";
    if (currentPage === "startScreen") {
      textMessage= "First, lets sign you up for an account"
      headerMessage = "Basic Information"
    }
    else if(currentPage=== "basicInfo"){
      textMessage = "Now, tell us a bit about yourself";
      headerMessage = "Demographic Info"
    }
    else if(currentPage=== "demoInfo"){
      textMessage = "Now, tell us why you are interested in computer science";
      headerMessage = "CompSci Interests"
    }
    else if(currentPage=== "csInfo"){
      textMessage = "Tell us about your education";
      headerMessage = "Education  Experience"
    }
    else if(currentPage=== "eduInfo"){
      // textMessage = "Tell us about your work experience and goals";
      // headerMessage =  "Professional Experience"
      textMessage = "Fill out three conversation prompts to talk to your matches";
      headerMessage = "Prompts"
    }
    // else if(currentPage=== "profInfo"){
    //   textMessage = "Fill out three conversation prompts to talk to your matches";
    //   headerMessage = "Prompts"
    // }
    else if(currentPage=== "promptInfo"){
      textMessage = "Tell us about your personality";
      headerMessage = "How Chill Are You?"
    }
    return (
      <View style={{backgroundColor: '#46518725', width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center'}}>
          <View style={{backgroundColor: '#FFFFFF', alignItems: 'center', paddingTop: 20, paddingBottom: 30, borderRadius:20, width: '90%'}}>
            <Text style={[fonts.majorHeading,  {color: '#28C3A9', alignItems: 'center', marginBottom: 10}]}> {headerMessage} </Text>
            <Text style={[fonts.bodyText], {alignItems: 'center'}}> {textMessage} </Text>
          </View>
          <View style={{width:'100%', flexDirection: 'row-reverse', alignItems: 'right', marginTop: 30}}>
            <TouchableOpacity
              onPress={this.nextPage}
              style={{marginRight: 20}}>
              <Image
                source={require('./../../assets/icons/arrownext.png')}
                />
            </TouchableOpacity>
          </View>
      </View>
    );
  }
}

export default SurveyHeader;
