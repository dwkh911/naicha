import React, { Component } from "react";
import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  RefreshControl,
  Dimensions, 
  Image,
  TouchableOpacity,
  Platform,
  Alert
} from "react-native";
import { Icon } from 'react-native-elements'
import { connect } from 'react-redux'
import { NavigationActions } from "react-navigation";
import { getVideos, getUsers, resetCounter } from '../action/actions'
import styles from '../Stylesheet/Discover-stylesheet'

const {width, height} = Dimensions.get('window');

class Discover extends Component {

  static navigationOptions = ({navigation}) => ({
    headerRight: (
      <Icon
        name="search1"
        type="antdesign"
        size={20}
        color="lightgray"
        containerStyle={{ padding: 10 }}
        underlayColor="transparent"
        onPress={() => navigation.navigate('Search', { 
          searchTxt: "",
          videos: navigation.getParam('vids'),
          keyword: false
        })}
      />
    ), 
    headerLeft: (
      <Icon
        name="search1"
        type="antdesign"
        size={20}
        color="transparent"
        containerStyle={{ padding: 10 }}
        underlayColor="transparent"
      />
    )
  })

  state = {
    playPointer:'',
    play: true,
    videos:"",
    refreshing: true,
  };

  componentDidMount() {

    this.setState({
      videos: this.props.video.videos,
      refreshing: false
    }, () => {
      this.props.navigation.setParams({
        vids: this.state.videos
      })
    })

    this.props.navigation.addListener('didFocus', () => {
      if (this.props.user.isLogin){
        this.props.getUsers("Discover");
      }
    })
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.user.screen == "Discover"){
      Object.keys(nextProps.user.users).forEach(g => {
        if(nextProps.user.users[g].user_id == this.props.user.userId){
          if(nextProps.user.users[g].user_viewing_num < this.props.user.count) {
            if (nextProps.user.users[g].user_viewing_num == 0){
              this.props.onCounterReset();
            }
          }
        }
      })
    }
  }

  _onRefresh = () => {
    this.setState({ refreshing: true });
  };

  // //press to play video
  // runVideo = (id) => {
  //   this.setState({
  //     playPointer: id
  //   });
  // }

  //navigate to play video
  openVideo = (resp) => {
    if (this.props.user.isLogin){
      if (this.props.user.count !== 10) {
        this.props.navigation.navigate('Video', {
          url: resp.vod_play_url.replace("720p$", ""),
          allVid: this.state.videos.slice( Math.random()*6, (Math.random()*13) + 7 ),
          imgUri: resp.vod_pic,
          name: resp.vod_name,
          type: resp.type_name,
          date: resp.vod_time,
          views: resp.vod_hits
        })
      } else {
        Alert.alert(
          "",
          "观看次数已经耗尽，明日再接再厉!",
          [
            {
              text: "确定",
              style: "cancel"
            }
          ]
        )
      }  
    } else {
      Alert.alert(
        "会员权限",
        "请登陆以继续观看！",
        [
          {
            text: "确定",
            style: "cancel"
          }
        ]
      )
      this.props.navigation.navigate(
        NavigationActions.navigate({
          routeName: 'Profile',
          action: NavigationActions.navigate({
            routeName: 'Login'
          })
        })
      )
    }
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.videoContainer}>
          <FlatList
            refreshControl={
              <RefreshControl
                progressBackgroundColor={Platform.OS == 'ios' ? 'black' : 'white'}
                refreshing={this.state.refreshing}
              />
            }
            data={this.state.videos}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item}) => (
              <View style={styles.video}>
                <TouchableOpacity onPress={() => this.openVideo(item)}>
                  <Image
                    ref={ref => item.vod_id = ref}
                    source={{ uri: item.vod_pic.replace("img.maccms", "ht.naicha6") }}
                    style={{ width: width, height: 200, resizeMode: 'stretch' }}
                    onError={() => item.vod_id.setNativeProps({
                      src: [{ uri: "https://nrsmc.edu.in/assets/uploads/dept_pic/no-pic.png" }]
                    })}
                  />
                </TouchableOpacity>

                <View style={styles.videoDetails}>
                  <Text style={styles.videoText} numberOfLines={1} >{item.vod_name.substring(0,19) + '...'}</Text>
                  <Text style={styles.videoText}>{item.vod_hits} 观看次数</Text>
                </View>

              </View>
            )}
          />
        </View>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = (state) => {
  return{
    video: state.videoReducer,
    user: state.userReducer
  }
}

const mapDispatchToProps = (dispatch) => {
  return{
    getVideos: () => dispatch(getVideos()),
    getUsers: (currScreen) => { dispatch(getUsers(currScreen)) },
    onCounterReset: () => { dispatch(resetCounter()) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Discover);
