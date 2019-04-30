import React, {Component} from 'react';
import {
  Platform, 
  StyleSheet, 
  Text, 
  View,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
  Alert
} from 'react-native';
import styles from '../Stylesheet/Profile-stylesheet'
import { Icon, Avatar, ListItem, Input, Button } from 'react-native-elements'
import AdsBanner from '../Component/AdsBanner';
import { connect } from 'react-redux'
import { userLogout, getUsers, userLogin } from "../action/actions"
import { postUserInfo } from "../saga/API"
import md5 from 'md5'
import Spinner from 'react-native-loading-spinner-overlay'

const list = [
  {
    title:'历史纪录',
    subtitle:'目前历史观看过0部',
    icon:'history',
    type:'fontawesome',
    color:'rgb(255,99,71)',
    bg: 'rgba(255,99,71, 0.1)',
    press: () => console.log('history')
  },
  {
    title:'我的缓存',
    subtitle:'目前本地大片有0部',
    icon:'clouddownloado',
    type:'antdesign',
    color: 'rgb(100,181,246)',
    bg: 'rgba(100,181,246,0.1)',
    press: () => console.log('saved')
  },
  {
    title:'我的喜欢',
    subtitle:'目前已有喜欢0部',
    icon:'hearto',
    type:'antdesign',
    color:'rgb(255,213,79)',
    bg: 'rgba(255,213,79, 0.1)',
    press: () => console.log('liked')
  },
]

class Profile extends Component {

  constructor(props) {
    super(props);
    this.state={
      loginText: "看官大人请登录",
      active: true,
      name:"",
      nickname: "",
      qq: "",
      email: "",
      phone: "",
      question: "",
      answer: "",
      userInfo: false,
      edit: false,
      count: "-",
      oriPwd: "",
      pwd1: "",
      pwd2: "",
      loading: false
    }
  }

  componentDidMount() {
    (this.props.user.isLogin)
    ? this.setState({
        loginText: "欢迎用户，" + this.props.user.username,
        name: this.props.user.username,
        nickname: this.props.user.userNickname,
        qq: this.props.user.userQQ,
        email: this.props.user.userEmail,
        phone: this.props.user.userPhone,
        question: this.props.user.userQues,
        answer: this.props.user.userAns,
        userInfo: true,
        count: (this.props.user.count == 0) ? 10 : 10-this.props.user.count
      })
    : null
  }

  componentWillReceiveProps(nextProps){
    (nextProps.user.isLogin)
    ?
    this.setState({
      loginText: "欢迎用户，" + nextProps.user.username,
      name: nextProps.user.username,
      nickname: nextProps.user.userNickname,
      qq: nextProps.user.userQQ,
      email: nextProps.user.userEmail,
      phone: nextProps.user.userPhone,
      question: nextProps.user.userQues,
      answer: nextProps.user.userAns,
      userInfo: true,
      count: (nextProps.user.count == 0) ? 10 : 10-nextProps.user.count
    })
    :
    this.setState({
      loginText: "看官大人请登录",
      // name: "",
      // nickname: "",
      // qq: "",
      // phone: "",
      // question: "",
      // answer: "",
      userInfo: false,
      count: "-"
    })
  }

  logout = () => {
    this.props.userLogout();
    Alert.alert(
      "",
      "登出成功!",
      [
        {
          text: "确定",
          style: "cancel"
        }
      ]
    );
  }

  //user info update
  post = () => {
    if (this.state.oriPwd !== this.props.user.rawPwd){
      Alert.alert(
        "用户资料不匹配",
        "原密码不正确!",
        [
          {
            text: "确定",
            style: "cancel"
          }
        ]
      );
    } else {
      if (this.state.pwd1 !== this.state.pwd2){
        Alert.alert(
          "用户资料不匹配",
          "新密码和重复密码不匹配！!",
          [
            {
              text: "确定",
              style: "cancel"
            }
          ]
        );
      } else {
        postUserInfo(
          this.props.user.userId,
          this.props.user.username,
          this.props.user.userPwd,
          this.state.nickname,
          this.state.qq,
          this.state.email,
          this.state.phone,
          this.state.question,
          this.state.answer,
          this.props.user.count,
          this.props.user.rawPwd,
          this.state.pwd1,
          this.state.pwd2
        );
        this.setState({ loading: true });

        //time delay to update redux state for POST url updating
        setTimeout(() => 
        {
          this.profScroll.scrollTo({ x: 0, y: 0 });
          this.props.getUsers("Profile");
          setTimeout(() => {
            this.setState({ loading: false, edit: false }, Alert.alert("", "资料更新成功!", [ { text: "确定", style: "cancel" } ]));
            Object.keys(this.props.user.users).forEach(g => {
              if (this.props.user.users[g].user_id == this.props.user.userId){
                if (this.state.pwd2 != ""){
                  this.props.onLogin(this.props.user.users[g], this.state.pwd2);
                } else {
                  this.props.onLogin(this.props.user.users[g], this.state.oriPwd);
                }
              }
            })
          }, 2000)
        },2000)
      }
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Spinner
          visible={this.state.loading}
        />
        <ImageBackground 
          style={styles.bgImg}
          source={{ uri: "https://png.pngtree.com/thumb_back/fh260/background/20190221/ourmid/pngtree-black-gold-cool-geometric-background-banner-image_22925.jpg" }}
        >
          <View style={styles.header}>
            <Icon
              // type='feather'
              // name='settings'
              type='antdesign'
              name='logout'
              size={25}
              color={(this.props.user.isLogin) ? '#FFCC80' : "transparent"}
              containerStyle={{marginRight:10, backgroundColor: 'transparent'}}
              onPress={() => this.logout()}
              underlayColor='transparent'
            />
          </View>

          <View style={styles.contentContainer}>
            <ScrollView 
              ref={ref => this.profScroll = ref}
              showsVerticalScrollIndicator={false} 
              style={styles.contentScrollview}
            >
              <View style={styles.content}>
                <View style={styles.buttonBanner}>
                  <TouchableOpacity onPress={() => console.log(this.state.userInfo)} style={[styles.button,{marginRight:40}]}>
                    <Text style={styles.buttonLabel}>激活码兑换</Text>
                  </TouchableOpacity>

                  <TouchableOpacity onPress={() => this.props.navigation.navigate('Login')} style={[styles.button,{marginLeft:40}]}>
                    <Text style={styles.buttonLabel}>登陆注册</Text>
                  </TouchableOpacity>
                </View>

                <View style={styles.centralised}>
                  <Text style={styles.loginText}>{this.state.loginText}</Text>
                  <Text>看广告， 推广可增加更多次数哦~</Text>
                </View>

                <View style={styles.kuotaContainer}>
                  <View style={styles.kuota}>
                    <Text style={styles.kuotaCount}>{this.state.count}/10</Text>
                    <Text>今日剩余观影次数</Text>
                  </View>

                  <View style={styles.levelup}>
                    <TouchableOpacity>
                      <Icon
                        name='award'
                        type='feather'
                        size={40}
                        color='gold'
                        containerStyle={{padding:10}}
                      />
                      <Text>去推广升级吧</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>

              {
                this.state.userInfo 
                ?
                  this.state.edit
                  ?
                  <View style={styles.iconContainer}>
                    <Text style={styles.changeProfileText}>修改资料</Text>
                    <Input
                      label="用户名"
                      value={this.state.name}
                      onChangeText={(text) => this.setState({ name: text })}
                      containerStyle={{ marginBottom: 10, marginHorizontal: 4 }}
                    />
                    <Input
                      label="用户称呼"
                      value={this.state.nickname}
                      onChangeText={(text) => this.setState({ nickname: text })}
                      containerStyle={{ marginBottom: 10, marginHorizontal: 4 }}
                    />
                    <Input
                      label="原密码"
                      value={this.state.oriPwd}
                      onChangeText={(text) => this.setState({ oriPwd: text })}
                      containerStyle={{ marginBottom: 10, marginHorizontal: 4 }}
                      secureTextEntry
                    />
                    <Input
                      label="新密码"
                      value={this.state.pwd1}
                      onChangeText={(text) => this.setState({ pwd1: text })}
                      containerStyle={{ marginBottom: 10, marginHorizontal: 4 }}
                      secureTextEntry
                    />
                    <Input
                      label="重复密码"
                      value={this.state.pwd2}
                      onChangeText={(text) => this.setState({ pwd2: text })}
                      containerStyle={{ marginBottom: 10, marginHorizontal: 4 }}
                      secureTextEntry
                    />
                    <Input
                      label="QQ号码"
                      value={this.state.qq}
                      onChangeText={(text) => this.setState({ qq: text })}
                      containerStyle={{ marginBottom: 10, marginHorizontal: 4 }}
                    />
                    <Input
                      label="用户邮件"
                      value={this.state.email}
                      onChangeText={(text) => this.setState({ email: text })}
                      containerStyle={{ marginBottom: 10, marginHorizontal: 4 }}
                    />
                    <Input
                      label="联系手机"
                      value={this.state.phone}
                      onChangeText={(text) => this.setState({ phone: text })}
                      containerStyle={{ marginBottom: 10, marginHorizontal: 4 }}
                    />
                    <Input
                      label="密码问题"
                      value={this.state.question}
                      onChangeText={(text) => this.setState({ question: text })}
                      containerStyle={{ marginBottom: 10, marginHorizontal: 4 }}
                    />
                    <Input
                      label="密码答案"
                      value={this.state.answer}
                      onChangeText={(text) => this.setState({ answer: text })}
                      containerStyle={{ marginBottom: 10, marginHorizontal: 4 }}
                    />

                    <View style={{ flex: 1, flexDirection: "row", justifyContent: 'flex-end' }}>
                      <TouchableOpacity onPress={this.post} style={styles.saveButton}>
                        <Text style={styles.buttonText}>保存</Text>
                      </TouchableOpacity>

                      <TouchableOpacity onPress={() => this.setState({ edit: false })} style={styles.saveButton}>
                        <Text style={styles.buttonText}>取消</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                  :
                  <View style={styles.iconContainer}>
                    <Text style={styles.changeProfileText}>用户资料</Text>
                    <Text style={styles.userLabel}>用户名: <Text style={styles.userContent}>{this.props.user.username}</Text></Text>
                    <Text style={styles.userLabel}>用户称呼: <Text style={styles.userContent}>{this.props.user.userNickname}</Text></Text>
                    <Text style={styles.userLabel}>用户QQ: <Text style={styles.userContent}>{this.props.user.userQQ}</Text></Text>
                    <Text style={styles.userLabel}>用户邮件: <Text style={styles.userContent}>{this.props.user.userEmail}</Text></Text>
                    <Text style={styles.userLabel}>电话号码: <Text style={styles.userContent}>{this.props.user.userPhone}</Text></Text>

                    <TouchableOpacity onPress={() => this.setState({ edit: true })} style={{ marginVertical: 10, borderWidth: 2, alignSelf: 'flex-end', padding: 5, width: 100, borderColor: '#FFCA28', borderRadius: 8, justifyContent: 'center', alignItems: 'center' }}>
                      <Text style={{ color: '#FFCA28', fontSize: 16 }}>修改</Text>
                    </TouchableOpacity>
                  </View>
                :
                null
              }
              
              <AdsBanner />

              <View style={styles.record}>
                {
                  list.map((item, i) => (
                    <ListItem
                      onPress={item.press}
                      key={i}
                      title={item.title}
                      subtitle={item.subtitle}
                      titleStyle={{color:'black'}}
                      subtitleStyle={{fontSize:12, color:'lightgray'}}
                      leftIcon={{name: item.icon, type:item.type, color: item.color, size:35, containerStyle:{backgroundColor: item.bg, padding:5}}}
                      chevron
                    />
                  ))
                }
              </View>

              <Avatar
                size="large"
                rounded
                title='DEMO'
                containerStyle={{position:'absolute',left:'39%',top:'2%'}}
              />
            </ScrollView>
          </View>
        </ImageBackground>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return{
    user: state.userReducer
  }
}

const mapDispatchToProps = (dispatch) => {
  return{
    userLogout: () => dispatch(userLogout()),
    getUsers: (currScreen) => dispatch(getUsers(currScreen)),
    onLogin: (user, pass) => dispatch(userLogin(user, pass))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
