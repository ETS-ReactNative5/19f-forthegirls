import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';


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
      this.props.navigation.navigate('ProfessionalInfo', {})
    }
    else if(currentPage=== "profInfo"){
      this.props.navigation.navigate('PersonalInfo', {})
    }

  }

  render() {
    var currentPage = this.props.navigation.getParam("pastPage", "none");
    var textMessage = "";
    if (currentPage === "startScreen") {
      textMessage= "First, lets sign you up for an account"
    }
    else if(currentPage=== "basicInfo"){
      textMessage = "Now, tell us a bit about yourself";
    }
    else if(currentPage=== "demoInfo"){
      textMessage = "Now, tell us why you are interested in computer science";
    }
    else if(currentPage=== "csInfo"){
      textMessage = "Tell us about your education";
    }
    else if(currentPage=== "eduInfo"){
      textMessage = "Tell us about your work experience and goals";
    }
    else if(currentPage=== "profInfo"){
      textMessage = "Tell us about your personality";
    }
    return (
      <View style={{marginTop: 100}}>
        <Text> I am the header </Text>
        <Text> {textMessage} </Text>
        <Button title="next" onPress={this.nextPage} />

      </View>
    );
  }
}

export default SurveyHeader;
