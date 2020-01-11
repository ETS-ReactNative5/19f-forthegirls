import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { getUser, getMatches } from '../actions';
import colors, { fonts, fontEffects, buttons } from '../assets/styles/basicStyle';
import axios from 'axios';
import Match from './Match';

class SingleChat extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
        chats: {},
      }

  }

  componentDidMount() {
     
    userInfo = {
        firstID: this.props.id,
        secondID: this.props.navigation.getParam('matchID')
    }

    axios.get(`https://for-the-girls.herokuapp.com/api/chats/getBetween`, userInfo)
    .then((response) => {
        console.log(response.data);
        this.setState({ chats: response.data.result });
    }).catch((error) => {
      console.log(error);
    });

  }

  showChats() {
    console.log(this.state.chats);
    return this.props.chats.map((n) => {
      if(n.sender === this.props.id) {
        return (
            <Text style={[colors.turquoise]} key={n}>{n.text}</Text>
          );
      }
      else {
          return (
            <Text style={[colors.purple]} key={n}>{n.text}</Text>
          );
      }
    })
  }


  render() {
    //&& this.props.matches.legnth > 0
      return (
        <ScrollView>
          <View>
            {showChats()}
          </View>
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
