import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';

import SignIn from '../components/Signin';
import SignUp from '../components/Signup';
import MainTabBar from '../navigation/MainTabBar';
import StartScreen from '../components/StartScreen';
import BasicSignUpComponent from '../components/surveyComponents/basicSignUpComponent';
import CsComponent from '../components/surveyComponents/csComponent';
import DemographicComponent from '../components/surveyComponents/demographicComponent';
import EducationComponent from '../components/surveyComponents/educationComponent';
import PersonalComponent from '../components/surveyComponents/personalComponent';
import ProfessionalComponent from '../components/surveyComponents/professionalComponent';
import SurveyHeader from '../components/surveyComponents/surveyHeader';
import MatchHome from '../components/Matches';
import Prompts from '../components/surveyComponents/promptsComponent';


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
    DemographicInfo: {
      screen: DemographicComponent,
    },
    EducationInfo: {
      screen: EducationComponent,
    },
    PersonalInfo: {
      screen: PersonalComponent,
    },
    ProfessionalInfo: {
      screen: ProfessionalComponent,
    },
    Header: {
      screen: SurveyHeader,
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
