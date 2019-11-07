import React from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity, ScrollView } from 'react-native';
import mainScreenStyle from '../../assets/styles/mainStyle';
import surveyStyle from '../../assets/styles/surveyStyle';

class CsComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      frontEndPress: false,
      backEndPress: false,
      smallPress: false,
      medPress: false,
      largePress: false,
      meritPress: false,
      engagePress: false,
      fratPress: false,
      fastPress: false,
      organizePress: false,
      stablePress: false,
      formalPress: false,
      webPress: false,
      mobilePress: false,
      userPress: false,
      designPress: false,
      algoPress: false,
      storagePress: false,
    }

    this.pressFrontEnd = this.pressFrontEnd.bind(this);
    this.pressBackEnd = this.pressBackEnd.bind(this);
    this.pressSmall = this.pressSmall.bind(this);
    this.pressMed = this.pressMed.bind(this);
    this.pressLarge = this.pressLarge.bind(this);
    this.pressMerit = this.pressMerit.bind(this);
    this.pressEngage = this.pressEngage.bind(this);
    this.pressFrat = this.pressFrat.bind(this);
    this.pressFast = this.pressFast.bind(this);
    this.pressOrganize = this.pressOrganize.bind(this);
    this.pressStable = this.pressStable.bind(this);
    this.pressFormal = this.pressFormal.bind(this);
    this.pressWeb = this.pressWeb.bind(this);
    this.pressMobile = this.pressMobile.bind(this);
    this.pressUser = this.pressUser.bind(this);
    this.pressDesign = this.pressDesign.bind(this);
    this.pressAlgo = this.pressAlgo.bind(this);
    this.pressStorage = this.pressStorage.bind(this);
  }

  pressFrontEnd() {
    this.setState({frontEndPress: !this.state.frontEndPress});
  }
  pressBackEnd() {
    this.setState({backEndPress: !this.state.backEndPress});
  }
  pressSmall() {
    this.setState({smallPress: !this.state.smallPress});
  }
  pressMed() {
    this.setState({medPress: !this.state.medPress});
  }
  pressLarge() {
    this.setState({largePress: !this.state.largePress});
  }
  pressMerit() {
    this.setState({meritPress: !this.state.meritPress});
  }
  pressEngage() {
    this.setState({engagePress: !this.state.engagePress});
  }
  pressFrat() {
    this.setState({fratPress: !this.state.fratPress});
  }
  pressFast() {
    this.setState({fastPress: !this.state.fastPress});
  }
  pressOrganize() {
    this.setState({organizePress: !this.state.organizePress});
  }
  pressStable() {
    this.setState({stablePress: !this.state.stablePress});
  }
  pressFormal() {
    this.setState({formalPress: !this.state.formalPress});
  }
  pressWeb() {
    this.setState({webPress: !this.state.webPress});
  }
  pressMobile() {
    this.setState({mobilePress: !this.state.mobilePress});
  }
  pressUser() {
    this.setState({userPress: !this.state.userPress});
  }
  pressDesign() {
    this.setState({designPress: !this.state.designPress});
  }
  pressAlgo() {
    this.setState({algoPress: !this.state.algoPress});
  }
  pressStorage() {
    this.setState({storagePress: !this.state.storagePress});
  }




  render() {
    return (
      <ScrollView style={{marginTop: 100}}>
        <Text> CS Questions </Text>
        <View>
          <Text> Front End or Back End? </Text>
          <TouchableOpacity onPress={this.pressFrontEnd}>
            <Text
            style={
                    this.state.frontEndPress
                        ? surveyStyle.pressed
                        : surveyStyle.notPressed
            }>
            Front End </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.pressBackEnd}>
            <Text
            style={
                    this.state.backEndPress
                        ? surveyStyle.pressed
                        : surveyStyle.notPressed
            }>
            Back End </Text>
          </TouchableOpacity>
        </View>
        <View>
          <Text> Dream Company Size? </Text>
          <TouchableOpacity onPress={this.pressSmall}>
            <Text
            style={
                    this.state.smallPress
                        ? surveyStyle.pressed
                        : surveyStyle.notPressed
            }>
            Small </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.pressMed}>
            <Text
            style={
                    this.state.medPress
                        ? surveyStyle.pressed
                        : surveyStyle.notPressed
            }>
            Medium </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.pressLarge}>
            <Text
            style={
                    this.state.largePress
                        ? surveyStyle.pressed
                        : surveyStyle.notPressed
            }>
            Large </Text>
          </TouchableOpacity>
        </View>
        <View>
          <Text> Work Culture? </Text>
          <TouchableOpacity onPress={this.pressMerit}>
            <Text
            style={
                    this.state.meritPress
                        ? surveyStyle.pressed
                        : surveyStyle.notPressed
            }>
            Meritocratic </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.pressEngage}>
            <Text
            style={
                    this.state.engagePress
                        ? surveyStyle.pressed
                        : surveyStyle.notPressed
            }>
            Engaging </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.pressFrat}>
            <Text
            style={
                    this.state.fratPress
                        ? surveyStyle.pressed
                        : surveyStyle.notPressed
            }>
            Fratty </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.pressFast}>
            <Text
            style={
                    this.state.fastPress
                        ? surveyStyle.pressed
                        : surveyStyle.notPressed
            }>
            Fast-Paced </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.pressOrganize}>
            <Text
            style={
                    this.state.organizePress
                        ? surveyStyle.pressed
                        : surveyStyle.notPressed
            }>
            Organized </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.pressStable}>
            <Text
            style={
                    this.state.stablePress
                        ? surveyStyle.pressed
                        : surveyStyle.notPressed
            }>
            Stable </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.pressFormal}>
            <Text
            style={
                    this.state.formalPress
                        ? surveyStyle.pressed
                        : surveyStyle.notPressed
            }>
            Formal </Text>
          </TouchableOpacity>
        </View>
        <View>
          <Text> CS Strengths? </Text>
          <TouchableOpacity onPress={this.pressMed}>
            <Text
            style={
                    this.state.medPress
                        ? surveyStyle.pressed
                        : surveyStyle.notPressed
            }>
            Web Applications </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.pressLarge}>
            <Text
            style={
                    this.state.largePress
                        ? surveyStyle.pressed
                        : surveyStyle.notPressed
            }>
            User Interaction </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.pressLarge}>
            <Text
            style={
                    this.state.largePress
                        ? surveyStyle.pressed
                        : surveyStyle.notPressed
            }>
            Design </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.pressLarge}>
            <Text
            style={
                    this.state.largePress
                        ? surveyStyle.pressed
                        : surveyStyle.notPressed
            }>
            Mobile Applications </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.pressLarge}>
            <Text
            style={
                    this.state.largePress
                        ? surveyStyle.pressed
                        : surveyStyle.notPressed
            }>
            Algorithms & Math </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.pressLarge}>
            <Text
            style={
                    this.state.largePress
                        ? surveyStyle.pressed
                        : surveyStyle.notPressed
            }>
            Storage & Infrastructure </Text>
          </TouchableOpacity>
        </View>
        <Button
          title="next"
          onPress={() => {  this.props.navigation.navigate('Header', {pastPage: "csInfo"}) }}
          />
      </ScrollView>
    );
  }
}

export default CsComponent;
