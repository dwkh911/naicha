import { 
    VIDEO_API,
    NOVEL_API,
    CATEGORY_API,
    USER_API,
    WATCH_COUNTER,
    LOGIN_USER,
    LOGOUT_USER,
    RESET_COUNTER
} from './types'

export const getVideos = () => {
    return{
        type: VIDEO_API
    }
}

export const getNovels = () => {
    return{
        type: NOVEL_API
    }
}

export const getCategory = () => {
    return {
        type: CATEGORY_API
    }
}

export const getUsers = (screen) => {
    return {
        type: USER_API,
        screen
    }
}

export const watchCounter = () => {
    return {
        type: WATCH_COUNTER
    }
}

export const userLogin = (_user, _pass) => {
    return{
        type: LOGIN_USER,
        _user,
        _pass
    }
}

export const userLogout = () => {
    return{
        type: LOGOUT_USER
    }
}

export const resetCounter = () => {
    return{
        type: RESET_COUNTER
    }
}