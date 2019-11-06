import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { getUser } from '../actions';

class Chats extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    //hardcoded
    this.props.getUser('user1');
  }

  showMatches() {
    for (i = 0; i < this.props.matches.length(); i++) {
      return (<Text>{this.props.matches[i].username}</Text>)
    }
  }

  render() {
    return (
      <View>
        {this.showMatches()}
      </View>
    );
  }
}

const mapStateToProps = reduxState => (
  {
    username: reduxState.user.username,
    email: reduxState.user.email,
    matches: reduxState.user.matches,
  }
);

export default connect(mapStateToProps, { getUser })(Chats);
