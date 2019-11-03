import React, { Component } from 'react';

// import { StyleSheet, Text, View } from 'react-native';
import MainTabBar from './MainTabBar';

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userSignedIn: true,
    };
  }


  render() {
    if (this.state.userSignedIn === true) {
      return <MainTabBar />;
    } else {
      return <Text> Signup / in here</Text>;
    }
  }
}

export default Main;
