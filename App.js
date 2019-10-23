import React from 'react';
import axios from 'axios';

import { StyleSheet, Text, View } from 'react-native';

const ROOT_URL = 'http://localhost:9090/';

function functionCall() {
  axios.get(`${ROOT_URL}`).then((response) => {
    const data = response.data.result;
    console.log("responSE");
    return data;
  }).catch((error) => {
      // hit an error do something else!
      console.log(error.response.data);
    });
}

datafromcall = functionCall();
datafromcall = functionCall();


export default function App() {
  return (
    <View style={styles.container}>
      <Text>Hello World!!1 YAY FTG</Text>
      <Text>morgan was here</Text>
      <Text>{datafromcall}</Text>
      <Text> Annika says hi! </Text>
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
