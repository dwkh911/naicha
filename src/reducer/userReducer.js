import {
    GET_USER,
    WATCH_COUNTER,
    LOGIN_USER,
    LOGOUT_USER,
    RESET_COUNTER
} from '../action/types'

const initialState = {
    users: "",
    count: "",
    userId: "",
    username: "",
    userNickname: "",
    userPwd:"",
    rawPwd: "",
    userNewPwd1: "",
    userNewPwd2: "",
    userQQ: "",
    userPhone: "",
    userQues: "",
    userAns: "",
    isLogin: "",
    screen: ""
}

const userReducer = (state=initialState, action) => {
    switch(action.type){
        case GET_USER:
            return{
                ...state,
                users: action.userList,
                screen: action.screen
            }
        case WATCH_COUNTER: 
            return{
                ...state,
                count: (state.count == 10) 
                        ? 10
                        : state.count + 1
            }
        case RESET_COUNTER:
            return{
                ...state,
                count: 0
            }
        case LOGIN_USER:
            return{
                ...state,
                userId: action._user.user_id,
                username: action._user.user_name,
                userNickname: action._user.user_nick_name,
                userPwd:action._user.user_pwd,
                rawPwd: action._pass,
                userQQ: action._user.user_qq,
                userPhone: action._user.user_phone,
                userQues: action._user.user_question,
                userAns: action._user.user_answer,
                count: action._user.user_viewing_num,
                isLogin: true
            }
        case LOGOUT_USER:
            return{
                ...state,
                userId: "",
                username: "",
                userNickname: "",
                userPwd: "",
                rawPwd: "",
                userQQ: "",
                userPhone: "",
                userQues: "",
                userAns: "",
                count: "",
                isLogin: false
            }
        default:
            return state;
    }
}

export default userReducer;