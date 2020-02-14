import React from 'react';
import { connect } from 'react-redux';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Animated,
  Image,
  Easing
} from 'react-native';
import PotentialMentor from './PotentialMentor';
import { getPotentialMatches } from '../actions';

class Matches extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      animation: false
    }
    this.spinValue = new Animated.Value(0);

    this.returnMatches = this.returnMatches.bind(this);
  }

  componentDidMount() {
    this.props.getPotentialMatches(this.props.username);
    this.spin();
  }

  refresh = () => {
    this.props.getPotentialMatches(this.props.username);
  }

  spin() {
    this.spinValue.setValue(0)
    Animated.timing(
      this.spinValue,
      {
        toValue: 1,
        duration: 500,
        easing: Easing.inOut(Easing.ease)
      }
    ).start(() => this.spin())
  }

  returnMatches = () => {
    return this.props.potentialMatches.map((n) => {
      return (
        <PotentialMentor key={n} userId={n} refresh={this.refresh} navigation={this.props.navigation} />
      )
    });
  }

  render() {
    const spin = this.spinValue.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '360deg']
    })
    if (this.props.potentialMatches !== undefined && this.props.potentialMatches.legnth !== 0 && this.state.animation === false) {
      return (
        <ScrollView>
          {this.returnMatches()}
        </ScrollView>
      )
    }
    else if (this.props.potentialMatches !== undefined && this.props.potentialMatches.legnth === 0) {
      return (
        <Text>No matches right now!</Text>
      )
    }
    else {
      return (
        <View style={styles.container}>
          <Animated.Image
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              height: 500,
              width: 500,
              transform: [{ rotate: spin }]
            }}
            source={require('./../assets/icons/loading.png')}
          />
        </View>
      )
    }

  }
}

const mapStateToProps = reduxState => (
  {
    username: reduxState.auth.username,
    id: reduxState.auth.id,
    email: reduxState.user.email,
    potentialMatches: reduxState.user.potentialMatches,
  }
);

export default connect(mapStateToProps, { getPotentialMatches })(Matches);
