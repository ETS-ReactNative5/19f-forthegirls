import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, KeyboardAvoidingView, TextInput, Image } from 'react-native';
import { getUser, getMatches } from '../actions';
import colors, { fonts, fontEffects, buttons, profileImage } from '../assets/styles/basicStyle';
import { singleChat } from '../assets/styles/chatStyle';
import surveyStyle from '../assets/styles/surveyStyle';
import axios from 'axios';
import Match from './Match';
import AwardModal from './AwardModal'

class SingleChat extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showModal: false,
      awardMessage: '',
      awardImage: null,
      awardAward: true,
      numChats: 0,
      chats: [],
      numContacted: 0,
      chatText: '',
      numberText: 8,
      prompt: 'click'//this.props.navigation.getParam('prompt') || '',
    }

    this.goBack = this.goBack.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);

  }

  componentDidMount() {
    console.log(this.props.navigation.getParam('prompt'));
    //https://stackoverflow.com/questions/39426083/update-react-component-every-second
    this.interval = setInterval(() => this.getOnlyChats(), 5000);
    this.getChats();
    this.setPrompt();
  }

  setPrompt = () => {
    if (this.props.navigation.getParam('prompt') !== '') {
      this.setState({ prompt: this.props.navigation.getParam('prompt') });
      this.setState({ chatText: this.props.navigation.getParam('prompt') });
    }
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  getChats() {

    if (this.props.navigation.getParam('firstMatchAward') && this.state.awardAward) {
      this.setState({ showModal: true, awardMessage: 'first match badge!', awardImage: require('./../assets/icons/firstMatch.png') });
    }

    axios.get(`https://for-the-girls.herokuapp.com/api/chats/totalContacted/${this.props.id}`)
      .then((response) => {
        this.setState({ numContacted: response.data })
      }).catch((error) => {
        console.log(error);
      });


    axios.get(`https://for-the-girls.herokuapp.com/api/chats/totalSent/${this.props.id}`)
      .then((response) => {
        this.setState({ numChats: response.data })
      }).catch((error) => {
        console.log(error);
      });

  }

  getOnlyChats = () => {
    const firstID = this.props.id;
    const secondID = this.props.navigation.getParam('matchID');
    axios.get(`https://for-the-girls.herokuapp.com/api/chats/getBetween/${firstID}/${secondID}`)
      .then((response) => {
        this.setState({ chats: response.data });
      }).catch((error) => {
        console.log(error);
      });
  }

  showChats() {
    return this.state.chats.map((n, index) => {
      if (this.state.chats.length - this.state.numberText < index + 1) {
        if (n.sender === this.props.id) {
          return (
            <View style={singleChat.sender} key={index}>
              <Text style={[colors.white, fonts.bodyText]} key={index}>{n.text}</Text>
            </View>
          );
        }
        else {
          return (
            <View style={singleChat.reciever} key={index}>
              <Text style={[colors.black, fonts.bodyText]} key={index}>{n.text}</Text>
            </View>
          );
        }
      }
    })
  }

  addChat = (text) => {
    // if (this.props.navigation.getParam('prompt') !== '') {
    //   this.setState({ chatText: this.props.navigation.getParam('prompt') })
    // } else {
    this.setState({ chatText: text });
    // }

  }

  sendChat = () => {

    fields = {
      sender: this.props.id,
      receiver: this.props.navigation.getParam('matchID'),
      text: this.state.chatText
    }


    axios.get(`https://for-the-girls.herokuapp.com/api/chats/totalContacted/${this.props.id}`)
      .then((response) => {
        if (response.data == 5 && this.state.numContacted == 4) {
          this.setState({ numContacted: 5, awardAward: true, showModal: true, awardMessage: 'Award: You\'ve started 5 conversations!', awardImage: require('./../assets/icons/messageFive.png') })
        }
      }).catch((error) => {
        console.log(error);
      });


    axios.post(`https://for-the-girls.herokuapp.com/api/chats/add/`, fields)
      .then((response) => {
        this.getChats();
        this.setState({ chatText: '', prompt: '' })
        if (this.state.numChats == 99) {
          this.setState({ awardAward: true, showModal: true, awardMessage: '100 Messages Badge!', awardImage: require('./../assets/icons/chattyCathy.png') });
        }
      }).catch((error) => {
        console.log(error);
      });
  }

  loadMore = () => {
    const newNum = this.state.numberText + 10;
    this.setState({ numberText: newNum });
  }

  goBack = () => {
    this.props.navigation.pop();
  }

  handleKeyDown = (e) => {
    if (e.nativeEvent.key == "Enter") {
      this.sendChat();
    }
  }

  renderModal = () => {
    if (this.state.showModal) {
      return (
        <AwardModal awardMessage={this.state.awardMessage} awardImage={this.state.awardImage} reset={this.resetModal} />
      );
    }
  }

  resetModal = () => {
    this.setState({ showModal: false, modalMessage: "", awardAward: false });
  }


  render() {
    console.log(this.state.numChats)
    return (
      <View>
        <View style={singleChat.header}>
          {this.renderModal()}
          <View style={singleChat.arrowBack}>
            <TouchableOpacity
              onPress={this.goBack}>
              <Image
                source={require('./../assets/icons/arrowback.png')}
              />
            </TouchableOpacity>
          </View>
          <View style={singleChat.headerTextContainer}>
            <Image source={this.props.navigation.getParam('profilePic') !== undefined ? { uri: this.props.navigation.getParam('profilePic') } : require('./../assets/icons/tim.jpg')} style={profileImage.singleChat} />
            <Text style={fonts.minorHeading}>{this.props.navigation.getParam('username')}</Text>
          </View>
        </View>
        <KeyboardAvoidingView behavior="padding" enabled keyboardVerticalOffset={150}>
          <ScrollView>
            <TouchableOpacity style={singleChat.loadmore} onPress={this.loadMore}>
              <Text style={[fonts.minorHeading, colors.deepPurple, fontEffects.center]}>Load More!</Text>
            </TouchableOpacity>
            <View>
              {this.showChats()}
            </View>
            {/* {this.renderInput()} */}
            <View style={singleChat.chatInputView}>
              <TextInput
                multiline={true}
                clearTextOnFocus={this.props.navigation.getParam('prompt') !== '' && this.state.prompt !== '' ? false : true}
                style={[singleChat.chatInput, fonts.bodyText, colors.deepPurple]}
                defaultValue={this.props.navigation.getParam('prompt')}
                value={this.state.chatText}
                onChangeText={this.addChat}
                onEndEditing={this.sendChat}
                onKeyPress={this.handleKeyDown}
              />
              <TouchableOpacity
                style={{ paddingTop: 2, paddingLeft: 5 }}
                onPress={this.sendChat}>
                <Image
                  source={require('./../assets/icons/arrowup.png')}
                />
              </TouchableOpacity>
            </View>

          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    )

  }
}

const mapStateToProps = reduxState => (
  {
    username: reduxState.user.username,
    id: reduxState.auth.id,
  }
);

export default connect(mapStateToProps, { getUser })(SingleChat);
