import { createStackNavigator } from 'react-navigation-stack';
import colors, { fonts, fontEffects } from '../assets/styles/basicStyle';
import Events from '../Components/Events';
import EventDetails from '../Components/EventDetails';
import AddEvent from '../Components/AddEvent';

const EventStack = createStackNavigator({
  Home: Events,
  // Detail: {
  //   screen: EventDetails,
  //   navigationOptions: () => ({
  //     headerStyle: {
  //       backgroundColor: colors.deepPurple.color,
  //       marginTop: -50,
  //       height: 40,
  //     },
  //     headerTintColor: colors.white.color,
  //   }),
  // },
  Add: {
    screen: AddEvent,
    navigationOptions: () => ({
      headerStyle: {
        backgroundColor: colors.deepPurple.color,
        marginTop: -50,
        height: 40,
      },
      headerTintColor: colors.white.color,
    }),
  },
});

export default EventStack;
