import React from 'react';
import { connect } from 'react-redux';
import { Text, View, TouchableOpacity, Image } from 'react-native';
import colors, { fonts, fontEffects } from '../assets/styles/basicStyle';
import profile, { promptStyle, buttons } from '../assets/styles/profileStyle';
import axios from 'axios';
import chatList from '../assets/styles/chatStyle';
import { Linking } from 'react-native'

class Match extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      match: {}
    }
  }

  componentDidMount() {
    axios.get(`https://for-the-girls.herokuapp.com/api/users/${this.props.userId}`)
      .then((response) => {
        this.setState({ match: response.data.result });
      }).catch((error) => {
        console.log(error);
      });
  }

  pressUser = (email) => {
    Linking.openURL('mailto:' + email + '?subject=We Matched!')
      .catch((error) => console.log("email error" + error));
  }

  render() {
    return (
      <View key={this.state.match._id} style={[this.props.i % 2 === 0 ? chatList.listItemPurple : chatList.listItemWhite, chatList.listItem]}>
        <Text style={[fonts.minorHeading, chatList.username]} key={this.state.match.username}>{this.state.match.username}</Text>
        <View style={chatList.chatButton}>
          <TouchableOpacity
            key={this.props.i}
            onPress={() => this.pressUser(this.state.match.email)}>
            <Text style={[fonts.majorHeading, colors.turquoise, fontEffects.center]}>Chat</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

export default Match;