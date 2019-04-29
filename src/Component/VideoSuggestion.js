import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, FlatList } from 'react-native';

import styles from '../Stylesheet/Video-stylesheet'
import { Badge } from 'react-native-elements'

class VideoSuggestion extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
    <FlatList
      data={this.props.data}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({item}) => (
        <TouchableOpacity onPress={() => this.props.switchVideo(item)} style={styles.videoSuggestions}>
          <Image
            style={styles.videosCoverImg}
            source={{ uri: item.vod_pic.replace("img.maccms", "ht.naicha6") }}    
          />
          <View style={styles.videosSuggestionsDetails}>
            <View style={styles.container}>
              <Text numberOfLines={1}>{item.vod_name}</Text>
              <Badge
                value={item.type_name}
                containerStyle={{alignSelf: 'flex-start'}}
                badgeStyle={{backgroundColor:'#FFEE58', paddingHorizontal:8}}
                textStyle={{color:"#689F38"}}
              />
            </View>

            <Text><Text style={{ color: 'red' }}>{item.vod_hits}</Text> 播放次数</Text>
          </View>
        </TouchableOpacity>
      )}
      />
    );
  }
}

export default VideoSuggestion;
