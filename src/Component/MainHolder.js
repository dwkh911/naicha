import React, { Component } from "react";
import { View, Image, Text, FlatList, TouchableOpacity, ActivityIndicator } from "react-native";
import { Icon } from "react-native-elements";

import styles from "../Stylesheet/Home-stylesheet";
import AdsBanner from "../Component/AdsBanner";

export default class MainHolder extends Component {

  state={
    isLoading: true,
    country:'',
    moreLess:true,
    newData:[],
    types:[
      {
        id: 49,
        name:'小说',
        icon: require('../../image/icon1.png')
      },
      {
        id: 4,
        name:'高清',
        icon: require('../../image/icon2.png')
      },
      {
        id: 1,
        name:'自拍',
        icon: require('../../image/icon3.png')
      },
      {
        id: 7,
        name:'欧美',
        icon: require('../../image/icon4.png')
      },
      {
        id: 5,
        name:'有码',
        icon: require('../../image/icon5.png')
      },
      {
        id: 3,
        name:'无码',
        icon: require('../../image/icon6.png')
      },
      {
        id: 6,
        name:'动漫',
        icon: require('../../image/icon7.png')
      },
      {
        id: 8,
        name:'三级',
        icon: require('../../image/icon8.png')
      },
    ],
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: "#23272A" }}>

        <AdsBanner />

        <View
          style={{
            flex: 1,
            justifyContent: "center",
            marginTop: 20
          }}
        >
          <FlatList
            numColumns={4}
            data={this.state.types}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item}) => ( 
              <TouchableOpacity onPress={() => this.props.onPress(item.id)} style={styles.iconsContainer}>
                <Image
                  source={item.icon}
                  style={{width:55, height:55, marginBottom: 8}}
                />
                <Text style={styles.text}>{item.name}</Text>

              </TouchableOpacity>
            )}
          />
        </View>  

      </View>
    );
  }
}
