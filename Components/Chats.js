import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Animated, Easing } from 'react-native';
import { getUser, getMatches, deleteMatch } from '../actions';
import colors, { fonts, fontEffects, buttons } from '../assets/styles/basicStyle';
import axios from 'axios';
import Match from './Match';


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
    this.setState({ animation: true });
  }

  deleteMatch = (matchID) => {
    this.props.deleteMatch(this.props.id, matchID, this.props.username);
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
      return (
        <Match
          key={n}
          userId={n}
          i={i}
          deleteMatch={this.deleteMatch}
          matchID={n}
          nav={this.props.navigation}
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

    if (this.props.matches !== undefined && this.props.matches.legnth !== 0) {
      return (
        <ScrollView>
          <View>
            <Text style={[colors.deepPurple, fonts.majorHeading, fontEffects.center]}>Matches</Text>
            {this.showMatches()}
          </View>
        </ScrollView>
      )
    }
    else if (this.props.matches !== undefined && this.props.matches.length !== 0) {
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
  }
);

export default connect(mapStateToProps, { getMatches, getUser, deleteMatch})(Chats);
