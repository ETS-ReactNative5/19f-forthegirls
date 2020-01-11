import React from 'react';
import { Image } from 'react-native';

import { createBottomTabNavigator } from 'react-navigation-tabs';
import EventStack from './EventStack';
import ProfileStack from './ProfileStack';
import ChatStack from './ChatStack';
import Matches from '../Components/Matches'
import StartScreen from '../Components/StartScreen'
import { createAppContainer } from 'react-navigation';

const MainTabBar = createBottomTabNavigator(
  {
    HomeTab: {
      screen: Matches,
      navigationOptions: ({ navigation }) => ({
        tabBarIcon: ({ focused }) => (
          <Image source={focused ? require('../assets/icons/home.png') : require('../assets/icons/homeUnselected.png')} />
        ),
      }),
    },
    Chat: {
      screen: ChatStack,
      navigationOptions: ({ navigation }) => ({
        tabBarIcon: ({ focused }) => (
          <Image
            source={focused ? require('../assets/icons/chatSelected.png') : require('../assets/icons/chatUnselected.png')}
          />
        ),
      }),
    },
    Profile: {
      screen: ProfileStack,
      navigationOptions: ({ navigation }) => ({
        tabBarIcon: ({ focused }) => (
          <Image
            source={focused ? require('../assets/icons/profileSelected.png') : require('../assets/icons/profileUnSelected.png')}
          />
        ),
      }),
    },
    Events: {
      screen: EventStack,
      navigationOptions: ({ navigation }) => ({
        tabBarIcon: ({ focused }) => (
          <Image
            source={focused ? require('../assets/icons/eventSelected.png') : require('../assets/icons/eventUnselected.png')}
          />
        ),
      }),
    },
  },
  {
    initialRouteName: 'Profile',
    tabBarOptions: {
      showLabel: false,
    },
  },
);

export default createAppContainer(MainTabBar);
