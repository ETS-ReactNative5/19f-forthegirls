import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, TextInput } from 'react-native';
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
      numberText: 10
    }

  }

  componentDidMount() {

    this.getChats();

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


  render() {
    //&& this.props.matches.legnth > 0
    return (
      <ScrollView>
        <TouchableOpacity onPress={this.loadMore}>
          <Text>Load More!</Text>
        </TouchableOpacity>
        <View>
          {this.showChats()}
        </View>
        <TextInput style={surveyStyle.textField} defaultValue={"Click to Chat!"} onChangeText={this.addChat} onEndEditing={this.sendChat}></TextInput>
      </ScrollView>
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
