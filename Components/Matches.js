import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import PotentialMentor from './PotentialMentor';
import { getPotentialMatches } from '../actions';

class Matches extends React.Component {
  constructor(props) {
    super(props);

    this.returnMatches = this.returnMatches.bind(this);
  }

  componentDidMount() {
    this.props.getPotentialMatches(this.props.username);
  }

  // componentDidUpdate(prevProps, prevState) {
  //   this.props.getPotentialMatches(this.props.username);
  // }

  refresh = () => {
    this.props.getPotentialMatches(this.props.username);
  }

  returnMatches = () => {
    return this.props.potentialMatches.map((n) => {
      console.log("returning matches");
      console.log(n);
      return (
        <PotentialMentor key={n} userId={n} refresh={this.refresh} navigation={this.props.navigation}/>
      )
    });
  }

  render() {
    if (this.props.potentialMatches !== undefined) {
      return (
        <ScrollView>
          {this.returnMatches()}
        </ScrollView>
      )
    }
    else {
      return (
        <Text>Loading...</Text>
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
