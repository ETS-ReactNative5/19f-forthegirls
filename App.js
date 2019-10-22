import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Hello World!!1 YAY FTG</Text>
      <Text>morgan was here</Text>
      <Text> Annika says hi! </Text>
      <Text> Sami says hey</Text>
      <Text>morgan was here</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
