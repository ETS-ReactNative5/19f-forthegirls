import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { getUser, getMatches } from '../actions';
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


  showMatches() {
    var i = -1;
    return this.props.matches.map((n) => {
      i++;
      return (
        <Match key={n} userId={n} i={i} />
      )
    })
  }

  render() {
    //&& this.props.matches.legnth > 0
    if (this.props.matches !== undefined) {
      return (
        <ScrollView>
          <View>
            <Text style={[colors.deepPurple, fonts.majorHeading, fontEffects.center]}>Matches</Text>
            {this.showMatches()}
          </View>
        </ScrollView>
      )
    }
    // else if (this.props.matches !== undefined) {
    //   console.log(this.props.matches.length);
    //   return (
    //     <View>
    //       <Text style={[colors.deepPurple, fonts.majorHeading, fontEffects.center]}>Matches</Text>
    //       <Text style={[fonts.majorHeading, fontEffects.center]}>No matches yet!</Text>
    //     </View>
    //   )
    // }
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

export default connect(mapStateToProps, { getMatches, getUser })(Chats);
