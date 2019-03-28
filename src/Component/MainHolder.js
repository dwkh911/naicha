import React, { Component } from "react";
import { View, Image, Text } from "react-native";
import { Icon } from "react-native-elements";

import styles from "../Stylesheet/Home-stylesheet";
import AdsBanner from "../Component/AdsBanner";

export default class MainHolder extends Component {
  render() {
    return (
      <View style={{ flex: 1, backgroundColor: "#23272A" }}>
        <AdsBanner />
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "center",
            marginTop: 20
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
          style={{ flex: 1, flexDirection: "row", justifyContent: "center" }}
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
    );
  }
}
