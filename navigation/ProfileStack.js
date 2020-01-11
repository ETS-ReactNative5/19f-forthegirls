import { createStackNavigator } from 'react-navigation-stack';
import Profile from '../Components/Profile';
import EditProfile from '../Components/EditProfile';

const ProfileStack = createStackNavigator(
  {
  Home: Profile,
  EditProfile: {
    screen: EditProfile,
  },
},
{
  initialRouteName: 'Home',
  headerMode: 'none',
  transitionConfig: () => ({
    transitionSpec: {
      duration: 0,  // this is from https://stackoverflow.com/questions/52307978/how-to-disable-react-navigations-stack-navigator-transition
    },
  }),
},
);

export default ProfileStack;
