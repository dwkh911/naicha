import React, { Component } from "react";
import { View, Image } from "react-native";
import Carousel from "react-native-carousel-view";

export default class AdsBanner extends Component {
  render() {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <Carousel
          width={350}
          height={200}
          delay={2000}
          loop={true}
          indicatorAtBottom={true}
          indicatorSize={20}
          indicatorColor="white"
        >
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <Image
              style={{
                height: "100%",
                width: "100%",
                aspectRatio: 16 / 9,
                resizeMode: "contain"
              }}
              source={{
                uri:
                  "https://ht.naicha6.com/upload/vod/20190325-1/ab67b6e9504a632e32cece04b5a12fbc.jpg"
              }}
            />
          </View>
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <Image
              style={{
                height: "100%",
                width: "100%",
                aspectRatio: 16 / 9,
                resizeMode: "contain",
                backgroundColor: "white"
              }}
              source={{
                uri:
                  "https://ht.naicha6.com/upload/vod/20190325-1/ab67b6e9504a632e32cece04b5a12fbc.jpg"
              }}
            />
          </View>
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <Image
              style={{
                height: "100%",
                width: "100%",
                aspectRatio: 16 / 9,
                resizeMode: "contain",
                backgroundColor: "white"
              }}
              source={{
                uri:
                  "https://ht.naicha6.com/upload/vod/20190325-1/ab67b6e9504a632e32cece04b5a12fbc.jpg"
              }}
            />
          </View>
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <Image
              style={{
                height: "100%",
                width: "100%",
                aspectRatio: 16 / 9,
                resizeMode: "contain",
                backgroundColor: "white"
              }}
              source={{
                uri:
                  "https://ht.naicha6.com/upload/vod/20190325-1/ab67b6e9504a632e32cece04b5a12fbc.jpg"
              }}
            />
          </View>
        </Carousel>
      </View>
    );
  }
}
