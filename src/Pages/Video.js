import React, { Component } from "react";
import { 
  View, 
  StatusBar, 
  Text, 
  ScrollView, 
  FlatList, 
  Image, 
  TouchableOpacity, 
  Dimensions,
  Modal,
  ActivityIndicator,
  BackHandler,
  Alert
} from "react-native";
import { Badge, Divider, Icon, Input, Button } from 'react-native-elements'
import { connect } from 'react-redux'
import Orientation from 'react-native-orientation'
import VideoPlayer from "../Component/VideoPlayer";
import VideoSuggestion from '../Component/VideoSuggestion'
import { watchCounter, getUsers, resetCounter } from "../action/actions";
import { postUserInfo } from "../saga/API"
import styles from '../Stylesheet/Video-stylesheet'

class Video extends Component {

  constructor(props){
    super(props);
    this.state={
      preview: true,
      fullscreen: false,
      width: null,
      height: null,
      url: '',
      imgUrl: '',
      name: '',
      date: '',
      views: '',
      type: '',
      modal: false,
    }
    this.params = this.props.navigation.state.params
  }

  componentWillMount() {
    this.setState({ 
      url: this.params.url,
      imgUrl: this.params.imgUri,
      name: this.params.name,
      date: this.params.date,
      views: this.params.views,
      type: this.params.type
    });
  }

  componentDidMount() {
    this.props.getUsers("Video");

    BackHandler.addEventListener('hardwareBackPress', () => {
      if (this.state.fullscreen){
        this.setPotrait();
        return true;
      }
    })
  }

  componentWillUnmount() {
    Orientation.lockToPortrait();
    StatusBar.setHidden(false);
    BackHandler.removeEventListener('hardwareBackPress', () => {})
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.user.screen == "Video"){
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

  setFullscreen = () => {
    Orientation.lockToLandscape();
    StatusBar.setHidden(true);
    this.setState({
      width: '100%',
      height: '100%',
      fullscreen: true
    })
  }

  setPotrait = () => {
    Orientation.lockToPortrait();
    StatusBar.setHidden(false);
    this.setState({
      width: null,
      height: null,
      fullscreen: false
    })
  }

  onSwitch = (resp) => {
    this.props.getUsers("Video");

    if (this.props.user.count !== 10){
      this.setState({ 
        url: resp.vod_play_url.replace("720p$", ""),
        modal: true,
        imgUrl: resp.vod_pic,
        name: resp.vod_name,
        date: resp.vod_time,
        views: resp.vod_hits,
        type: resp.type_name
      });
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
  }

  onVideoLoad = () => {
    let user = this.props.user;
    this.setState({
      preview: false
    });
    this.props.addCounter(), postUserInfo(
      user.userId,
      user.username,
      user.userPwd,
      user.userNickname,
      user.userQQ,
      user.userPhone,
      user.userQues,
      user.userAns,
      user.count + 1,
      user.rawPwd
    );
  }

  render() {
    return (
      <View style={styles.container}>
      
        <VideoPlayer
          wraperStyle={styles.videoPlayer}
          url={this.state.url}
          imgUri={this.state.imgUrl}
          paused={this.state.preview}
          onLoad={this.onVideoLoad}
          onBack={this.state.fullscreen ? this.setPotrait : () => this.props.navigation.goBack()}
          width={this.state.width}
          height={this.state.height}
          iconName={'left'}
        />

        { !this.state.fullscreen &&
        <View style={styles.suggestion}>
          <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
            <View style={styles.container}>
              <View style={styles.smallContainer}>
                <Image 
                  source={{ uri:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTAt-o_JqSpTfv2GRTVKggtGdUdlbQcYjS0tYb9Qr6myAUo8Mc9' }} 
                  style={styles.adsImg} 
                />
              </View>

              <View style={styles.smallContainer}>
                <Text style={styles.videoTitle}>
                  {this.state.name}
                </Text>


                <Text style={{ color: 'black', padding: 7, fontSize: 11 }}>影片类型: {this.state.type}</Text>

                <View style={styles.videoDetails}>
                  <Text style={{ color: 'black', fontSize: 11 }}>{this.state.date.substring(0,10)} · <Text style={{ color: 'red' }}>{this.state.views}</Text>次播放</Text>
                  <TouchableOpacity 
                    style={{alignItems:'flex-end', flexDirection:'row-reverse'}} 
                    onPress={this.setFullscreen}
                  >
                    <Icon
                      name='maximize'
                      type='feather'
                      size={14}
                      color='black'
                      containerStyle={{alignSelf:'center'}}
                    />
                    <Text style={{color:'black', fontSize: 11}}>全屏观看</Text>
                  </TouchableOpacity>
                </View>

                
              </View>

              <View style={styles.bigContainer}>

                <Divider style={styles.divider} />

                <Text style={styles.label}>猜你喜欢</Text>
                
                <VideoSuggestion 
                  data={this.params.allVid}
                  switchVideo={(resp) => this.onSwitch(resp)}
                />
                
                <Divider style={styles.divider} />
                
                <View style={styles.commentSection}>
                  <Input 
                    placeholder="来说说你的感想吧"
                    inputContainerStyle={{borderBottomWidth:0}}
                    containerStyle={styles.commentInput}
                  />
                  <Button
                    title="发布"
                    containerStyle={styles.commentBtn}
                  />
                </View>
                
              </View>
            </View>
          </ScrollView>
        </View>
        }

        <Modal 
          transparent={true} 
          visible={this.state.modal} 
          onShow={() => setTimeout(() => this.setState({ modal: false }), 2200)}
        >
          <View style={styles.switchModal}>
            <View style={styles.switchContent} >
              <ActivityIndicator
                animating={true}
                color="black"
                size={17}
                style={{ padding: 7 }}
              />
              <Text style={styles.switchText}>加载中 ... </Text>
            </View>
          </View>
        </Modal>

      </View>
      
    );
  }
}

const mapStateToProps = (state) => {
  return{
    user: state.userReducer,
  }
}

const mapDispatchToProps = (dispatch) => {
  return{
    addCounter: () => dispatch(watchCounter()),
    getUsers: (currScreen) => { dispatch(getUsers(currScreen)) },
    onCounterReset: () => { dispatch(resetCounter()) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Video);
