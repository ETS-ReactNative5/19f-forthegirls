import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View } from 'react-native';
import { getUser, getMatch } from '../actions';
import chatList from '../assets/styles/chatStyle';
import { fonts } from '../assets/styles/basicStyle';


class Chats extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      questionAnswers:
      {
        // get rid of the hardcoding
        name: 'test',
      }
    }
  }

  componentDidMount() {
    this.props.getUser(this.props.id);
  }

  showMatches() {
    console.log(this.props.matches);
    console.log(this.props.username);
    for (i = 0; i < this.props.matches.length; i++) {
      const matchInfo = getMatch(this.props.matches[i].id);
      return (
        <View style={[chatList.listItem, i % 2 === 0 ? chatList.listItemPurple : chatList.listItemWhite]}>
          <Text style={fonts.bodyText}>{matchInfo.username}</Text>
        </View>)
    }
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
