import React, { Component } from "react";
import {
  View,
  Text,
  ScrollView,
  RefreshControl,
  Image,
  SafeAreaView,
  FlatList
} from "react-native";
import { SearchBar, Icon } from "react-native-elements";

import styles from "../Stylesheet/Home-stylesheet";
import MainHolder from "../Component/MainHolder";
import ListHolder from "../Component/ListHolder";

class Home extends Component {
  state = {
    refreshing: false,
    videoList: [
      {
        name: "Recommended"
      },
      {
        name: "Hot"
      }
    ]
  };

  _onRefresh = () => {
    this.setState({ refreshing: true });
  };

  render() {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "transparent" }}>
        <View style={styles.container}>
          <View style={styles.header}>
            <View style={styles.leftHeader}>
              <SearchBar
                round={true}
                containerStyle={{
                  backgroundColor: "transparent",
                  borderTopColor: "transparent",
                  borderBottomColor: "transparent"
                }}
              />
            </View>
            <View style={styles.rightHeader}>
              <Icon
                name="scan1"
                type="antdesign"
                color="#E9CDB5"
                size={28}
                containerStyle={{ paddingRight: 10 }}
              />
              <Icon
                name="download"
                type="entypo"
                color="#E9CDB5"
                size={28}
                containerStyle={{ paddingRight: 10 }}
              />
              <Icon
                name="back-in-time"
                type="entypo"
                color="#E9CDB5"
                size={28}
                containerStyle={{ paddingRight: 10 }}
              />
            </View>
          </View>
          <View style={styles.content}>
            <ScrollView
              refreshControl={
                <RefreshControl
                  title="HI HAMSAP HAI"
                  titleColor="white"
                  progressBackgroundColor="black"
                  refreshing={this.state.refreshing}
                  onRefresh={this._onRefresh}
                />
              }
            >
              <MainHolder />
              <ListHolder category="Recommended" itemToRender={2} ads={true} />
            </ScrollView>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

export default Home;
