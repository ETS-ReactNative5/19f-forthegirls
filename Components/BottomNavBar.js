import React from 'react';
import { StyleSheet, Text, View, Button, Image, TouchableOpacity } from 'react-native';
import bottomNav from '../assets/styles/bottomNav';


class BottomNavBar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
<<<<<<< HEAD
    return (
      <View>
        <Button title="Events" onPress={this.props.eventsCallBack} />
        <Button title="Chats" onPress={this.props.chatsCallBack} />
        <Button title="Profile" onPress={this.props.profileCallBack} />
        <Button title="Matches" onPress={this.props.matchesCallBack} />
=======
    var chatLink = this.props.goToChats ? require('../assets/icons/chatSelected.png') : require('../assets/icons/chatUnselected.png');
    var eventLink = this.props.goToEvents ? require('../assets/icons/eventSelected.png') : require('../assets/icons/eventUnselected.png');
    var profileLink = this.props.goToProfile ? require('../assets/icons/profileSelected.png') : require('../assets/icons/profileUnSelected.png');
>>>>>>> f41c13bb... adding bottom nav bar

  
    return (
      <View style={[bottomNav.bottomLayout, bottomNav.borderTop]}>
        <TouchableOpacity onPress={this.props.chatsCallBack} >
          <Image
            source={chatLink}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={this.props.eventsCallBack} >
          <Image
            source={eventLink}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={this.props.profileCallBack} >
          <Image
            source={profileLink}
          />
        </TouchableOpacity>
      </View>
    );
  }
}

export default BottomNavBar;
