import React from 'react';
import { Image } from 'react-native';

import { createBottomTabNavigator } from 'react-navigation-tabs';
import EventStack from './EventStack';
import Profile from '../components/Profile';
import Chats from '../components/Chats';
import Matches from '../components/Matches'
import StartScreen from '../components/StartScreen'
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
      screen: Chats,
      navigationOptions: ({ navigation }) => ({
        tabBarIcon: ({ focused }) => (
          <Image
            source={focused ? require('../assets/icons/chatSelected.png') : require('../assets/icons/chatUnselected.png')}
          />
        ),
      }),
    },
    Profile: {
      screen: Profile,
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
    initialRouteName: 'HomeTab',
    tabBarOptions: {
      showLabel: false,
    },
  },
);

export default createAppContainer(MainTabBar);
