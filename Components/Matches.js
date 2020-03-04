import React from 'react';
import { connect } from 'react-redux';
import Walkthrough from './Walkthrough'
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Animated,
  Image,
  Easing,
  TouchableOpacity
} from 'react-native';
import colors, { fonts } from '../assets/styles/basicStyle';
import PotentialMentor from './PotentialMentor';
import { getPotentialMatches, editUserVisit } from '../actions';

/* animation: 
 // https://facebook.github.io/react-native/docs/animated#timing
 // https://stackoverflow.com/questions/37445090/react-native-how-do-you-animate-the-rotation-of-an-image
*/

class Matches extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      animation: false,
      showModal: false,
      modalMessage: '',
      firstTime: false,
      walkThrough: false,
    }
    this.spinValue = new Animated.Value(0);

    this.returnMatches = this.returnMatches.bind(this);
  }

  componentDidMount() {
    this.props.getPotentialMatches(this.props.username);
    this.spin();
    this.setState({ animation: true, firstTime: this.props.firstTime });
    console.log("mounting matches");
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
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: true
      }
    ).start(() => this.spin())
    if ((this.props.potentialMatches !== undefined && this.props.potentialMatches.legnth !== 0) ||
      (this.props.potentialMatches !== undefined && this.props.potentialMatches.legnth === 0)) {
      this.setState({ animation: false })
    }

  }

  firstTime = () => {
    if (this.state.firstTime || this.state.walkThrough) {
      return (
        <Walkthrough reset={this.resetModal}></Walkthrough>
      )
    }
  }

  startWalkthrough = () => {
    this.setState({ walkThrough: true });
  }

  resetModal = () => {
    this.setState({ showModal: false, modalMessage: "", firstTime: false, walkThrough: false });
    this.props.editUserVisit(this.props.username, this.props.id, { firstTime: false });
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
    var loading = (
      <View style={{
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%'
      }}>
        <Animated.Image
          style={{
            height: 200,
            width: 200,
            transform: [{ rotate: spin }]
          }}
          source={require('./../assets/icons/loading.png')}
        />
        <Text style={[fonts.majorHeading, colors.deepPurple]}>Loading Matches!</Text>
      </View>);

    if (this.state.animation) {
      return (loading);
    }
    else if (this.props.potentialMatches !== undefined && this.props.potentialMatches.legnth !== 0) {
      return (
        <View>


          <ScrollView>
            <View style={{ alignItems: 'flex-end' }} >
              <TouchableOpacity
                onPress={() => this.startWalkthrough()}>
                <Image style={{ width: 40, height: 40, marginTop: 7, marginRight: 7 }} source={require('./../assets/icons/question.png')} />
              </TouchableOpacity>
            </View>
            {this.firstTime()}
            {this.returnMatches()}
          </ScrollView>
        </View>
      )
    }
    else if (this.props.potentialMatches !== undefined && this.props.potentialMatches.legnth === 0) {
      return (
        <View style={{
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%'
        }}>
          <Text style={[fonts.majorHeading, colors.deepPurple]}>No matches right now!</Text>
        </View>
      )
    }
    else {
      return (loading);
    }

  }
}

const mapStateToProps = reduxState => (
  {
    username: reduxState.auth.username,
    id: reduxState.auth.id,
    email: reduxState.user.email,
    potentialMatches: reduxState.user.potentialMatches,
    firstTime: reduxState.user.firstTime,
  }
);

export default connect(mapStateToProps, { getPotentialMatches, editUserVisit })(Matches);
