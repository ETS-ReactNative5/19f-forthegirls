import React, { Component } from 'react';
import { Text, View, Button, Modal, StyleSheet, TouchableOpacity } from 'react-native';
import colors, { buttons, fonts, fontEffects, modal } from '../assets/styles/basicStyle';

//help from https://facebook.github.io/react-native/docs/0.52/modal

class Walkthrough extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: true,
      text: "This is your matches page! Click anywhere on a person's profile to match.",
      buttonText: 'Next',
      page: 1,
    }
  }

  nextPage = () => {
      this.setState({text: 'You can also click on the questions to start talking about that topic!', buttonText: 'Okay', page: 2})
  }

  closeModal = () => {
    if(this.state.page ===1) {
        this.nextPage();
    }
    else {
        this.setState({ visible: false });
        this.props.reset();
    }
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
          <Text style={[modal.errorText, fonts.minorHeading]}>{this.state.text}</Text>
          <TouchableOpacity
            onPress={() => this.closeModal()}>
            <View style={[buttons.logInOutButton, modal.closeButton]}><Text style={[fonts.minorHeading, colors.white]}>{this.state.buttonText}</Text></View>
          </TouchableOpacity>
        </View>
      </Modal>
    );
  }

}

export default Walkthrough;