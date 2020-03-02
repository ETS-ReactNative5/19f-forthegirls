import React from 'react';
import { connect } from 'react-redux';
import { Text, View, TouchableOpacity, Image } from 'react-native';
import colors, { fonts, fontEffects, profileImage } from '../assets/styles/basicStyle';
import profile, { promptStyle, buttons } from '../assets/styles/profileStyle';
import axios from 'axios';
import chatList from '../assets/styles/chatStyle';
import { Linking } from 'react-native'
import BlacklistModal from './BlacklistModal'


class Match extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      match: {},
      mounted: false,
      showModal: false
    }
  }

  componentDidMount() {
    this.setState({ mounted: true });
    axios.get(`https://for-the-girls.herokuapp.com/api/users/${this.props.userId}`)
      .then((response) => {
        if (this.state.mounted) {
          this.setState({ match: response.data.result });
        }
      }).catch((error) => {
        console.log(error);
      });
  }

  componentWillUnmount() {
    this.setState({ mounted: false });
  }

  deleteMatch = () => {
    this.props.deleteMatch(this.props.matchID);
  }

  blockMatch = () => {
    this.props.blockMatch(this.props.matchID);
  }

  reportMatch = () => {
    this.props.reportMatch(this.props.matchID);
  }

  blacklistMatch = () => {
    this.setState({ showModal: true });
  }

  renderModal = () => {
    if (this.state.showModal) {
      return (
        <BlacklistModal reset={this.resetModal} block={this.blockMatch} report={this.reportMatch} delete={this.deleteMatch} />
      );
    }
  }

  returnName = () => {
    if(this.props.bold) {
      return (
        <Text style={[fonts.minorHeading, chatList.unreadUsername]} key={this.state.match.username}>• {this.state.match.username}</Text>
      )
    }
    else {
      return (
        <Text style={[fonts.minorHeading, chatList.username]} key={this.state.match.username}>{this.state.match.username}</Text>
      )
    }
  }

  resetModal = () => {
    this.setState({ showModal: false });
  }

  render() {
    return (
      <TouchableOpacity
        key={this.props.i}
        onPress={() => this.props.nav.navigate('SingleChat', { matchID: this.state.match._id, prompt: '', username: this.state.match.username, profilePic: this.state.match.profileURL })}>
        {this.renderModal()}
        <View key={this.state.match._id} style={[this.props.i % 2 === 0 ? chatList.listItemPurple : chatList.listItemWhite, chatList.listItem]}>
          <Image source={this.state.match.profileURL !== undefined ? { uri: this.state.match.profileURL } : require('./../assets/icons/propic.jpg')} style={profileImage.allChatsPage} />
          {this.returnName()}
        </View>
        <View style={chatList.delete}>
          <TouchableOpacity
            key={this.props.i + 1}
            onPress={() => this.blacklistMatch()}>
            <Text style={[fonts.majorHeading, colors.red, fontEffects.center]}>X</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    )
  }
}

export default Match;
