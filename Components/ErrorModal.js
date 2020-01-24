import React, { Component } from 'react';
import { Text, View, Button, Modal, StyleSheet } from 'react-native';
import colors, { buttons, fonts, fontEffects } from '../assets/styles/basicStyle';

//help from https://facebook.github.io/react-native/docs/0.52/modal

class ErrorModal extends Component {
    constructor(props) {
      super(props);
      this.state= {
        visible: true,
      }
    }

    closeModal = () => {
      this.setState({visible:false});
    }
    

    render() {
      console.log("in modal");
      console.log(this.props.errorMessage);
      return (
        <View style={styles.container}>
            <Modal
                visible={this.state.visible}
                animationType={'none'}
                onRequestClose={() => this.closeModal()}
            >
              <View style={styles.modal}>
                  <Text style={styles.text}>{this.props.errorMessage}</Text>
                  <Button style={styles.closeButton}
                      onPress={() => this.closeModal()}
                      title="Close modal"
                  >
                  </Button>
                </View>
            </Modal>
            </View>
      );
    }
    
}

//help to style from https://www.tutorialspoint.com/react_native/react_native_modal.htm

const styles = StyleSheet.create ({
  container: {
     alignItems: 'center',
     backgroundColor: '#ede3f2',
     padding: 100
  },
  modal: {
     flex: 1,
     alignItems: 'center',
     backgroundColor: '#f7021a',
     padding: 100
  },
  text: {
     color: '#3f2949',
     marginTop: 10
  },
  closeButton: {
    display: 'flex',
    backgroundColor: colors.deepPurple.color,
    borderRadius: 20,
    height: 30,
    width: 60,
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 12,
  },
})

export default ErrorModal;