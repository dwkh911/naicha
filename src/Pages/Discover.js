import React, { Component } from "react";
import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  RefreshControl
} from "react-native";
import Video from "react-native-video";

class Discover extends Component {
  state = {
    refreshing: false,
    video: [
      {
        id: 1,
        url: "https://cdn3-baidu.dsd666.com:8081/20190327/uDBuKBSe/index.m3u8"
      },
      {
        id: 2,
        url: "https://cdn3-baidu.dsd666.com:8081/20190327/uDBuKBSe/index.m3u8"
      },
      {
        id: 3,
        url: "https://cdn3-baidu.dsd666.com:8081/20190327/uDBuKBSe/index.m3u8"
      },
      {
        id: 4,
        url: "https://cdn3-baidu.dsd666.com:8081/20190327/uDBuKBSe/index.m3u8"
      }
    ]
  };

  _onRefresh = () => {
    this.setState({ refreshing: true });
  };

  render() {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "transparent" }}>
        <View style={{ flex: 1, backgroundColor: "#23272A" }}>
          <FlatList
            refreshControl={
              <RefreshControl
                title="HI HAMSAP HAI"
                titleColor="white"
                progressBackgroundColor="black"
                refreshing={this.state.refreshing}
                onRefresh={this._onRefresh}
              />
            }
            keyExtractor={item => item.id.toString()}
            data={this.state.video}
            renderItem={({ item }) => (
              <View style={{ flex: 1, margin: 10 }}>
                <Video
                  paused={true}
                  controls={true}
                  style={{ alignSelf: "center", height: 250, width: 350 }}
                  source={{ uri: item.url }}
                />
                <View
                  style={{ flex: 0.1, padding: 10, backgroundColor: "white" }}
                >
                  <Text>*VIDEO DESCRIPTION*</Text>
                </View>
              </View>
            )}
          />
        </View>
      </SafeAreaView>
    );
  }
}

export default Discover;
