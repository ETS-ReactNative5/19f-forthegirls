import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, KeyboardAvoidingView, TextInput, Image } from 'react-native';
import { getUser, getMatches } from '../actions';
import colors, { fonts, fontEffects, buttons, profileImage } from '../assets/styles/basicStyle';
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
      prompt: 'click'//this.props.navigation.getParam('prompt') || '',
    }

    this.goBack = this.goBack.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);

  }

  componentDidMount() {
    console.log(this.props.navigation.getParam('prompt'));
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
    // if (this.props.navigation.getParam('prompt') !== '') {
    //   this.setState({ chatText: this.props.navigation.getParam('prompt') })
    // } else {
    this.setState({ chatText: text });
    // }

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
        this.setState({ chatText: '', prompt: '' })
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

  handleKeyDown = (e) => {
    if (e.nativeEvent.key == "Enter") {
      this.sendChat();
    }
  }

  render() {
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
            <Image source={this.props.navigation.getParam('profilePic') !== undefined ? { uri: this.props.navigation.getParam('profilePic') } : require('./../assets/icons/tim.jpg')} style={profileImage.singleChat} />
            <Text style={fonts.minorHeading}>{this.props.navigation.getParam('username')}</Text>
          </View>
        </View>
        <KeyboardAvoidingView behavior="padding" enabled keyboardVerticalOffset={150}>
          <ScrollView>
            <TouchableOpacity style={singleChat.loadmore} onPress={this.loadMore}>
              <Text style={[fonts.minorHeading, colors.deepPurple, fontEffects.center]}>Load More!</Text>
            </TouchableOpacity>
            <View>
              {this.showChats()}
            </View>
            {/* {this.renderInput()} */}
            <View style={singleChat.chatInputView}>
              <TextInput
                multiline={true}
                clearTextOnFocus={this.props.navigation.getParam('prompt') !== '' && this.state.prompt !== '' ? false : true}
                style={[singleChat.chatInput, fonts.bodyText, colors.deepPurple]}
                defaultValue={this.props.navigation.getParam('prompt')}
                value={this.state.chatText}
                onChangeText={this.addChat}
                onEndEditing={this.sendChat}
                onKeyPress={this.handleKeyDown}
              />
              <TouchableOpacity
                style={{ paddingTop: 2, paddingLeft: 5 }}
                onPress={this.sendChat}>
                <Image
                  source={require('./../assets/icons/arrowup.png')}
                />
              </TouchableOpacity>
            </View>

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
