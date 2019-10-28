import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, TextInput} from 'react-native';
import Axios from 'axios';
import StartScreen from './Components/StartScreen.js'
import MainTabBar from './containers/bottomNav';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      apiResponse: 'no api response yet',
      inputText: 'no text yet',
    }
  }

  componentDidMount() {
    const ROOT_URL = 'https://for-the-girls.herokuapp.com/';
      Axios.get(`${ROOT_URL}`).then((response) => {
        this.setState({apiResponse: response.data});
        console.log(response.data);
    }).catch((error) => {
      console.log(error);
    })
  }

  handleInput = (text) => {
    this.setState({ inputText: text });
  }

  // submitInput = () => {
  //   const ROOT_URL = 'http://localhost:9090/';
  //   Axios.get(`${ROOT_URL}`).then((response) => {
  //     this.setState({apiResponse: response.data.result});
  //     // const data = response.data.result;
  //   }).catch((error) => {
  //     console.log(error);
  //   })
  // }

  // https://www.tutorialspoint.com/react_native/react_native_text_input.htm
  // Help with basic text input, assume we'll make more sophisticated later
  render() {
    return (
      <View style={styles.container}>
      <Text>This is the response: {this.state.apiResponse}</Text>
      <TextInput style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
               placeholder = "Waiting for input..."
               placeholderTextColor = "#9a73ef"
               autoCapitalize = "none"
               onChangeText = {this.handleInput}/>
      <Text>The input: {this.state.inputText}</Text>
      <Button
          title="Submit input"
          accessibilityLabel="Submit input"
          color="#f194ff"
          // onPress={this.submitInput}
        />
        {/* <MainTabBar /> */}


        <StartScreen />
      </View>
    );
  }

}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;

// export default function App() {


//   // apicall = functionCall()
//   //think of useState as individual keys for component state
//   // const [resultState, setResult] = useState('');

//   // //think of useEffect like a componentDidMount
//   // useEffect(() => {
//   //   axios.get(`${ROOT_URL}`).then((response) => {
//   //     const data = response.data.result;
//   //     //return data;
//   //     setResult(data);
//   //   })
//   // })



//   return (
//     <View style={styles.container}>
//       <Text>Hello World!!1 YAY FTG</Text>
//       <Text>morgan was here</Text>
//       <Text> Annika says hi! </Text>
//       {/* <Text>{resultState}</Text> */}
//       <Text> Sami says hey</Text>
//       <Text>morgan was here</Text>
//     </View>
//   );
// }
// const ROOT_URL = 'http://localhost:9090/api';

// // function functionCall() {
// //   axios.get(`${ROOT_URL}`).then((response) => {
// //     const data = response.data.result;
// //     //return data;
// //     setResult(data);
// //   })
// //   return undefined;
// // }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
