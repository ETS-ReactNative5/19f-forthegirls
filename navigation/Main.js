import React, { Component, useEffect } from 'react';

// import { StyleSheet, Text, View } from 'react-native';
import MainTabBar from './MainTabBar';
import SignInUpStack from './signInUpStack';
import { connect } from 'react-redux';



class Main extends Component {
  constructor(props) {
    super(props);
  
  }


  render() {
    if(this.props.auth) {
      return <MainTabBar/>
    }
    else {
      return <SignInUpStack/>
    } 
  }
}

const mapStateToProps = reduxState => (
  {
    auth: reduxState.auth.authenticated,
  }
);

export default connect(mapStateToProps, null)(Main);
