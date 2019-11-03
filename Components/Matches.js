import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import PotentialMentor from './PotentialMentor';

class Matches extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ScrollView >
        <PotentialMentor />
        <PotentialMentor />
        <PotentialMentor />
      </ScrollView>
    );
  }
}

export default Matches;
