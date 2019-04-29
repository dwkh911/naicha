import React, { Component } from 'react';
import { 
  View, 
  Text, 
  Image, 
  Dimensions,
  TouchableOpacity,
  TouchableHighlight,
  ActivityIndicator
} from 'react-native';
import Video from 'react-native-video'
import { Icon } from 'react-native-elements'
import styles from '../Stylesheet/Video-stylesheet'

const {width, height} = Dimensions.get('window');

class VideoPlayer extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const { wraperStyle, url, width, height, onLoad, paused, playVideo, iconName, onBack, imgUri } = this.props;
    
    return (
      <View style={wraperStyle}>
        <Video
          paused={this.props.paused}
          controls={true}
          style={[styles.container, {width: width, height: height}]}
          source={{ uri: url }}
          onLoad={onLoad}
        />

        {
          paused &&
          <TouchableHighlight 
            style={styles.coverContainer} 
            onPress={playVideo}
          >
              <Image 
                ref={imgref => this.img = imgref}
                style={styles.coverImg}
                source={{ uri: imgUri.replace("img.maccms", "ht.naicha6") }}
                onError={() => this.img.setNativeProps({
                  src: [{ uri: "https://nrsmc.edu.in/assets/uploads/dept_pic/no-pic.png" }]
                })}
              />
          </TouchableHighlight>

        }

        <Icon
          name={iconName}
          type='antdesign'
          size={20}
          color='white'
          containerStyle={styles.backIcon}
          onPress={onBack}
          underlayColor={'transparent'}
        />
      </View>

    );
  }
}

export default VideoPlayer;
