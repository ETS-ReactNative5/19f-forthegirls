import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';

import SignIn from '../components/Signin';
import SignUp from '../components/Signup';
import MainTabBar from '../navigation/MainTabBar';
import StartScreen from '../components/StartScreen';

// console.log(Main);

const SignInUp = createStackNavigator(
  {
    Start: {
      screen: StartScreen,
    },
    SignIn: {
      screen: SignIn,
    },
    SignUp: {
      screen: SignUp,
    },
    Main: {
      screen: MainTabBar,
    }
  },
  {
    initialRouteName: 'Start',
    headerMode: 'none',

  },
);

const SignInUpStack = createAppContainer(SignInUp);

export default SignInUpStack;
