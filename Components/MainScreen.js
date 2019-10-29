import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import BottomNavBar from './BottomNavBar.js'
import Chats from './Chats.js'
import Profile from './Profile.js'
import Events from './Events.js'
import Matches from './Matches.js'
import mainScreenStyle from '../assets/styles/mainStyle';
import profile from '../assets/styles/profileStyle';

class MainScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = { goToChats: false, goToProfile: false, goToMatches: true, goToEvents: false }
  }

  eventsCallBack = () => {
    this.setState({ goToEvents: true, goToChats: false, goToProfile: false, goToMatches: false })
  }

  profileCallBack = () => {
    this.setState({ goToProfile: true, goToEvents: false, goToChats: false, goToMatches: false })
  }

  chatsCallBack = () => {
    this.setState({ goToChats: true, goToProfile: false, goToMatches: false, goToEvents: false })
  }

  matchesCallBack = () => {
    this.setState({ goToChats: false, goToProfile: false, goToMatches: true, goToEvents: false })
  }

  render() {
    var view;
    if (this.state.goToChats) {
      view = <Chats />
    }
    else if (this.state.goToProfile) {
      return (
        <View style={profile.profileContainer}>
          <Profile />
          <BottomNavBar matchesCallBack={this.matchesCallBack} eventsCallBack={this.eventsCallBack} chatsCallBack={this.chatsCallBack} profileCallBack={this.profileCallBack} />
        </View>
      );
    }
    else if (this.state.goToEvents) {
      view = <Events />
    }
    else {
      view = <Matches />
    }

    return (
      <View style={[mainScreenStyle.height]}>
        {view}
        <BottomNavBar
          goToChats={this.state.goToChats}
          goToProfile={this.state.goToProfile}
          goToEvents={this.state.goToEvents}
          eventsCallBack={this.eventsCallBack}
          chatsCallBack={this.chatsCallBack}
          profileCallBack={this.profileCallBack}/>
      </View>
    );
  }
}

export default MainScreen;
