import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';

import SignIn from '../components/Signin';
import SignUp from '../components/Signup';
import MainTabBar from '../navigation/MainTabBar';
import StartScreen from '../components/StartScreen';
import BasicSignUpComponent from '../components/basicSignUpComponent';
import CsComponent from '../components/csComponent';
import Prompts from '../components/promptsComponent';


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
    },
    BasicInfo: {
      screen: BasicSignUpComponent,
    },
    CsInfo: {
      screen: CsComponent,
    },
    Prompts: {
      screen: Prompts,
    },
  },
  {
    initialRouteName: 'Start',
    headerMode: 'none',
    transitionConfig: () => ({
      transitionSpec: {
        duration: 0,  // this is from https://stackoverflow.com/questions/52307978/how-to-disable-react-navigations-stack-navigator-transition
      },
    }),
  },
);

const SignInUpStack = createAppContainer(SignInUp);

export default SignInUpStack;
