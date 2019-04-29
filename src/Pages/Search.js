import React, { Component } from 'react';
import { 
  View,
  Text, 
  StyleSheet, 
  FlatList,
  Image,
  TouchableOpacity,
  Alert
} from 'react-native';
import { Badge, Icon, SearchBar } from 'react-native-elements';
import { connect } from 'react-redux'
import { NavigationActions } from "react-navigation";
import VideoThumbnail from '../Component/VideoThumbnail';
import { resetCounter, getUsers } from "../action/actions"
import styles from "../Stylesheet/Search-stylesheet"

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchMou: "",
      data: '',
      search: ""
    };
    this.params = this.props.navigation.state.params;
  }

  componentDidMount() {
    if (this.props.user.isLogin){
      this.props.getUsers("Search");
    }

    this.setState({
      search: this.params.searchTxt,
      searchMou: this.params.keyword
    });

    (this.params.searchTxt !== "") && this.searchFunc(this.params.searchTxt);
  }

  componentWillReceiveProps(nextProps){
    if (nextProps.user.screen == "Search"){
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

  searchFunc = (text) => {
    if (text == "") {
      alert("请输入关键词进行搜索！")
    } else {
      let temp = [];

      Object.keys(this.params.videos).forEach(g => {
        if (this.params.videos[g].vod_name.toLowerCase().includes(text.toLowerCase())){
          temp.push(this.params.videos[g]);
  
          this.setState({
            data: [...this.state.data, ...temp]
          })
        }
      })  
    }
  }

  searching = () => {
    this.setState({
      searchMou: true,
      data: ""
    }, () =>  this.searchFunc(this.state.search));
  }

  openVideo = (resp) => {
    if (this.props.user.isLogin){
      if (this.props.user.count !== 10) {
        this.props.navigation.navigate('Video', {
          url: resp.vod_play_url.replace("720p$", ""),
          allVid: this.params.videos.slice( Math.random()*6, (Math.random()*13) + 7 ),
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
      <View style={styles.container}>
        {
          (this.state.searchMou)
          ?
          <View style={styles.header}>
            <Icon
              name="left"
              type="antdesign"
              size={20}
              color="lightgray"
              containerStyle={{ padding: 10 }}
              onPress={() => this.props.navigation.goBack()}
              underlayColor="transparent"
            />
            <Badge
              value={this.state.search + " 搜索结果"}
              badgeStyle={{ backgroundColor: '#607D8B', padding: 12, margin: 10 }}
              textStyle={{ fontSize: 17 }}
            />
            <Icon
              name="search1"
              type="antdesign"
              size={20}
              color="lightgray"
              containerStyle={{ padding: 10 }}
              onPress={() => this.setState({ searchMou: false },() => this.search.focus())}
              underlayColor="transparent"
            />
          </View>
          :
          <View style={{ flex: 1, flexDirection: 'row', backgroundColor: '#23272A' }}>
            <SearchBar
              ref={ref => this.search = ref}
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
              round={true}
              value={this.state.search}
              placeholder='输入关键字查找片源'
              inputStyle={{ fontSize: 12 }}
              round={true}
              containerStyle={{
                flex: 9,
                backgroundColor: "transparent",
                borderTopColor: "transparent",
                borderBottomColor: "transparent"
              }}
              onChangeText={(text) => this.setState({ search: text })}
              onSubmitEditing={this.searching}
            />
            <TouchableOpacity style={styles.cancelBtnContainer} onPress={() => this.setState({ searchMou: true })}>
              <Text style={styles.cancelBtn}>取消</Text>
            </TouchableOpacity> 
          </View>
        }

        {
        (this.state.data !== "")
        ? 
        <View style={styles.content}>
          <FlatList
            contentContainerStyle={{ justifyContent: 'space-between' }}
            numColumns={2}
            data={this.state.data}
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
        </View>
        :
        <View style={styles.unfound}>
          <Text>没有匹配数据</Text>
        </View>
        }
      </View>
    );
  }
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1
//   },
//   header: {
//     flex: 1,
//     backgroundColor: '#23272A',
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center'
//   },
//   content: {
//     flex: 9,
//     backgroundColor: 'lightgray',
//     marginTop: 15
//   },
//   unfound:{
//     flex: 9,
//     backgroundColor: 'lightgray',
//     justifyContent: 'center',
//     alignItems: 'center'
//   },
//   cancelBtnContainer:{
//     flex: 1,
//     justifyContent: 'center', 
//     alignItems: 'center', 
//     padding: 7
//   },
//   cancelBtn: {
//     color: 'deepskyblue',
//     fontSize: 12
//   },
//   thumbnailContainer: {
//     flex: 0.5,
//     marginBottom: 30
//   },
//   thumbnail: {
//       flex: 1,
//       height: 100,
//       width: 173,
//       alignSelf: 'center',
//       resizeMode: 'stretch'
//   }
// })

const mapStateToProps = (state) => {
  return{
    user: state.userReducer
  }
}

const mapDispatchToProps = (dispatch) => {
  return{
    getUsers: (currScreen) => { dispatch(getUsers(currScreen)) },
    onCounterReset: () => { dispatch(resetCounter()) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Search);