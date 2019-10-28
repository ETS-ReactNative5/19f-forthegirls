import React from 'react';
import { StyleSheet, Text, View, Button} from 'react-native';
import Axios from 'axios';
import StartScreen from './Components/StartScreen.js'

export default function App() {

  // apicall = functionCall()
  //think of useState as individual keys for component state
  //const [resultState, setResult] = useState('');

  //think of useEffect like a componentDidMount
  // useEffect(() => {
  //   axios.get(`${ROOT_URL}`).then((response) => {
  //     const data = response.data.result;
  //     //return data;
  //     setResult(data);
  //   })
  // })

  return (
    <View style={styles.container}>
      <Text>Hello World!!1 YAY FTG</Text>
      <StartScreen />
    </View>
  );
}
const ROOT_URL = 'http://localhost:9090/api';

// function functionCall() {
//   axios.get(`${ROOT_URL}`).then((response) => {
//     const data = response.data.result;
//     //return data;
//     setResult(data);
//   })
//   return undefined;
// }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
