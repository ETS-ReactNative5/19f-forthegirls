import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { View, Text } from 'react-native';

const AboutTab = (props) => {
  return <View style={{ flex: 1, justifyContent: 'center' }}><Text>about</Text></View>;
};

const SearchTab = (props) => {
  return <View style={{ flex: 1, justifyContent: 'center' }}><Text>Search</Text></View>;
};


const MainTabBar = createBottomTabNavigator({
  SearchTab,
  AboutTab,
}, {
  initialRouteName: 'SearchTab',
});

export default createAppContainer(MainTabBar);