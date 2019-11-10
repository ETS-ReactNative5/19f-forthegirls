import React, { Component } from 'react';

// import { StyleSheet, Text, View } from 'react-native';
import MainTabBar from './MainTabBar';
import SignInUpStack from './signInUpStack';


class Main extends Component {
  constructor(props) {
    super(props);
  }


  render() {
    if(this.props.signedIn===true) {
      return <MainTabBar/>
    }
    else {
      return <SignInUpStack/>
    } 
  }
}

export default Main;
