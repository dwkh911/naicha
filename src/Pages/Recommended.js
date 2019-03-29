import React, { Component } from "react";
import { ScrollView, View, Text, RefreshControl } from "react-native";
import { Icon } from "react-native-elements";

import AdsBanner from "../Component/AdsBanner";
import ScrollViewHolder from "../Component/ScrollViewHolder";
import ActorListHolder from "../Component/ActorListHolder";
import styles from "../Stylesheet/Home-stylesheet";

class Recommended extends Component {
  state = {
    refreshing: false
  };
  render() {
    return (
      <View style={{ flex: 1, backgroundColor: "#23272A" }}>
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
          <ScrollViewHolder />
          <AdsBanner />
          <View style={{ flex: 1, marginTop: 20 }}>
            <Text style={{ color: "white", fontWeight: "bold" }}>List</Text>
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                justifyContent: "center"
              }}
            >
              <View style={styles.iconsContainer}>
                <Icon
                  name="activity"
                  type="feather"
                  size={20}
                  color="#E9CDB5"
                  reverse={true}
                  containerStyle={styles.icons}
                />
                <Text style={styles.text}> Lorem Ipsum</Text>
              </View>
              <View style={styles.iconsContainer}>
                <Icon
                  name="activity"
                  type="feather"
                  size={20}
                  color="#E9CDB5"
                  reverse={true}
                  containerStyle={styles.icons}
                />
                <Text style={styles.text}> Lorem Ipsum</Text>
              </View>
              <View style={styles.iconsContainer}>
                <Icon
                  name="activity"
                  type="feather"
                  size={20}
                  color="#E9CDB5"
                  reverse={true}
                  containerStyle={styles.icons}
                />
                <Text style={styles.text}> Lorem Ipsum</Text>
              </View>
              <View style={styles.iconsContainer}>
                <Icon
                  name="activity"
                  type="feather"
                  size={20}
                  color="#E9CDB5"
                  reverse={true}
                  containerStyle={styles.icons}
                />
                <Text style={styles.text}> Lorem Ipsum</Text>
              </View>
            </View>
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                justifyContent: "center"
              }}
            >
              <View style={styles.iconsContainer}>
                <Icon
                  name="activity"
                  type="feather"
                  size={20}
                  color="#E9CDB5"
                  reverse={true}
                  containerStyle={styles.icons}
                />
                <Text style={styles.text}> Lorem Ipsum</Text>
              </View>
              <View style={styles.iconsContainer}>
                <Icon
                  name="activity"
                  type="feather"
                  size={20}
                  color="#E9CDB5"
                  reverse={true}
                  containerStyle={styles.icons}
                />
                <Text style={styles.text}> Lorem Ipsum</Text>
              </View>
              <View style={styles.iconsContainer}>
                <Icon
                  name="activity"
                  type="feather"
                  size={20}
                  color="#E9CDB5"
                  reverse={true}
                  containerStyle={styles.icons}
                />
                <Text style={styles.text}> Lorem Ipsum</Text>
              </View>
              <View style={styles.iconsContainer}>
                <Icon
                  name="activity"
                  type="feather"
                  size={20}
                  color="#E9CDB5"
                  reverse={true}
                  containerStyle={styles.icons}
                />
                <Text style={styles.text}> Lorem Ipsum</Text>
              </View>
            </View>
          </View>
          <ActorListHolder />
        </ScrollView>
      </View>
    );
  }
}

export default Recommended;
