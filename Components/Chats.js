import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { getUser, getMatches } from '../actions';
import chatList from '../assets/styles/chatStyle';
import { Linking } from 'react-native'
import colors, { fonts, fontEffects, buttons } from '../assets/styles/basicStyle';
import axios from 'axios';

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
      .catch((error) => console.log("email error" + error));
  }

  showMatches() {
    // const matchInfo = getMatch(this.props.matches[i].id);
    // console.log("MATCH INFO");
    // console.log(matchInfo);

    var i = -1;
    return this.props.matches.map((n) => {
      axios.get(`https://for-the-girls.herokuapp.com/api/users/${n}`)
      .then((response) => {
        i++;
        const userData = response.data.result;
        console.log(userData.age);
        return (
          <Text> HI </Text>
          // <View key={userData._id} style={[i % 2 === 0 ? chatList.listItemPurple : chatList.listItemWhite, chatList.listItem]}>
          //   <Text style={[fonts.minorHeading, chatList.username]} key={userData.username}>{userData.username}</Text>
          //   <View style={chatList.chatButton}>
          //     <TouchableOpacity
          //       key={userData.email}
          //       onPress={() => this.pressUser(userData.email)}>
          //       <Text style={[fonts.majorHeading, colors.turquoise, fontEffects.center]}>Chat</Text>
          //     </TouchableOpacity>
          //   </View>
          // </View>
        );
      }).catch((error) => {
        console.log(error);
      });


      
    });
  }

  render() {
    if(this.props.matches.length != 0) {
      return (
        <View>
          <Text style={[colors.deepPurple, fonts.majorHeading, fontEffects.center]}>Matches</Text>
          {this.showMatches()}
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

export default connect(mapStateToProps, { getMatches, getUser })(Chats);
