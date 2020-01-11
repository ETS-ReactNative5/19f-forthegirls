import { createStackNavigator } from 'react-navigation-stack';
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
