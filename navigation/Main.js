import React, { Component, useEffect } from 'react';
import MainTabBar from './MainTabBar';
import SignInUpStack from './signInUpStack';
import { addActivity, checkUnreadMessages } from '../actions';
import { connect } from 'react-redux';

class Main extends Component {
  constructor(props) {
    super(props);

    this.checkUnreadMessages = this.checkUnreadMessages.bind(this);
  }

  componentDidMount() {
    this.checkUnreadMessages();
    if(this.props.auth.id){
      this.props.addActivity({
        id: this.props.auth.id,
        timestamp: Date.now(),
      });
    }
    this.interval = setInterval(() => this.checkUnreadMessages(), 5000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  checkUnreadMessages() {
    this.props.checkUnreadMessages({
      id: this.props.auth.id,
    });
  }

  render() {
    if(this.props.auth.authenticated) {
      return <MainTabBar screenProps={{ unreadMessagesCount: this.props.chats.unreadCount }}/>
    }
    else {
      return <SignInUpStack/>
    }
  }
}

const mapStateToProps = reduxState => (
  {
    auth: reduxState.auth,
    chats: reduxState.chats
  }
);

export default connect(mapStateToProps, { addActivity, checkUnreadMessages })(Main);
