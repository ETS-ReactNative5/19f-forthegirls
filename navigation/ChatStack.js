import { createStackNavigator } from 'react-navigation-stack';
import Chats from '../Components/Chats';
import SingleChat from '../Components/SingleChat';
import Matches from '../Components/Matches';

const ChatStack = createStackNavigator(
  {
  Home: Chats,
  SingleChat: {
    screen: SingleChat,
  },
  Match: {
    screen: Matches,
  }
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
