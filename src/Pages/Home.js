import React, { Component } from "react";
import {
  Platform,
  View,
  ScrollView,
  RefreshControl,
  Image,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  Alert
} from "react-native";
import { SearchBar, Icon } from "react-native-elements";
import { NavigationActions } from "react-navigation";
import { connect } from 'react-redux'
import styles from "../Stylesheet/Home-stylesheet";
import MainHolder from "../Component/MainHolder";
import ListHolder from "../Component/ListHolder";
import {getVideos, watchCounter, getUsers, resetCounter} from '../action/actions'
import { postUserInfo } from "../saga/API"

class Home extends Component {

  state = {
    screen: 'Home',
    videos:'',
    refreshing: true,
    videoList: [
      {
        name: "Recommended"
      },
      {
        name: "Hot"
      }
    ],
    search: '',
    reset: false
  };

  componentDidMount() {
    this.listener = this.props.navigation.addListener('didFocus', () => {

      //check initial login status
      if (this.props.user.isLogin){
        this.props.getUsers(this.state.screen);
      }

      //check initial redux state
      if (this.props.video.videos !== ""){
        this.setState({
          videos: this.props.video.videos,
          refreshing: false
        })
      } else {
        this.props.getVideos();
      }
    })
  }

  componentWillReceiveProps(nextProps) {
    //screen props is used to prevent lifecycle fires across all screens
    //check if view counter from backend is reset
    if(nextProps.user.screen == "Home"){
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

    //first iteration of data loading
    this.setState({
      videos: nextProps.video.videos,
      refreshing: false
    })
  }

  // reset = () => {
  //   console.log('reset');
  //   let user = this.props.user;
  //   postUserInfo(
  //     user.userId,
  //     user.username,
  //     user.userPwd,
  //     user.userNickname,
  //     user.userQQ,
  //     user.userEmail,
  //     user.userPhone,
  //     user.userQues,
  //     user.userAns,
  //     0,
  //     user.rawPwd
  //   );
  // }

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

  searching = () => {
    if (this.state.search !== ""){
      this.props.navigation.navigate('Search', {
        searchTxt: this.state.search,
        videos: this.state.videos,
        keyword: true
      })
    } else {
      alert("请输入关键词进行搜索！")
    }
  }

  jumpPage = (catId) => {
    var subRoute = "";

    subRoute = (catId === 49) ? "专栏推荐" : "标签筛选"

    this.props.navigation.navigate(
      NavigationActions.navigate({
        routeName: 'Channel',
        action: NavigationActions.navigate({ 
          routeName: 'Home',
          action: NavigationActions.navigate({
            routeName: subRoute,
            params: { catId }
          })
        })
      })
    )
  }

  render() {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "transparent" }}>
      <StatusBar backgroundColor="#23272A" />
        <View style={styles.container}>
          <View style={styles.header}>
            <View style={styles.leftHeader}>
              <SearchBar
                clearIcon={
                  <Icon
                    name="close"
                    type="antdesign"
                    size={16}
                    color={this.state.search !== "" ? 'grey' : 'transparent'}
                    underlayColor="transparent"
                    onPress={() => this.setState({ search: "" })}
                  />
                }
                searchIcon={
                  <Image
                    source={require('../../image/topnav01.png')}
                    style={{ width: 20, height: 20, resizeMode: 'stretch' }}
                  />
                }
                onSubmitEditing={this.searching}
                value={this.state.search}
                onChangeText={(text) => this.setState({ search: text })}
                placeholder='输入关键字查找片源'
                inputStyle={{ fontSize: 12 }}
                round={true}
                containerStyle={{
                  backgroundColor: "transparent",
                  borderTopColor: "transparent",
                  borderBottomColor: "transparent"
                }}
              />
            </View>
            <View style={styles.rightHeader}>
              <TouchableOpacity onPress={() => this.props.checkCounter()}>
                <Image
                  style={{height:20, width:20}}
                  source={require('../../image/topnav02.png')}
                />
              </TouchableOpacity>
              <TouchableOpacity>
                <Image
                  style={{height:20, width:20}}
                  source={require('../../image/topnav03.png')}
                />
              </TouchableOpacity>
              <TouchableOpacity>
                <Image
                  style={{height:20, width:20}}
                  source={require('../../image/topnav04.png')}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.content}>
            <ScrollView
              refreshControl={
                <RefreshControl
                  title="HI HAMSAP HAI"
                  titleColor="white"
                  progressBackgroundColor={Platform.OS == 'ios' ? 'black' : 'white'}
                  refreshing={this.state.refreshing}
                  // onRefresh={this._onRefresh}
                />
              }
            >
              <MainHolder 
                onPress={(catId) => this.jumpPage(catId)}
              />
              
              <ListHolder 
                videos={this.state.videos} 
                navigate={this.openVideo} 
                category="最新片源" 
                itemToRender={this.state.videos.length}
                ads={true} 
                moreBtn={() => this.jumpPage("")}
              />
            </ScrollView>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

const maptStateToProps = (state) => {
  return {
    video: state.videoReducer,
    user: state.userReducer
  }
}

const mapDispatchToProps = (dispatch) => {
  return{
    getVideos: () => dispatch(getVideos()),
    checkCounter: () => dispatch(watchCounter()),
    getUsers: (currScreen) => dispatch(getUsers(currScreen)),
    onCounterReset: () => dispatch(resetCounter())
  }
}

export default connect(maptStateToProps, mapDispatchToProps)(Home);
