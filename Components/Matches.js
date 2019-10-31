import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import PotentialMentor from './PotentialMentor'
import profile from '../assets/styles/profileStyle';

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
