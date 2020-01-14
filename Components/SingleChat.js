import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, TextInput} from 'react-native';
import { getUser, getMatches } from '../actions';
import colors, { fonts, fontEffects, buttons } from '../assets/styles/basicStyle';
import axios from 'axios';
import Match from './Match';

class SingleChat extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
        chats: [],
        chatText: '',
      }

  }

  componentDidMount() {
     
    this.getChats();

  }

  getChats () {

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
    console.log("CHATS");
    console.log(this.state.chats);
    return this.state.chats.map((n, index) => {
      console.log(n);
      if(n.sender === this.props.id) {
        return (
            <Text style={[colors.turquoise]} key={index}>{n.text}</Text>
          );
      }
      else {
          return (
            <Text style={[colors.purple]} key={index}>{n.text}</Text>
          );
      }
    })
  }

  addChat = (text) => {
    this.setState({chatText:text});
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


  render() {
    //&& this.props.matches.legnth > 0
      return (
        <ScrollView>
          <View>
            {this.showChats()}
          </View>
          <TextInput defaultValue={"Click to Chat!"} onChangeText={this.addChat} onEndEditing={this.sendChat}></TextInput>
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
