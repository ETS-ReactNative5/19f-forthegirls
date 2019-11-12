import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View, Button } from 'react-native';
import { getUser, getMatch } from '../actions';
import chatList from '../assets/styles/chatStyle';
import { fonts } from '../assets/styles/basicStyle';
import { Linking } from 'react-native'


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
    Linking.openURL('mailto:'+email+'?subject=We Matched!')
    .catch((error) => console.log(error));
  }

  showMatches() {
      // const matchInfo = getMatch(this.props.matches[i].id);
      // console.log("MATCH INFO");
      // console.log(matchInfo);

      return this.props.matches.map((n) => {
        return (
          // [chatList.listItem, i % 2 === 0 ? 
        <View key={n._id} style={chatList.listItemPurple}>
          <Text style={fonts.bodyText} key={n.username}>{n.username}!</Text>
          <Button key={n._id} title="Chat!" onPress={() => this.pressUser(n.email)} /> 
        </View>
        );
      });
  }

  render() {
    return (
      <View style={chatList.chatContainer}>
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
