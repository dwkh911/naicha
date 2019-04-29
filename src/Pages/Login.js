import React, { Component } from 'react';
import { 
    View, 
    Text,
    StyleSheet,
    Image,
    Dimensions,
    TouchableOpacity
} from 'react-native';
import { Icon, Button, Input } from 'react-native-elements'
import { connect } from 'react-redux'
import md5 from 'md5'
import { getUsers, userLogin } from '../action/actions'
import styles from "../Stylesheet/Login-stylesheet"

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      secured: true,
      username: "",
      password: "",
      userData: "",
      error: "",
      isLogin: this.props.user.isLogin
    };
  }

  componentDidMount() {
    this.props.getUsers();
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

  render() {
    return (
      <View style={styles.container}>
        <Image
            // source={{ uri: "https://www.5naicha.com/template/app/images/welcome.jpg" }}
            source={{ uri: "https://i.pinimg.com/originals/11/11/d3/1111d3403e4b4ebca167249d4ab8ae2b.jpg" }}
            style={styles.headerImg}
        />

        <Text style={styles.loginHeader}>用户名登陆</Text>

        <Icon
          name="left"
          type="antdesign"
          color="grey"
          size={21}
          containerStyle={{ position: 'absolute', padding: 10, margin: 7 }}
          onPress={() => this.props.navigation.goBack()}
        />

        {
          (this.state.isLogin)
          ?
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ color: 'white', fontSize: 18 }}>
              您已登陆!
            </Text>
          </View>
          :
          <View style={styles.inputContainer}>
            <Input
              ref={ref => this.user = ref}
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

          </View>
        }

      </View>
    );
  }
}

// const styles = StyleSheet.create({
//     container: {
//       flex: 1,
//       backgroundColor: '#23272A'
//     },
//     headerImg: {
//       resizeMode: 'stretch',
//       width: width,
//       height: height/3
//     },
//     loginHeader: {
//       textAlign: 'center',
//       fontSize: 16,
//       padding: 15,
//       color: 'white',
//       backgroundColor: 'tomato'
//     },
//     inputContainer: {
//       backgroundColor: 'white',
//       borderRadius: 10,
//       padding: 10,
//       margin: 10
//     },
//     input: {
//       marginBottom: 10
//     },
//     btnStyle: {
//       backgroundColor: 'tomato',
//       borderRadius: 35,
//       marginBottom: 8
//     },
//     warning: {
//       color: 'red',
//       textAlign: 'center',
//       fontSize: 12
//     }
// })

const mapStateToProps = (state) => {
  return{
    user: state.userReducer
  }
}

const mapDispatchToProps = (dispatch) => {
  return{
    getUsers: () => dispatch(getUsers()),
    onLogin: (user, pass) => dispatch(userLogin(user, pass))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
