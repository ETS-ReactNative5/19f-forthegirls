import React, { Component } from 'react';
import { Text, View, Button, Modal, StyleSheet, TouchableOpacity, Image } from 'react-native';
import colors, { buttons, fonts, fontEffects, modal } from '../assets/styles/basicStyle';
import profile from '../assets/styles/profileStyle';

//help from https://facebook.github.io/react-native/docs/0.52/modal

class AwardModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: true,
    }
  }

  closeModal = () => {
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
          <Image style={profile.award} source={this.props.awardImage} />
          <Text style={[modal.errorText, fonts.minorHeading]}>{this.props.awardMessage}</Text>
          <TouchableOpacity
            onPress={() => this.closeModal()}>
            <View style={[buttons.logInOutButton, modal.closeButton]}><Text style={[fonts.minorHeading, colors.white]}>Okay</Text></View>
          </TouchableOpacity>
        </View>
      </Modal>
    );
  }

}

export default AwardModal;