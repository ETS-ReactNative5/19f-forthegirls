import React from 'react';
import { StyleSheet, Text, View, Button, ScrollView } from 'react-native';
import BottomNavBar from './BottomNavBar.js'
import Chats from './Chats.js'
import Profile from './Profile.js'
import Events from './Events.js'
// import TopNav from './TopNav.js'
import Matches from './Matches.js'
// import Settings from './Settings.js'
import profile from '../assets/styles/profileStyle';

class MainScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = { goToChats: false, goToProfile: false, goToMatches: true, goToEvents: false, goToSettings: false }
  }

  eventsCallBack = () => {
    this.setState({ goToEvents: true, goToChats: false, goToProfile: false, goToMatches: false, goToSettings: false })
  }

  profileCallBack = () => {
    this.setState({ goToProfile: true, goToEvents: false, goToChats: false, goToMatches: false, goToSettings: false })
  }

  chatsCallBack = () => {
    this.setState({ goToChats: true, goToProfile: false, goToMatches: false, goToEvents: false, goToSettings: false })
  }

  matchesCallBack = () => {
    this.setState({ goToChats: false, goToProfile: false, goToMatches: true, goToEvents: false, goToSettings: false })
  }

  settingsCallBack = () => {
    this.setState({ goToChats: false, goToProfile: false, goToMatches: false, goToEvents: false, goToSettings: true })
  }

  render() {
    var view;
    if (this.state.goToChats) {
      view = <Chats />
    }
    else if (this.state.goToProfile) {
      view = (<View style={profile.profileContainer}>
        <Profile isMyProfile={true} />
      </View>)
    }
    else if (this.state.goToEvents) {
      view = <Events />
    }
    // else if (this.state.goToSettings) {
    //   view = <Settings />
    // }
    else {
      view = <Matches />
    }

    return (
      //  style={[mainScreenStyle.height]} -- breaks the style!
      <View >
        <View style={{ top: 25, height: '82%' }}>
          {view}
        </View>
        <BottomNavBar
          goToChats={this.state.goToChats}
          goToProfile={this.state.goToProfile}
          goToEvents={this.state.goToEvents}
          eventsCallBack={this.eventsCallBack}
          chatsCallBack={this.chatsCallBack}
          profileCallBack={this.profileCallBack} />
      </View>
    );
  }
}

export default MainScreen;
