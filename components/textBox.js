import React, { Component } from 'react';
import { TextInput } from 'react-native';

export default function TextBox() {
  const [value, onChangeText] = React.useState('Useless Placeholder');

  return (
    <TextInput
      style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
      onChangeText={this.props.changeText(value)}
      value={value}
    />
  );
}