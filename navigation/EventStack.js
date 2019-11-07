import { createStackNavigator } from 'react-navigation-stack';
import Events from '../components/Events';
import EventDetails from '../components/EventDetails';
import AddEvent from '../components/AddEvent';

const EventStack = createStackNavigator({
  Home: Events,
  Detail: EventDetails,
  Add: AddEvent,
});

export default EventStack;
