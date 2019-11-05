import { createStackNavigator } from 'react-navigation-stack';
import Events from '../components/Events';
import EventDetails from '../components/EventDetails';

const EventStack = createStackNavigator({
  Home: Events,
  Detail: EventDetails,
});

export default EventStack;
