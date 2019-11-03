import React from 'react';
import { Image } from 'react-native';

import { createBottomTabNavigator } from 'react-navigation-tabs';
import Events from '../components/Events';
import Profile from '../components/Profile';
import Chats from '../components/Chats';
import Matches from '../components/Matches'
import { createAppContainer } from 'react-navigation';



const MainTabBar = createBottomTabNavigator(
  {
    HomeTab: {
      screen: Matches,
      navigationOptions: ({ navigation }) => ({
        tabBarIcon: ({ focused }) => (
          <Image source={require('../assets/icons/home.png')} />
        ),
      }),
    },
    Chat: {
      screen: Chats,
      navigationOptions: ({ navigation }) => ({
        tabBarIcon: ({ focused }) => (
          <Image
            source={require('../assets/icons/chatSelected.png')}
          />
        ),
      }),
    },
    Profile: {
      screen: Profile,
      navigationOptions: ({ navigation }) => ({
        tabBarIcon: ({ focused }) => (
          <Image
            source={require('../assets/icons/profileSelected.png')}
          />
        ),
      }),
    },
    Events: {
      screen: Events,
      navigationOptions: ({ navigation }) => ({
        tabBarIcon: ({ focused }) => (
          <Image
            source={require('../assets/icons/eventSelected.png')}
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
