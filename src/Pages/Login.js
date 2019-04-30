import React, { Component } from 'react';
import { 
    View, 
    Text,
    StyleSheet,
    Image,
    Dimensions,
    TouchableOpacity,
    Alert,
    ScrollView
} from 'react-native';
import { Icon, Button, Input } from 'react-native-elements'
import { connect } from 'react-redux'
import md5 from 'md5'
import { getUsers, userLogin } from '../action/actions'
import styles from "../Stylesheet/Login-stylesheet"
import { postUserInfo, registerUser } from "../saga/API"

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      secured: true,
      username: "",
      password: "",
      pwd1: "",
      pwd2: "",
      userData: "",
      error: "",
      isLogin: this.props.user.isLogin,
      onRegister: false
    };
  }

  componentDidMount() {
    this.props.getUsers("Login");
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      userData: nextProps.user.users
    })
  }

  login = (_user, _pass) => {
    if (_user == "" || _pass == ""){
      this.setState({ error: "请输入用户资料!" })
    } else {
      Object.keys(this.state.userData).forEach(g => {
        if ((this.state.userData[g].user_name.toLowerCase() == _user.toLowerCase()) && (this.state.userData[g].user_pwd == md5(_pass))) {
          this.setState({ error: "" }, () => {
            this.props.navigation.navigate('Home');
            this.props.onLogin(this.state.userData[g], _pass);
          })
        } else {
          this.setState({ error: '用户查找失败!' })
        }
      });
    }
  }

  register = (_user, _passA, _passB) => {

    registerUser(_user, _passA, _passB)
    .then(response => response.json())
    .then(responseJson => {
      if (responseJson.code != 1){
        Alert.alert(
          "注册用户失败",
          responseJson.msg,
          [ { text: "确定", style: "cancel" } ]
        )
      } else {
        Alert.alert(
          "注册成功",
          "使用已注册账号登陆!",
          [ { text: "确定", style: "cancel" } ]
        )
        this.setState({
          onRegister: false,
          password: _passB
        }, () => this.props.getUsers("Login"));
      }
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Image
            // source={{ uri: "https://www.5naicha.com/template/app/images/welcome.jpg" }}
            source={{ uri: "https://i.pinimg.com/originals/11/11/d3/1111d3403e4b4ebca167249d4ab8ae2b.jpg" }}
            style={styles.headerImg}
        />

        <Text style={styles.loginHeader}>{this.state.onRegister ? "新用户注册" : "用户名登陆"}</Text>

        <Icon
          name="left"
          type="antdesign"
          color="grey"
          size={21}
          containerStyle={{ position: 'absolute', padding: 10, margin: 7 }}
          onPress={() => this.props.navigation.goBack()}
        />

        {
          (this.state.onRegister)
          ?
          <View style={styles.inputContainer}>
            <Input
              ref={ref => this.regUser = ref}
              autoCapitalize="none"
              placeholder="用户名"
              containerStyle={styles.input}
              inputStyle={{ fontSize: 15 }}
              value={this.state.username}
              onChangeText={(text) => this.setState({ username: text })}
              onSubmitEditing={() => this.regPwd1.focus()}
            />

            <Input
              ref={ref => this.regPwd1 = ref}
              secureTextEntry={this.state.secured}
              placeholder="用户密码"
              containerStyle={styles.input}
              inputStyle={{ fontSize: 15 }}
              value={this.state.pwd1}
              onChangeText={(text) => this.setState({ pwd1: text })}
              onSubmitEditing={() => this.regPwd2.focus()}
            />

            <Input
              ref={ref => this.regPwd2 = ref}
              secureTextEntry={this.state.secured}
              placeholder="重复密码"
              containerStyle={styles.input}
              inputStyle={{ fontSize: 15 }}
              value={this.state.pwd2}
              onChangeText={(text) => this.setState({ pwd2: text })}
              rightIcon={
                <Icon
                  name="eyeo"
                  type="antdesign"
                  size={22}
                  containerStyle={{ padding: 8 }}
                  color={(this.state.secured)? "lightgray" : "black"}
                  onPress={() => this.setState({ secured: !this.state.secured })}
                />
              }
            />

            <Button
              onPress={() => this.register(this.state.username, this.state.pwd1, this.state.pwd2)}
              title="注册"
              buttonStyle={{ backgroundColor: 'tomato', borderRadius: 35, marginVertical: 10 }}
            />

            <TouchableOpacity style={{ justifyContent: 'center', alignItems: "center" }} onPress={() => this.setState({ onRegister: false })}>
              <Text>已有账号立即登陆</Text>
            </TouchableOpacity>
          </View>
          :
          <View style={styles.inputContainer}>
            <Input
              ref={ref => this.user = ref}
              autoCapitalize="none"
              placeholder="请输入用户名"
              containerStyle={styles.input}
              inputStyle={{ fontSize: 15 }}
              value={this.state.username}
              onChangeText={(text) => this.setState({ username: text })}
              onSubmitEditing={() => this.pwd.focus()}
            />

            <Input
              ref={ref => this.pwd = ref}
              placeholder="请输入密码"
              containerStyle={styles.input}
              secureTextEntry={this.state.secured}
              inputStyle={{ fontSize: 15 }}
              value={this.state.password}
              onChangeText={(text) => this.setState({ password: text })}
              rightIcon={
                <Icon
                  name="eyeo"
                  type="antdesign"
                  size={22}
                  containerStyle={{ padding: 8 }}
                  color={(this.state.secured)? "lightgray" : "black"}
                  onPress={() => this.setState({ secured: !this.state.secured })}
                />
              }
            />

            <Button
              onPress={() => this.login(this.state.username, this.state.password)}
              title="登陆"
              buttonStyle={{ backgroundColor: 'tomato', borderRadius: 35, marginVertical: 10 }}
            />

            <Text style={styles.warning}>{this.state.error}</Text>

            <TouchableOpacity style={{ justifyContent: 'center', alignItems: "center" }} onPress={() => this.setState({ onRegister: true })}>
              <Text>注册新成员</Text>
            </TouchableOpacity>

          </View>
        }

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
    getUsers: (currScreen) => dispatch(getUsers(currScreen)),
    onLogin: (user, pass) => dispatch(userLogin(user, pass))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
