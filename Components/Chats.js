import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { getUser, getMatch } from '../actions';
import chatList from '../assets/styles/chatStyle';
import { Linking } from 'react-native'
import colors, { fonts, fontEffects, buttons } from '../assets/styles/basicStyle';

class Chats extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      questionAnswers:
      {
        // get rid of the hardcoding
        name: 'test',
      },
    }
  }

  componentDidMount() {
    this.props.getUser(this.props.id);
  }

  pressUser = (email) => {
    Linking.openURL('mailto:' + email + '?subject=We Matched!')
      .catch((error) => console.log(error));
  }

  showMatches() {
    // const matchInfo = getMatch(this.props.matches[i].id);
    // console.log("MATCH INFO");
    // console.log(matchInfo);
    var i = -1;
    return this.props.matches.map((n) => {
      i++;
      return (
        <View key={n._id} style={[i % 2 === 0 ? chatList.listItemPurple : chatList.listItemWhite, chatList.listItem]}>
          <Text style={[fonts.minorHeading, chatList.username]} key={n.username}>{n.username}</Text>
          <View style={chatList.chatButton}>
            <TouchableOpacity
              key={n._id}
              onPress={() => this.pressUser(n.email)}>
              <Text style={[fonts.majorHeading, colors.turquoise, fontEffects.center]}>Chat</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    });
  }

  render() {
    return (
      <View>
        <Text style={[colors.deepPurple, fonts.majorHeading, fontEffects.center]}>Matches</Text>
        {this.showMatches()}
      </View>
    );
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

export default connect(mapStateToProps, { getUser })(Chats);
