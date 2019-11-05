import React, { Component } from 'react';

// import { StyleSheet, Text, View } from 'react-native';
import MainTabBar from './MainTabBar';
import SignInUpStack from './signInUpStack';


class Main extends Component {
  constructor(props) {
    super(props);
  }


  render() {
      return <SignInUpStack/>
  }
}

export default Main;
