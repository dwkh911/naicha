import React, { Component } from "react";
import { View, Image, Text, FlatList } from "react-native";

import AdsBanner from "../Component/AdsBanner";

type Props = {
  category: string,
  itemToRender: number,
  ads: boolean
};

export default class ListHolder extends Component {
  props: Props;
  state = {
    images: [
      {
        id: 1,
        name: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
        url:
          "https://www.95naicha.com/upload/vod/20190326-1/710851b91d317d8da2349adc5821f88a.jpg"
      },
      {
        id: 2,
        name: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
        url:
          "https://www.95naicha.com/upload/vod/20190326-1/710851b91d317d8da2349adc5821f88a.jpg"
      },
      {
        id: 3,
        name: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
        url:
          "https://www.95naicha.com/upload/vod/20190326-1/710851b91d317d8da2349adc5821f88a.jpg"
      },
      {
        id: 4,
        name: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
        url:
          "https://www.95naicha.com/upload/vod/20190326-1/710851b91d317d8da2349adc5821f88a.jpg"
      },
      {
        id: 5,
        name: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
        url:
          "https://www.95naicha.com/upload/vod/20190326-1/710851b91d317d8da2349adc5821f88a.jpg"
      },
      {
        id: 6,
        name: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
        url:
          "https://www.95naicha.com/upload/vod/20190326-1/710851b91d317d8da2349adc5821f88a.jpg"
      }
    ]
  };
  render() {
    const { category, itemToRender, ads } = this.props;
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "#23272A",
          paddingTop: 20,
          paddingBottom: 20
        }}
      >
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "space-between",
            marginBottom: 10
          }}
        >
          <Text style={{ fontWeight: "bold", color: "white" }}>{category}</Text>
          <Text style={{ fontWeight: "bold", color: "white" }}>More ></Text>
        </View>
        <FlatList
          numColumns={2}
          keyExtractor={(item, index) => item.id.toString()}
          data={this.state.images.slice(0, itemToRender)}
          renderItem={({ item }) => (
            <View
              style={{
                flex: 1,
                marginRight: 5,
                marginBottom: 30
              }}
            >
              <Image
                source={{ uri: item.url }}
                style={{
                  height: 100,
                  width: 180
                }}
              />
              <Text numberOfLines={1} style={{ color: "white" }}>
                {item.name}
              </Text>
            </View>
          )}
        />
        {ads ? <AdsBanner /> : null}
      </View>
    );
  }
}
