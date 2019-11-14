import { createStackNavigator } from 'react-navigation-stack';
import Events from '../Components/Events';
import EventDetails from '../Components/EventDetails';
import AddEvent from '../Components/AddEvent';

const EventStack = createStackNavigator({
  Home: Events,
  Detail: EventDetails,
  Add: AddEvent,
});

export default EventStack;
