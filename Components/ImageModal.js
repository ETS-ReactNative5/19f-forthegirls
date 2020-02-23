import React, { Component } from 'react';
import { Text, View, Button, Modal, StyleSheet, TouchableOpacity } from 'react-native';
import colors, { buttons, fonts, fontEffects, modal } from '../assets/styles/basicStyle';

//help from https://facebook.github.io/react-native/docs/0.52/modal

class ImageModal extends Component {
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
          {/* <Image source={this.props.image} /> */}
          <TouchableOpacity
            onPress={() => this.closeModal()}>
            <View style={[buttons.logInOutButton, modal.closeButton]}><Text style={[fonts.minorHeading, colors.white]}>Okay</Text></View>
          </TouchableOpacity>
        </View>
      </Modal>
    );
  }

}

export default ImageModal;