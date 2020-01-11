import { createStackNavigator } from 'react-navigation-stack';
<<<<<<< HEAD
=======
import colors, { fonts, fontEffects } from '../assets/styles/basicStyle';
>>>>>>> 96c376555c07155d1a4eb863aa681eb7176f9c16
import Chats from '../Components/Chats';
import SingleChat from '../Components/SingleChat';

const ChatStack = createStackNavigator(
  {
  Home: Chats,
  SingleChat: {
    screen: SingleChat,
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

export default ChatStack;
