import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, KeyboardAvoidingView, TextInput, Image } from 'react-native';
import { getUser, getMatches, setToRead, checkUnreadMessages, totalContacted, totalChatsSent, getFullChat, sendChat, clearChat } from '../actions';
import colors, { fonts, fontEffects, buttons, profileImage } from '../assets/styles/basicStyle';
import { singleChat } from '../assets/styles/chatStyle';
import surveyStyle from '../assets/styles/surveyStyle';
import axios from 'axios';
import Match from './Match';
import AwardModal from './AwardModal'
import AnimatedEllipsis from 'react-native-animated-ellipsis';

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
      numberText: 10,
      prompt: 'click'//this.props.navigation.getParam('prompt') || '',
    }

    this.goBack = this.goBack.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  componentDidMount() {
    //https://stackoverflow.com/questions/39426083/update-react-component-every-second
    this.interval = setInterval(() => this.getAndUpdateRead(), 5000);
    this.getChats();
    this.setPrompt();
    this.setToRead();
    this.updateUnread();
    this.props.totalContacted(this.props.id);
    this.props.totalChatsSent(this.props.id);
    console.log("in mounting");
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

  getAndUpdateRead = () => {
    this.getOnlyChats();
    this.setToRead();
    this.updateUnread();
  }

  getChats() {
    if (this.props.navigation.getParam('firstMatchAward') && this.state.awardAward) {
      this.setState({ showModal: true, awardMessage: 'You got the First Match Badge!', awardImage: require('./../assets/icons/firstMatch.png') });
    }

    console.log("getting info");
    console.log(this.props.numContacted);
    console.log(this.props.numChats);

    // axios.get(`https://for-the-girls.herokuapp.com/api/chats/totalContacted/${this.props.id}`)
    //   .then((response) => {
    //     this.setState({ numContacted: response.data })
    //   }).catch((error) => {
    //     console.log(error);
    //   });


    // axios.get(`https://for-the-girls.herokuapp.com/api/chats/totalSent/${this.props.id}`)
    //   .then((response) => {
    //     this.setState({ numChats: response.data })
    //   }).catch((error) => {
    //     console.log(error);
    //   });
  }

  setToRead = () => {
    const myID = this.props.id;
    const theirID = this.props.navigation.getParam('matchID');
    this.props.setToRead(
      {
        receiverID: myID,
        senderID: theirID,
      }
    );
  }

  updateUnread = () => {
    const myID = this.props.id;
    this.props.checkUnreadMessages({
      id: myID,
    });
  }

  getOnlyChats = () => {
    const firstID = this.props.id;
    const secondID = this.props.navigation.getParam('matchID');
    this.props.getFullChat(firstID, secondID);
  }

  showChats() {
    if (this.props.chats !== undefined) {
      return this.props.chats.map((n, index) => {
        //if (this.state.chats.length - this.state.numberText < index + 1) {
        if (n.sender === this.props.id) {
          return (
            <View style={singleChat.sender} key={index}>
              <Text style={[colors.white, fonts.bodyText, singleChat.chatFont]} key={index}>{n.text}</Text>
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
      )
    }
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

    // this.props.totalContacted(this.props.id);

    //numContacted
    // axios.get(`https://for-the-girls.herokuapp.com/api/chats/totalContacted/${this.props.id}`)
    //   .then((response) => {
    //     if (response.data == 5 && this.props.numContacted == 4) {
    //     }
    //   }).catch((error) => {
    //     console.log(error);
    //   });
    const firstID = this.props.id;
    const secondID = this.props.navigation.getParam('matchID');
    this.props.sendChat(fields, firstID, secondID);
    this.setState({ chatText: '', prompt: '' })

    if (this.props.numContacted == 5) {
      this.setState({ numContacted: 5, awardAward: true, showModal: true, awardMessage: 'You got the 5 Contacted Award!', awardImage: require('./../assets/icons/messageFive.png') });
    }
    if (this.props.numChats == 99) {
      this.setState({ awardAward: true, showModal: true, awardMessage: 'You got the 100 Matches Badge!!', awardImage: require('./../assets/icons/chattyCathy.png') });
    }
  }

  loadMore = () => {
    const newNum = this.state.numberText + 10;
    this.setState({ numberText: newNum });
  }

  goBack = () => {
    this.props.clearChat();
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

  renderLoading = () => {
    if (this.props.chats === undefined) {
      return (
        <AnimatedEllipsis />
      )
    }
  }

  renderTextInput = () => {
    if (this.props.chats !== undefined) {
      return (
        <View style={singleChat.chatInputContainer}>
          <View style={(this.state.chats.length > 15) ? singleChat.chatInputView : [singleChat.chatInputView, singleChat.chatInputMargin]}>
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
        </View>
      )
    }
  }

  resetModal = () => {
    this.setState({ showModal: false, modalMessage: "", awardAward: false });
  }

  // loadMore = () => {
  //   if (this.state.chats.length > 10) {
  //     return (
  //       <TouchableOpacity style={singleChat.loadmore} onPress={this.loadMore}>
  //         <Text style={[fonts.minorHeading, colors.deepPurple, fontEffects.center]}>Load More!</Text>
  //       </TouchableOpacity>
  //     )
  //   }
  // }

  render() {
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
        <KeyboardAvoidingView behavior="padding" enabled keyboardVerticalOffset={120}>
          <ScrollView
            style={{ flex: 0 }}
            ref={ref => this.scrollView = ref}
            onContentSizeChange={() => { this.scrollView.scrollToEnd({ animated: true }) }}>
            {/* {this.loadMore()} */}
            <View>
              <View>
                <View style={{justifyContent: 'center', alignItems: 'center'}}>
                {this.renderLoading()}
                </View>
                {this.showChats()}
              </View>
              {this.renderTextInput()}
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
    numContacted: reduxState.chats.numContacted,
    numChats: reduxState.chats.numChats,
    chats: reduxState.chats.chats,
  }
);

export default connect(mapStateToProps, { getUser, setToRead, checkUnreadMessages, totalContacted, totalChatsSent, getFullChat, sendChat, clearChat })(SingleChat);
