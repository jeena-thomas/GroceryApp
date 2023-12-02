/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  LazyComingSoonPage,
  LazyFavouritesPage,
  LazyHomePage,
} from './LazyPages';
import {Category, Heart, Home, HomeActive} from '../assets';
import {StyleSheet, View} from 'react-native';

const Tab = createBottomTabNavigator();

const HomeBottomStack = () => {
  return (
    <Tab.Navigator
      initialRouteName={'Home'}
      screenOptions={{
        headerShown: false,
        tabBarStyle: {borderTopLeftRadius: 25, borderTopRightRadius: 25},
      }}>
      <Tab.Screen
        name="Home"
        component={LazyHomePage}
        options={{
          tabBarIcon: ({focused}) => {
            return focused ? (
              <View style={styles.tabBar}>
                <HomeActive />
              </View>
            ) : (
              <Home />
            );
          },
          tabBarActiveTintColor: '#E0B420',
        }}
      />
      <Tab.Screen
        name="Categories"
        component={LazyComingSoonPage}
        options={{
          tabBarIcon: ({focused}) => {
            return focused ? (
              <View style={styles.tabBar}>
                <Category fill={'#E0B420'} />
              </View>
            ) : (
              <Category />
            );
          },
          tabBarActiveTintColor: '#E0B420',
        }}
      />
      <Tab.Screen
        name="Favourite"
        component={LazyFavouritesPage}
        options={{
          tabBarIcon: ({focused}) => {
            return focused ? (
              <View style={styles.tabBar}>
                <Heart fill={'#E0B420'} />
              </View>
            ) : (
              <Heart />
            );
          },
          tabBarActiveTintColor: '#E0B420',
        }}
      />
    </Tab.Navigator>
  );
};

export default HomeBottomStack;

const styles = StyleSheet.create({
  tabBar: {
    borderRadius: 50,
    height: 50,
    width: 50,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
    bottom: 10,
  },
});
