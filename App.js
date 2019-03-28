/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from "react";
import {
  createAppContainer,
  createStackNavigator,
  createMaterialTopTabNavigator,
  createBottomTabNavigator,
  MaterialTopTabBar
} from "react-navigation";
import { View, Text, SafeAreaView } from "react-native";
import { Icon } from "react-native-elements";

import Home from "./src/Pages/Home";
import Discover from "./src/Pages/Discover";
import Profile from "./src/Pages/Profile";
import Video from "./src/Pages/Video";
import Actor from "./src/Pages/Actor";
import Recommended from "./src/Pages/Recommended";
import Categories from "./src/Pages/Categories";

SafeAreaMaterialTopTabBar = props => {
  return (
    <SafeAreaView>
      <MaterialTopTabBar {...props} />
    </SafeAreaView>
  );
};

const ChannelTab = createMaterialTopTabNavigator(
  {
    Recommended: { screen: Recommended },
    Categories: { screen: Categories }
  },
  {
    lazy: true,
    animationEnabled: true,
    tabBarComponent: SafeAreaMaterialTopTabBar,
    tabBarOptions: {
      inactiveTintColor: "white",
      activeTintColor: "#E9CDB5",
      showLabel: true,
      style: {
        justifyContent: "center",
        backgroundColor: "#23272A"
      }
    }
  }
);

const HomeStack = createStackNavigator(
  {
    Home: { screen: Home },
    Video: { screen: Video },
    Actor: { screen: Actor }
  },
  {
    headerMode: "none",
    initialRouteName: "Home"
  }
);

const ChannelStack = createStackNavigator(
  {
    Home: { screen: ChannelTab },
    Video: { screen: Video },
    Actor: { screen: Actor }
  },
  {
    headerMode: "none",
    initialRouteName: "Home"
  }
);

const DiscoverStack = createStackNavigator(
  {
    Home: { screen: Discover },
    Video: { screen: Video },
    Actor: { screen: Actor }
  },
  {
    headerMode: "none",
    initialRouteName: "Home"
  }
);

const ProfileStack = createStackNavigator(
  {
    Home: { screen: Profile },
    Video: { screen: Video },
    Actor: { screen: Actor }
  },
  {
    headerMode: "none",
    initialRouteName: "Home"
  }
);

const TabNavigator = createBottomTabNavigator(
  {
    Main: {
      screen: HomeStack,
      navigationOptions: () => ({
        tabBarIcon: ({ focused, tintColor }) =>
          focused ? (
            <Icon name="home" type="feather" color={tintColor} />
          ) : (
            <Icon name="home" type="feather" color={tintColor} />
          )
      })
    },
    Channel: {
      screen: ChannelStack,
      navigationOptions: () => ({
        tabBarIcon: ({ focused, tintColor }) =>
          focused ? (
            <Icon name="youtube" type="feather" color={tintColor} />
          ) : (
            <Icon name="youtube" type="feather" color={tintColor} />
          )
      })
    },
    Discover: {
      screen: DiscoverStack,
      navigationOptions: () => ({
        tabBarIcon: ({ focused, tintColor }) =>
          focused ? (
            <Icon name="compass" type="feather" color={tintColor} />
          ) : (
            <Icon name="compass" type="feather" color={tintColor} />
          )
      })
    },
    Profile: {
      screen: ProfileStack,
      navigationOptions: () => ({
        tabBarIcon: ({ focused, tintColor }) =>
          focused ? (
            <Icon name="user" type="feather" color={tintColor} />
          ) : (
            <Icon name="user" type="feather" color={tintColor} />
          )
      })
    }
  },
  {
    initialRouteName: "Channel",
    order: ["Main", "Channel", "Discover", "Profile"],
    lazy: true,
    animationEnabled: true,
    tabBarOptions: {
      inactiveTintColor: "grey",
      activeTintColor: "#E9CDB5",
      showIcon: true,
      showLabel: false,
      indicatorStyle: { display: "none" },
      style: { backgroundColor: "#23272A" }
    }
  }
);

const App = createAppContainer(TabNavigator);

export default App;
