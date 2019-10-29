import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

class BottomNavBar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View>
        <Button title="Events" onPress={this.props.eventsCallBack} />
        <Button title="Chats" onPress={this.props.chatsCallBack} />
        <Button title="Profile" onPress={this.props.profileCallBack} />
        <Button title="Matches" onPress={this.props.matchesCallBack} />

      </View>
    );
  }
}

export default BottomNavBar;
