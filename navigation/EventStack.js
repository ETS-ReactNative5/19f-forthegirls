import { createStackNavigator } from 'react-navigation-stack';
import colors, { fonts, fontEffects } from '../assets/styles/basicStyle';
import Events from '../Components/Events';
import EventDetails from '../Components/EventDetails';
import AddEvent from '../Components/AddEvent';

const EventStack = createStackNavigator({
  Home: Events,
  Detail: {
    screen: EventDetails,
  },
  Add: {
    screen: AddEvent,
  },
},
  {
    headerMode: 'none',
  });

EventStack.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true;
  if (navigation.state.index > 0) {
    tabBarVisible = false;
  }
  return {
    tabBarVisible
  }
}
export default EventStack;
