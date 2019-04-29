import React, { Component } from 'react';
import { 
    View, 
    Text, 
    ScrollView, 
    FlatList, 
    TouchableOpacity,
    Modal,
    ActivityIndicator,
    Alert
} from 'react-native';
import { Icon } from 'react-native-elements'
import { connect } from 'react-redux'
import AdsBanner from '../Component/AdsBanner';
import { postUserInfo } from '../saga/API';
import { watchCounter, getUsers, resetCounter } from '../action/actions';
import styles from '../Stylesheet/Novel-stylesheet'


class Novel extends Component {
  constructor(props) {
    super(props);
    this.state = {
        title: "",
        views: "",
        type: "",
        date: "",
        content: "",
        modal: false,
    };
    this.params = this.props.navigation.state.params;
  }

  componentDidMount() {

      this.props.getUsers("Novel");

      //intial render of novel, stay 3second will increase view counter and POST
      this.setState({
        title: this.params.name,
        views: this.params.hits,
        type: this.params.type,
        date: this.params.time,
        content: this.params.content
      }, () => {
        let user = this.props.user;
        setTimeout(() => {
          this.props.addCounter();
          postUserInfo(
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
        }, 3000);
      });
  }

  componentWillReceiveProps(nextProps){

    if (nextProps.user.screen == "Novel"){
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

  //novel switching, 3seconds delay to POST and render to check view counter from backend
  onSwitch = (resp) => {
    let user = this.props.user;

    this.props.getUsers("Novel");

    this.setState({
      modal: true
    }, () => {
      this.scroll.scrollTo({ x: 0, y: 0 });
      setTimeout(() => {
      if (this.props.user.count !== 10){
        this.setState({
          title: resp.art_name,
          views: resp.art_hits,
          type: resp.type_name,
          date: resp.art_time,
          content: resp.art_content
        }, () => {
          this.props.addCounter();
          postUserInfo(
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
    }, 3000)
    });
  }
  
  render() {
    return (
    <View style={{ flex: 1, backgroundColor: '#23272A' }}>
      <ScrollView ref={ref => this.scroll = ref} showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <Icon 
                    onPress={() => this.props.navigation.goBack()} 
                    underlayColor='transparent' 
                    name='left' 
                    type='antdesign' 
                    color='white' 
                    size={18} 
                    containerStyle={{alignSelf: 'flex-start', padding: 6 }} 
                />
                <Text numberOfLines={1} style={styles.novelTitle}>{this.state.title}</Text>
                <View style={styles.novelDetails}>
                    <Icon 
                        containerStyle={styles.viewIcon}
                        name='eyeo' 
                        type='antdesign' 
                        size={18} 
                        color='white' 
                    />
                    <Text style={styles.whiteText}>{this.state.views} views</Text>

                    <Icon 
                        containerStyle={styles.categoryIcon}
                        name='staro' 
                        type='antdesign' 
                        size={18} 
                        color='white' 
                    />
                    <Text style={styles.categoryText}>所属分类: <Text style={styles.whiteText}>{this.state.type}</Text></Text>
                </View>
                
                <Text style={styles.whiteText}>发布于: {this.state.date}</Text>
            </View>

            <View style={styles.contentContainer}>

                <Text style={styles.content}>
                    {this.state.content.replace(/<!--内容开始-->|<!--内容结束-->|<|>|p|\//g,  "")}
                    {/* {this.params.content.substring(17, this.params.content.length-17)} */}
                </Text>

                <Text style={styles.endContent}>
                    -文章完毕-
                </Text>

                <AdsBanner />

                <View style={styles.suggestionContainer}>
                    <Text style={styles.suggestion}>猜你喜欢</Text>

                    <FlatList
                        data={this.params.novelList}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({item})=>
                            <TouchableOpacity onPress={() => this.onSwitch(item)} style={styles.suggestionBtn}>
                                <Text style={styles.suggestionTitle}>{item.art_name.replace("- 奶茶视频", "")}</Text>
                                <Text><Text style={{ color: '#ff70ab' }}>{item.art_hits}</Text> 阅读次数</Text>
                            </TouchableOpacity>
                        }
                    />
                </View>
            </View>
        </View>
      </ScrollView>
      
      <Modal 
          transparent={true} 
          visible={this.state.modal} 
          onShow={() => setTimeout(() => this.setState({ modal: false }), 2500)}
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
  return {
    user: state.userReducer
  }
}

const mapDispatchToProps = (dispatch) => {
  return{
    addCounter: () => dispatch(watchCounter()),
    getUsers: (currScreen) => dispatch(getUsers(currScreen)),
    onCounterReset: () => dispatch(resetCounter())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Novel);
