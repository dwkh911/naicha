import React, { Component } from 'react';
import { 
    View, 
    Text,
    TouchableOpacity, 
    Image,
    StyleSheet
} from 'react-native';

class VideoThumbnail extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
        <TouchableOpacity onPress={this.props.onPress} style={styles.thumbnailContainer}>
            <Image
                ref={ imgRef => this.ref = imgRef }
                source={{ uri: this.props.uri }}
                style={styles.thumbnail}
                onError={ () => this.ref.setNativeProps({
                    src: [{ uri: "https://nrsmc.edu.in/assets/uploads/dept_pic/no-pic.png" }]
                }) }
            />
            <Text numberOfLines={1} style={{ alignSelf: 'center', padding: 5, fontSize: 12, color: this.props.titleColor }}>
                {this.props.name}
            </Text>
        </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
    thumbnailContainer: {
        flex: 0.5,
        marginBottom: 30
      },
      thumbnail: {
          flex: 1,
          height: 100,
          width: 173,
          alignSelf: 'center',
          resizeMode: 'stretch'
      }
})

export default VideoThumbnail;
