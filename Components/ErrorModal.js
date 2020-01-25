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
      this.props.reset();
    }
    

    render() {
      return (
            <Modal
                visible={this.state.visible}
                animationType={'none'}
                transparent={true}
                onRequestClose={() => this.closeModal()}
                style={{justifyContent: 'center',
                alignItems: 'center',
                margin: 0}}
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
      );
    }
    
}

//help to style from https://www.tutorialspoint.com/react_native/react_native_modal.htm

const styles = StyleSheet.create ({
  container: {
     alignItems: 'center',
     padding: 100,
     height: '50%',
     width: '50%',
     marginTop: 200,
     marginBottom: 200,
     marginLeft: 50,
     marginRight: 50,
  },
  modal: {
     flex: 1,
     alignItems: 'center',
     backgroundColor: '#ffffff',
     padding: 100,
     marginTop: 200,
     marginBottom: 200,
     marginLeft: 50,
     marginRight: 50,
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