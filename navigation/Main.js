import React, { Component, useEffect } from 'react';
import MainTabBar from './MainTabBar';
import SignInUpStack from './signInUpStack';
import { addActivity } from '../actions';
import { connect } from 'react-redux';

class Main extends Component {
  constructor(props) {
    super(props);

  }

  componentDidMount() {
    if(this.props.auth.id){
      this.props.addActivity({
        id: this.props.auth.id,
        timestamp: Date.now(),
      });
    }
  }


  render() {
    if(this.props.auth.authenticated) {
      return <MainTabBar/>
    }
    else {
      return <SignInUpStack/>
    }
  }
}

const mapStateToProps = reduxState => (
  {
    auth: reduxState.auth,
  }
);

export default connect(mapStateToProps, { addActivity })(Main);
