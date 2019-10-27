import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Axios from 'axios';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      apiResponse: 'no api response yet',
    }
  }
  componentDidMount() {
    const ROOT_URL = 'http://localhost:9090/';
      Axios.get(`${ROOT_URL}`).then((response) => {
        this.setState({apiResponse: response.data.result});
        // const data = response.data.result;
    }).catch((error) => {
      console.log(error);
    })
  }


  render() {
    return (
      <View style={styles.container}>
      <Text>{this.apiResponse}</Text>
        <Text>TEST</Text>
        <Text>Hello World!!1 YAY FTG</Text>
        <Text>morgan was here</Text>
        <Text> Annika says hi! </Text>
        {/* <Text>{resultState}</Text> */}
        <Text> Sami says hey</Text>
        <Text>morgan was here</Text>
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
