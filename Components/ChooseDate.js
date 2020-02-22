import React, { Component } from 'react';
import {TouchableOpacity, Text, View, StyleSheet, DatePickerIOS} from 'react-native';
import colors, { buttons, fonts, fontEffects, modal } from '../assets/styles/basicStyle';
import DateTimePicker from '@react-native-community/datetimepicker';

class ChooseDate extends Component {

    constructor(props) {
        super(props);
        this.state = {
           date: new Date(),
        };
    }       

  setDate = (newDate) => {
      console.log(newDate);
      const currentDate = newDate || date;
      this.setState({date: currentDate});
  }

  sendDate = () => {
      console.log("sending");
      this.props.saveDate(this.state.date);
  }


  render() {
    console.log(this.state.date);
    return (
        <View style={{backgroundColor: '#ffffff', height: 500, alignContent: 'center'}}>
          <DateTimePicker
            value={this.state.date}
            mode={this.props.mode}
            display="default"
            onChange={this.setDate}
            maximumDate={new Date(2025, 0, 1)}
            minimumDate={new Date(2019, 0, 1)}
          />
          <View>
          <TouchableOpacity
            onPress={() => this.sendDate()}>
            <View style={[buttons.logInOutButton, modal.closeButton]}><Text style={[fonts.minorHeading, colors.white]}>Done</Text></View>
          </TouchableOpacity>
          </View>
          
          
       
      </View>
        
    );
  }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 50,
      padding: 16,
    },
  });
  



export default ChooseDate;


