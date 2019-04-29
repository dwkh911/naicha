import React, { Component } from "react";
import { 
  ScrollView, 
  View, 
  Text, 
  RefreshControl, 
  FlatList, 
  Alert
} from "react-native";
import { connect } from 'react-redux'
import { NavigationActions } from "react-navigation";
import { Badge } from "react-native-elements";
import AdsBanner from "../Component/AdsBanner";
import ScrollViewHolder from "../Component/ScrollViewHolder";
import { getNovels, resetCounter, getUsers } from '../action/actions'
import styles from "../Stylesheet/Channel-stylesheet";

class Recommended extends Component {

  state = {
    refreshing: true,
    isLoading: true,
    category: '',
    novels: '',
    moreLess:true,
    novelType:[
      {
        id: 45,
        name: "武侠书屋"
      },
      {
        id: 46,
        name: "另类小说"
      },
      {
        id: 47,
        name: "性爱技巧"
      },
      {
        id: 56,
        name: "感情小说"
      },
      {
        id: 57,
        name: "校园春色"
      },
      {
        id: 58,
        name: "家庭乱伦"
      }
    ],
    picked: '',
    selectedNovels:''
  };

  componentDidMount() {
    this.props.navigation.addListener('didFocus', () => {
      if (this.props.user.isLogin){
        this.props.getUsers("Recommended");
      }

      (this.props.novel.novels !== "")
      ? this.setState({ 
          selectedNovels: this.props.novel.novels, 
          novels: this.props.novel.novels, 
          refreshing: false 
        })
      : this.props.generateNovels();
    })

    // setTimeout(() => {
    //   for (i=0 ; i<this.state.category.length ; i++){
    //     this.state.category[i]['icon'] = this.state.iconString[i]
    //   }
    // }, 3000)
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.user.screen == "Recommended"){
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
    
    this.setState({
      selectedNovels: nextProps.novel.novels,
      novels: nextProps.novel.novels,
      refreshing: false
    })
  }

  readNovel = (name, time, hits, content, type) => {
    if (this.props.user.isLogin){
      if (this.props.user.count !== 10) {
        this.props.navigation.navigate('Novel', {
          name,
          time, 
          hits, 
          content, 
          type,
          novelList: this.state.novels.slice( Math.random()*6, (Math.random()*13) + 7 )
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

  //novel type filtering
  switchType = (id) => {
    this.setState({ picked: id, selectedNovels: '' }, () => {
      let temp = [];

      Object.keys(this.state.novels).forEach(g => {
        if (this.state.novels[g].type_id ===  id){
          temp.push(this.state.novels[g]);
          this.setState({
            selectedNovels: [...this.state.selectedNovels, ...temp]
          })
        }
      })
    })

    //re-select to reset back to initial loaded data (all novels)
    if (id === this.state.picked){ 
      this.setState({ selectedNovels: this.state.novels, picked: '' })
    }
  }

  render() {
    return (
      <View style={styles.mainContainer}>
        <ScrollView
          refreshControl={
            <RefreshControl
              title="HI HAMSAP HAI"
              titleColor="white"
              progressBackgroundColor="white"
              refreshing={this.state.refreshing}
            />
          }
        >

          <AdsBanner />
          <View style={styles.typeContainer}>
            <Text style={styles.type}>热门专题</Text>

            <FlatList
              columnWrapperStyle={{ flex: 1, justifyContent: 'space-around' }}
              numColumns={3}
              data={this.state.novelType}
              keyExtractor={item => item.id.toString()}
              renderItem={({item}) => 
                <Badge
                  value={item.name}
                  badgeStyle={{ padding: 8, backgroundColor: this.state.picked == item.id ? "gray" : "white", margin: 7 }}
                  textStyle={{ color: this.state.picked == item.id ? 'white' : "black", fontSize: 13 }}
                  onPress={() => this.switchType(item.id)}
                />
              }
            />

          </View>

          <ScrollViewHolder 
            novels={this.state.selectedNovels} 
            onPress={(name, time, hits, content, type) => this.readNovel(name, time, hits, content, type)} 
          />
          
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return{
    novel: state.novelReducer,
    user: state.userReducer
  }
}

const mapDispatchToProps = (dispatch) => {
  return{
    generateNovels: () => { dispatch(getNovels()) },
    getUsers: (currScreen) => { dispatch(getUsers(currScreen)) },
    onCounterReset: () => { dispatch(resetCounter()) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Recommended);