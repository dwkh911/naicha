import React, { Component } from "react";
import { View, Image, Text, FlatList, TouchableOpacity, Dimensions } from "react-native";

import Video from 'react-native-video'

import AdsBanner from "../Component/AdsBanner";
import VideoThumbnail from '../Component/VideoThumbnail'

const {width, height} = Dimensions.get('window');

type Props = {
  category: string,
  itemToRender: number,
  ads: boolean
};

export default class ListHolder extends Component {

  props: Props;
  state = {
    videos:'',
    showThumbnail:true,
  };

  render() {
    const { category, itemToRender, ads, videos, navigate } = this.props;
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
          <TouchableOpacity onPress={this.props.moreBtn}>
            <Text style={{ fontWeight: "bold", color: "white" }}>更多 ></Text>
          </TouchableOpacity>
        </View>
        <FlatList
          numColumns={2}
          contentContainerStyle={{ justifyContent: 'space-between' }}
          keyExtractor={(item, index) => index.toString()}
          data={videos.slice(0, itemToRender)}
          renderItem={({ item, index }) => (
            <VideoThumbnail
              onPress={() => navigate(item)}
              uri={item.vod_pic.replace("img.maccms", "ht.naicha6")}
              name={item.vod_name}
              titleColor="white"
            />
            // <View
            //   style={{
            //     flex: 1,
            //     marginBottom: 30
            //   }}
            // >
            //   <TouchableOpacity onPress={() => navigate(item)}>
            //     <Image
            //       ref={ imgRef => item.vod_id = imgRef}
            //       source={{ uri: item.vod_pic.replace("www.95naicha", "ht.naicha6") }}
            //       onError={() => item.vod_id.setNativeProps({
            //           src: [{ uri: "https://nrsmc.edu.in/assets/uploads/dept_pic/no-pic.png"}]
            //         })
            //       }
            //       style={{
            //         flex: 1,
            //         height: 100,
            //         width: 173,
            //         alignSelf: 'center',
            //         resizeMode: 'stretch'
            //       }}
            //     />
            //     <Text numberOfLines={1} style={{ color: "white", alignSelf: 'center', fontSize: 12, padding: 5 }}>
            //       {item.vod_name.substring(0,19) + '...'}
            //     </Text>
            //   </TouchableOpacity>
            // </View>
          )}
        />
        {ads ? <AdsBanner /> : null}
      </View>
    );
  }
}
