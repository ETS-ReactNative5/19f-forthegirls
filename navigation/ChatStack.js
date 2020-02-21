import { createStackNavigator } from 'react-navigation-stack';
import Chats from '../Components/Chats';
import SingleChat from '../Components/SingleChat';
import Matches from '../Components/Matches';

const ChatStack = createStackNavigator(
  {
    Home: Chats,
    //CustomHide: CustomHide,
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


// https://reactnavigation.org/docs/en/navigation-options-resolution.html#a-tab-navigator-contains-a-stack-and-you-want-to-hide-the-tab-bar-on-specific-screens
ChatStack.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true;
  if (navigation.state.index > 0) {
    tabBarVisible = false;
  }
  return {
    tabBarVisible
  }
}


export default ChatStack;
