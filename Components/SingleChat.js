import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { getUser, getMatches } from '../actions';
import colors, { fonts, fontEffects, buttons } from '../assets/styles/basicStyle';
import axios from 'axios';
import Match from './Match';

class SingleChat extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
        chats: {},
      }

  }

  componentDidMount() {
     
    userInfo = {
        firstID: this.props.id,
        secondID: this.props.navigation.getParam('matchID')
    }

    axios.get(`https://for-the-girls.herokuapp.com/api/chats/getBetween`, userInfo)
    .then((response) => {
        console.log(response.data);
        // this.setState({ chats: response.data.result });
    }).catch((error) => {
      console.log(error);
    });

  }

  render() {
    //&& this.props.matches.legnth > 0
      return (
        <ScrollView>
          <View>
            <Text style={[colors.deepPurple, fonts.majorHeading, fontEffects.center]}>HI</Text>
          </View>
        </ScrollView>
      )


    // else {
    //   this.props.getMatches(this.props.username);
    //   return (
    //     <Text>Loading...</Text>
    //   )
    // }

  }
}

const mapStateToProps = reduxState => (
  {
    username: reduxState.user.username,
    id: reduxState.auth.id,
  }
);

export default connect(mapStateToProps, { getUser })(SingleChat);
