// https://5naicha.com/naichaadmin.php/index/login.html
// ID: naichaadmin
// Pass: Sexier520


import React, { Component } from "react";
import {
  createAppContainer,
  createStackNavigator,
  createMaterialTopTabNavigator,
  createBottomTabNavigator,
  MaterialTopTabBar
} from "react-navigation";
import { SafeAreaView, Image } from "react-native";

import Home from "./src/Pages/Home";
import Discover from "./src/Pages/Discover";
import Profile from "./src/Pages/Profile";
import Video from "./src/Pages/Video";
import Actor from "./src/Pages/Actor";
import Recommended from "./src/Pages/Recommended";
import Categories from "./src/Pages/Categories";
import Novel from "./src/Pages/Novel";
import Search from "./src/Pages/Search";
import Login from "./src/Pages/Login";

SafeAreaMaterialTopTabBar = props => {
  return (
    <SafeAreaView>
      <MaterialTopTabBar {...props} />
    </SafeAreaView>
  );
};

const ChannelTab = createMaterialTopTabNavigator(
  {
    专栏推荐: { screen: Recommended },
    标签筛选: { screen: Categories },
  },
  {
    resetOnBlur: true,
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
    // Video: { screen: Video },
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
    // Video: { screen: Video },
    Actor: { screen: Actor },
    // Novel: { screen: Novel }
  },
  {
    headerMode: "none",
    initialRouteName: "Home"
  }
);

const DiscoverStack = createStackNavigator(
  {
    Home: {
      screen: Discover,
      navigationOptions: () => ({
        title: "发现",
        headerTitleStyle: { flex: 1, textAlign: 'center' },
        headerStyle: { backgroundColor: "#23272A" },
        headerTintColor: "#E9CDB5"
      })
    },
  },
  {
    headerMode: "screen",
    initialRouteName: "Home"
  }
);

const ProfileStack = createStackNavigator(
  {
    Home: { screen: Profile },
    Login: { screen: Login },
    // Video: { screen: Video },
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
        title: '主页',
        tabBarIcon: ({ focused, tintColor }) =>
          focused ? (
            <Image style={{width:25, height:25}} source={require('./image/bottomnav01-hover.png')} />
          ) : (
            <Image style={{width:25, height:25}} source={require('./image/bottomnav01.png')} />
          )
      })
    },
    Channel: {
      screen: ChannelStack,
      navigationOptions: () => ({
        title: '频道',
        tabBarIcon: ({ focused, tintColor }) =>
          focused ? (
            <Image style={{width:25, height:25}} source={require('./image/bottomnav02-hover.png')} />
          ) : (
            <Image style={{width:25, height:25}} source={require('./image/bottomnav02.png')} />
          )
      })
    },
    Discover: {
      screen: DiscoverStack,
      navigationOptions: () => ({
        title: '发现',
        tabBarIcon: ({ focused, tintColor }) =>
          focused ? (
            <Image style={{width:25, height:25}} source={require('./image/bottomnav03-hover.png')} />
          ) : (
            <Image style={{width:25, height:25}} source={require('./image/bottomnav03.png')} />
          )
      })
    },
    Profile: {
      screen: ProfileStack,
      navigationOptions: () => ({
        title: '我的',
        tabBarIcon: ({ focused, tintColor }) =>
          focused ? (
            <Image style={{width:25, height:25}} source={require('./image/bottomnav04-hover.png')} />
          ) : (
            <Image style={{width:25, height:25}} source={require('./image/bottomnav04.png')} />
          )
      })
    }
  },
  {
    initialRouteName: "Main",
    order: ["Main", "Channel", "Discover", "Profile"],
    lazy: true,
    animationEnabled: true,
    resetOnBlur: true,
    tabBarOptions: {
      inactiveTintColor: "grey",
      activeTintColor: "#E9CDB5",
      showIcon: true,
      showLabel: true,
      labelStyle: { fontSize: 12 },
      indicatorStyle: { display: "none" },
      style: {
        backgroundColor: "#23272A",
        borderTopColor: "grey"
      }
    }
  }
);

const mainNavContainer = createStackNavigator(
  {
    MainPage: { screen: TabNavigator },
    Novel: { screen: Novel },
    Video: { screen: Video },
    Search: { screen: Search },
  },
  {
    headerMode: 'none',
    initialRouteName: 'MainPage'
  }
)

const App = createAppContainer(mainNavContainer);

export default App;
