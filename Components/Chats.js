import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { getUser, getMatches, deleteMatch } from '../actions';
import colors, { fonts, fontEffects, buttons } from '../assets/styles/basicStyle';
import axios from 'axios';
import Match from './Match';

class Chats extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getUser(this.props.id);
  }

  deleteMatch = (matchID) => {
    this.props.deleteMatch(this.props.id, matchID, this.props.username);
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
      return (
        <Text>Loading...</Text>
      )
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
