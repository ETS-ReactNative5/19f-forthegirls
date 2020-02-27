import React, { Component } from 'react';
import { Text, View, Button, Modal, StyleSheet, TouchableOpacity, Image } from 'react-native';
import colors, { buttons, fonts, fontEffects, modal } from '../assets/styles/basicStyle';
import profile from '../assets/styles/profileStyle';

//help from https://facebook.github.io/react-native/docs/0.52/modal

class BlacklistModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: true,
    }
  }

  handleDelete = () => {
    this.props.delete();
    this.setState({ visible: false });
    this.props.reset();
  }

  handleReport = () => {
    this.props.report();
    this.setState({ visible: false });
    this.props.reset();
  }

  handleBlock = () => {
    this.props.block();
    this.setState({ visible: false });
    this.props.reset();
  }

  handleCancel = () => {
    this.setState({ visible: false });
    this.props.reset();
  }

  render() {
    return (
      <Modal
        visible={this.state.visible}
        animationType={'none'}
        transparent={true}
        onRequestClose={() => this.closeModal()}
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          margin: 0
        }}
      >
        <View style={modal.container}>
          <Text style={[modal.errorText, fonts.minorHeading]}>What would you like to do?</Text>
          <TouchableOpacity
            onPress={() => this.handleDelete()}>
            <View style={[buttons.logInOutButton, modal.closeButton]}><Text style={[fonts.minorHeading, colors.white]}>Delete</Text></View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.handleBlock()}>
            <View style={[buttons.logInOutButton, modal.closeButton]}><Text style={[fonts.minorHeading, colors.white]}>Block</Text></View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.handleReport()}>
            <View style={[buttons.logInOutButton, modal.closeButton]}><Text style={[fonts.minorHeading, colors.white]}>Report</Text></View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.handleCancel()}>
            <View style={[buttons.logInOutButton, modal.closeButton]}><Text style={[fonts.minorHeading, colors.white]}>Cancel</Text></View>
          </TouchableOpacity>
        </View>
      </Modal>
    );
  }

}

export default BlacklistModal;
