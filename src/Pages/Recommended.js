import React, { Component } from "react";
import { ScrollView, View, Text, RefreshControl } from "react-native";
import ScrollViewHolder from "../Component/ScrollViewHolder";

class Recommended extends Component {
  state = {
    refreshing: false
  };
  render() {
    return (
      <View style={{ flex: 1 }}>
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
        </ScrollView>
      </View>
    );
  }
}

export default Recommended;
