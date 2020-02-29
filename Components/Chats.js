import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Animated, Easing } from 'react-native';
import { getUser, getMatches, deleteMatch, blockUser, reportUser, checkUnreadUsers } from '../actions';
import colors, { fonts, fontEffects, buttons } from '../assets/styles/basicStyle';
import axios from 'axios';
import Match from './Match';
import { NavigationEvents } from 'react-navigation';

/* animation:
 // https://facebook.github.io/react-native/docs/animated#timing
 // https://stackoverflow.com/questions/37445090/react-native-how-do-you-animate-the-rotation-of-an-image
*/

class Chats extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      animation: false,
    }

    this.spinValue = new Animated.Value(0);
  }

  componentDidMount() {
    this.props.getUser(this.props.id);
    this.spin();
    this.props.checkUnreadUsers(this.props.id);
    this.setState({ animation: true });
    this.interval = setInterval(() => this.refreshUnreadUsers(), 5000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  refreshUnreadUsers = () => {
    this.props.checkUnreadUsers(this.props.id);
  }

  deleteMatch = (matchID) => {
    this.props.deleteMatch(this.props.id, matchID, this.props.username);
  }

  reportMatch = (matchID) => {
    this.props.reportUser(this.props.id, matchID);
  }

  blockMatch = (matchID) => {
    this.props.blockUser(this.props.id, matchID, this.props.username)
    this.props.getMatches(this.props.username);
  }

  spin() {
    this.spinValue.setValue(0)
    Animated.timing(
      this.spinValue,
      {
        toValue: 1,
        duration: 500,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: true
      }
    ).start(() => this.spin())
    if ((this.props.potentialMatches !== undefined && this.props.potentialMatches.legnth !== 0) ||
      (this.props.potentialMatches !== undefined && this.props.potentialMatches.legnth === 0)) {
      this.setState({ animation: false })
    }

  }

  showMatches() {
    var i = -1;
      return this.props.matches.map((n) => {
        i++;
        var isBold = false;
        for(u=0; u < this.props.unreadPeople.length; u++) {
          if(this.props.unreadPeople[u] === n) {
            isBold = true;
            break;
          }
        }
        return (
          <Match
            key={n}
            userId={n}
            i={i}
            deleteMatch={this.deleteMatch}
            blockMatch={this.blockMatch}
            reportMatch={this.reportMatch}
            matchID={n}
            nav={this.props.navigation}
            bold={isBold}
          />
        )
      })
  }

  render() {

    const spin = this.spinValue.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '360deg']
    })
    var loading = (
      <View style={{
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%'
      }}>
        <Animated.Image
          style={{
            height: 200,
            width: 200,
            transform: [{ rotate: spin }]
          }}
          source={require('./../assets/icons/loading.png')}
        />
        <Text style={[fonts.majorHeading, colors.deepPurple]}>Loading Your Chats!</Text>
      </View>);

    if (this.props.matches !== undefined && this.props.matches.legnth !== 0 && this.props.unreadPeople !== undefined ) {
      return (
        <ScrollView>
          <NavigationEvents onDidFocus={this.refreshUnreadUsers}>
          </NavigationEvents>
          <View>
            <Text style={[colors.deepPurple, fonts.majorHeading, fontEffects.center]}>Matches</Text>
            {this.showMatches()}
          </View>
        </ScrollView>
      )
    }
    else if (this.props.matches !== undefined && this.props.matches.length !== 0 && this.props.unreadPeople !== undefined ) {
      return (
        <View>
          <Text style={[colors.deepPurple, fonts.majorHeading, fontEffects.center]}>Matches</Text>
          <Text style={[fonts.majorHeading, fontEffects.center]}>No matches yet!</Text>
        </View>
      )
    }
    else {
      this.props.getMatches(this.props.username);
      return (loading);
    }

  }
}

const mapStateToProps = reduxState => (
  {
    username: reduxState.user.username,
    id: reduxState.auth.id,
    email: reduxState.user.email,
    matches: reduxState.user.matches,
    unreadPeople: reduxState.chats.unreadPeople,
  }
);

export default connect(mapStateToProps, { getMatches, getUser, deleteMatch, blockUser, reportUser, checkUnreadUsers})(Chats);
