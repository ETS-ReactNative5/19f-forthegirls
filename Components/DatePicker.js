import React, { Component } from 'react';
import {TouchableOpacity, Text, View, StyleSheet} from 'react-native';
import colors, { buttons, fonts, fontEffects, modal } from '../assets/styles/basicStyle';
import DateTimePicker from '@react-native-community/datetimepicker';


class DatePicker extends Component {

    constructor(props) {
        super(props);
        this.state = {
           date: new Date(),
        };
    }       

  setDate = (newDate) => {
      this.setState({date: newDate});
  }

  sendDate = () => {
      console.log("sending");
      this.props.saveDate(this.state.date);
  }


  render() {
    console.log(this.state.date);
    return (
        <View>
            <DateTimePicker
            testID="dateTimePicker"
            timeZoneOffsetInMinutes={0}
            value={this.state.date}
            mode='datetime'
            is24Hour={false}
            display="default"
            onChange={this.setDate}
            />
        </View>
        // <View style={styles.container}>
        //     <DatePickerIOS
        //     date={this.state.date}
        //     onDateChange={this.setDate}
        //     style={{ backgroundColor: 'white' }}/>
        //     <TouchableOpacity
        //     onPress={() => this.sendDate()}>
        //     <View style={[buttons.logInOutButton, modal.closeButton]}><Text style={[fonts.minorHeading, colors.white]}>Done</Text></View>
        //     </TouchableOpacity>
        // </View>
           
        
    );
  }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'rgba(255, 255, 255, 1)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: 200,
    },
  });

export default DatePicker;
