import React, { Component } from "react";
import { 
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Alert
} from "react-native";
import { Badge } from 'react-native-elements'
import ListHolder from '../Component/ListHolder'
import VideoThumbnail from '../Component/VideoThumbnail'
import { NavigationActions } from "react-navigation";
import styles from '../Stylesheet/Channel-stylesheet'
import Spinner from 'react-native-loading-spinner-overlay'

import { getCategory, getUsers, resetCounter } from '../action/actions'
import { connect } from "react-redux"

class Categories extends Component {

  state = {
    filters:[
      {
        name: '综合'
      },
      {
        name: '最多播放'
      },
      {
        name: '最近更新'
      },
      {
        name: '最多喜欢'
      },
    ],
    category: '',
    picked:'综合',
    btnId:'',
    videos: '',
    selectedVids: "",
    loading: true,
  }

  componentDidMount() {
    this.props.navigation.addListener("didFocus", () => {

      if (this.props.user.isLogin){
        this.props.getUsers("Categories");
      }

      (this.props.vidAssets.category !== "")
      ? this.setState({ 
          category: this.props.vidAssets.category, 
          videos: this.props.vidAssets.videos,
          loading: false
        }, () => this.firstHandChecking())
      : this.props.getCategory()
    })
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.user.screen == "Categories"){
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

    //first iteration data loading
    //func() is to check category selected from HOME page if any
    this.setState({
      category: nextProps.vidAssets.category,
      videos: nextProps.vidAssets.videos,
      loading:false
    }, () => this.firstHandChecking())
  }

  firstHandChecking = () => {
    var tempHolder = this.props.navigation.getParam("catId", "");

    (tempHolder == "")
    ? this.setState({ selectedVids: this.state.videos })
    : this.setState({
        btnId: tempHolder,
        picked: ''
      }, () => {
        this.filterFunc(tempHolder)
      })
  }

  //first four category of the page, only sorting
  selectCategory = (name) => {
    let temp = "";

    (this.state.selectedVids == "")
    ? temp = this.state.videos
    : temp = this.state.selectedVids

    this.setState({
      picked: name,
    })

    if (name === "最多播放") {
      this.setState({
        selectedVids: (temp.sort( (a,b) => { return b.vod_hits - a.vod_hits } ))
      })
    } else if (name === "最多喜欢") {
      this.setState({
        selectedVids: (temp.sort( (a,b) => { return b.vod_up - a.vod_up } ))
      })
    } else if (name === "最近更新") {
      this.setState({
        selectedVids: (temp.sort( (a,b) => { return b.vod_id - a.vod_id } ))
      })
    } else if (name === "综合") {
      this.setState({
        selectedVids: this.state.videos,
        btnId: ""
      })
    }
  }

  //video types filtering, will reset sorting when change type
  filterFunc = (captureId) => {
    let temp = [];

    Object.keys(this.state.videos).forEach(g => {
      if (this.state.videos[g].type_id === captureId || this.state.videos[g].type_id_1 === captureId){
        temp.push(this.state.videos[g]);
        this.setState({
          selectedVids: [...this.state.selectedVids, ...temp]
        })
      }
    });
  }

  toggleActive = (id) => {
    this.setState({
      btnId: id,
      selectedVids: '',
      picked: ""
    }, () => {
      this.filterFunc(id);
    });
  }

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
      <View style={styles.categoriesContainer}>
        <Spinner
          visible={this.state.loading}
        />
        <View style={styles.categorySelector}>
          <Badge
            value="全部高清影片"
            badgeStyle={{ backgroundColor: 'hotpink', borderColor: 'hotpink', padding: 10, marginTop: 5, marginBottom: 13 }}
            textStyle={{ color: 'white', fontSize: 17 }}
          />

          <FlatList
            horizontal={true}
            contentContainerStyle={{ flex: 1, justifyContent: 'space-around', paddingBottom: 8 }}
            data={this.state.filters}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item}) =>
              <Badge
                onPress={() => this.selectCategory(item.name)}
                value={item.name}
                badgeStyle={{ borderColor: (this.state.picked == item.name) ? "pink" : 'white', backgroundColor: (this.state.picked == item.name) ? "pink" : 'white', padding: 8 }}
                textStyle={{ color: (this.state.picked == item.name) ? "white" : 'black', fontSize: 13 }}
              />
            }
          />

          <FlatList
            horizontal={true}
            contentContainerStyle={{ paddingBottom: 8 }}
            showsHorizontalScrollIndicator={false}
            data={this.state.category.slice(0,32)}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item})=> 
              <Badge
                onPress={() => this.toggleActive(item.type_id)}
                value={item.type_name}
                containerStyle={{ marginHorizontal: 6 }}
                badgeStyle={{ backgroundColor: (this.state.btnId==item.type_id)?'pink':'white', borderColor: (this.state.btnId == item.type_id ? 'pink' : 'white'), padding:10 }}
                textStyle={{ color: (this.state.btnId==item.type_id)?'white':'black', fontSize: 13 }}
              />
            }
          />
        </View>

        <View style={styles.videoContainer}>
          {
            (this.state.selectedVids == "")
            ? 
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <Text>没有匹配数据</Text>
            </View>
            :
            <FlatList
              columnWrapperStyle={{alignItems: 'space-between'}}
              numColumns={2}
              data={this.state.selectedVids}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({item}) => 
                <VideoThumbnail
                  onPress={() => this.openVideo(item)}
                  uri={item.vod_pic.replace("img.maccms", "ht.naicha6")}
                  name={item.vod_name}
                  titleColor="black"
                />
              }
            />
          }
          
        </View>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return{
    vidAssets: state.videoReducer,
    user: state.userReducer
  }
}

const mapDispatchToProps = (dispatch) => {
  return{
    getCategory: () => dispatch(getCategory()),
    getUsers: (currScreen) => { dispatch(getUsers(currScreen)) },
    onCounterReset: () => { dispatch(resetCounter()) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Categories);
