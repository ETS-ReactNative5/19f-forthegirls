import React from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity, Image } from 'react-native';
import colors, { fonts, buttons } from '../../assets/styles/basicStyle';
import surveyStyle from '../../assets/styles/surveyStyle';

class SurveyHeader extends React.Component {
  constructor(props) {
    super(props);
  }

  nextPage = () => {
    var currentPage = this.props.navigation.getParam("pastPage", "none");
    var basicInfo = this.props.navigation.getParam("basicInfo", null);
    var demoInfo = this.props.navigation.getParam("demoInfo", null);
    var csInfo = this.props.navigation.getParam("csInfo", null);
    var eduInfo = this.props.navigation.getParam("eduInfo", null);
    var promptInfo = this.props.navigation.getParam("promptInfo", null);

    if (currentPage === "startScreen") {
      this.props.navigation.navigate('BasicInfo', {})
    }
    else if (currentPage === "basicInfo") {
      this.props.navigation.navigate('DemographicInfo', { basicInfo: basicInfo })
    }
    else if (currentPage === "demoInfo") {
      this.props.navigation.navigate('CsInfo', { basicInfo: basicInfo, demoInfo: demoInfo })
    }
    else if (currentPage === "csInfo") {
      this.props.navigation.navigate('EducationInfo', { basicInfo: basicInfo, demoInfo: demoInfo, csInfo: csInfo })
    }
    else if (currentPage === "eduInfo") {
      //  this.props.navigation.navigate('ProfessionalInfo', {})
      this.props.navigation.navigate('Prompts', { basicInfo: basicInfo, demoInfo: demoInfo, csInfo: csInfo, eduInfo: eduInfo })

    }
    else if (currentPage === "profInfo") {
      this.props.navigation.navigate('Prompts', { basicInfo: basicInfo, demoInfo: demoInfo, csInfo: csInfo, eduInfo: eduInfo, promptInfo: promptInfo })
    }
    else if (currentPage === "promptInfo") {
      this.props.navigation.navigate('PersonalInfo', { basicInfo: basicInfo, demoInfo: demoInfo, csInfo: csInfo, eduInfo: eduInfo, promptInfo: promptInfo })
    }

  }

  render() {
    var currentPage = this.props.navigation.getParam("pastPage", "none");
    var textMessage = "";
    var headerMessage = "";
    if (currentPage === "startScreen") {
      textMessage = "First, lets sign you up for an account"
      headerMessage = "Basic Information"
    }
    else if (currentPage === "basicInfo") {
      textMessage = "Now, tell us a bit about yourself";
      headerMessage = "Demographic Info"
    }
    else if (currentPage === "demoInfo") {
      textMessage = "Now, tell us why you are interested in computer science";
      headerMessage = "CompSci Interests"
    }
    else if (currentPage === "csInfo") {
      textMessage = "Tell us about your education";
      headerMessage = "Education  Experience"
    }
    else if (currentPage === "eduInfo") {
      // textMessage = "Tell us about your work experience and goals";
      // headerMessage =  "Professional Experience"
      textMessage = "Fill out three conversation prompts to talk to your matches";
      headerMessage = "Prompts"
    }
    // else if(currentPage=== "profInfo"){
    //   textMessage = "Fill out three conversation prompts to talk to your matches";
    //   headerMessage = "Prompts"
    // }
    else if (currentPage === "promptInfo") {
      textMessage = "Tell us about your personality";
      headerMessage = "How Chill Are You?"
    }
    return (
      <View style={surveyStyle.surveyHeaderContainer}>
        <View style={surveyStyle.surveyHeader}>
          <Text style={[fonts.majorHeading, surveyStyle.surveyHeaderText]}> {headerMessage} </Text>
          <Text style={[fonts.bodyText, colors.deepPurple]}> {textMessage} </Text>
        </View>
        <View style={buttons.arrowView}>
          <TouchableOpacity
            onPress={this.nextPage}
            style={{ marginRight: 20 }}>
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
