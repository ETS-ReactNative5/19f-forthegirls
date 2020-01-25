import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, KeyboardAvoidingView, TextInput, Image } from 'react-native';
import { getUser, getMatches } from '../actions';
import colors, { fonts, fontEffects, buttons } from '../assets/styles/basicStyle';
import { singleChat } from '../assets/styles/chatStyle';
import surveyStyle from '../assets/styles/surveyStyle';
import axios from 'axios';
import Match from './Match';

class SingleChat extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      chats: [],
      chatText: '',
      numberText: 8,
      prompt: 'Click to chat!',
    }

    this.goBack = this.goBack.bind(this);

  }

  componentDidMount() {
    this.getChats();
    this.setPrompt();

  }

  setPrompt = () => {
    if (this.props.navigation.getParam('prompt') !== '') {
      this.setState({ prompt: this.props.navigation.getParam('prompt') });
      this.setState({ chatText: this.props.navigation.getParam('prompt') });
    }

  }

  getChats() {

    const firstID = this.props.id;
    const secondID = this.props.navigation.getParam('matchID');

    axios.get(`https://for-the-girls.herokuapp.com/api/chats/getBetween/${firstID}/${secondID}`)
      .then((response) => {
        this.setState({ chats: response.data });
      }).catch((error) => {
        console.log(error);
      });
  }

  showChats() {
    return this.state.chats.map((n, index) => {
      if (this.state.chats.length - this.state.numberText < index + 1) {
        if (n.sender === this.props.id) {
          return (
            <View style={singleChat.sender} key={index}>
              <Text style={[colors.white, fonts.bodyText]} key={index}>{n.text}</Text>
            </View>
          );
        }
        else {
          return (
            <View style={singleChat.reciever} key={index}>
              <Text style={[colors.black, fonts.bodyText]} key={index}>{n.text}</Text>
            </View>
          );
        }
      }
    })
  }

  addChat = (text) => {
    this.setState({ chatText: text });
  }

  sendChat = () => {

    fields = {
      sender: this.props.id,
      receiver: this.props.navigation.getParam('matchID'),
      text: this.state.chatText
    }


    axios.post(`https://for-the-girls.herokuapp.com/api/chats/add/`, fields)
      .then((response) => {
        this.getChats();
      }).catch((error) => {
        console.log(error);
      });

  }

  loadMore = () => {
    const newNum = this.state.numberText + 10;
    this.setState({ numberText: newNum });
  }

  goBack = () => {
    this.props.navigation.pop();
  }
  // renderInput = () => {
  //   console.log("hi");
  //   if(this.props.navigation.getParam('prompt')!==undefined) {
  //     <TextInput defaultValue={this.props.navigation.getParam('prompt')} onChangeText={this.addChat} onEndEditing={this.sendChat}></TextInput>
  //   }
  //   else {
  //     <TextInput defaultValue={this.state.prompt} onChangeText={this.addChat} onEndEditing={this.sendChat}></TextInput>
  //   }

  // }


  render() {
    //&& this.props.matches.legnth > 0
    return (
      <View>
        <View style={singleChat.header}>
          <View style={singleChat.arrowBack}>
            <TouchableOpacity
              onPress={this.goBack}>
              <Image
                source={require('./../assets/icons/arrowback.png')}
              />
            </TouchableOpacity>
          </View>
          <View style={singleChat.headerTextContainer}>
            <Text style={fonts.minorHeading}>{this.props.navigation.getParam('username')}</Text>
          </View>
        </View>
        <KeyboardAvoidingView behavior="padding" enabled keyboardVerticalOffset={130}>

          <ScrollView>
            <TouchableOpacity style={singleChat.loadmore} onPress={this.loadMore}>
              <Text style={[fonts.minorHeading, colors.deepPurple, fontEffects.center]}>Load More!</Text>
            </TouchableOpacity>
            <View>
              {this.showChats()}
            </View>
            {/* {this.renderInput()} */}
            <TextInput style={[surveyStyle.textField, fonts.minorHeading, colors.deepPurple]} defaultValue={this.state.prompt} onChangeText={this.addChat} onEndEditing={this.sendChat}></TextInput>

          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    )


    // else {
    //   this.props.getMatches(this.props.username);
    //   return (
    //     <Text>Loading...</Text>
    //   )
    // }

  }
}

const mapStateToProps = reduxState => (
  {
    username: reduxState.user.username,
    id: reduxState.auth.id,
  }
);

export default connect(mapStateToProps, { getUser })(SingleChat);
