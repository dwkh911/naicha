import { takeLeading, put, call, select, all } from "redux-saga/effects";
import * as api from "./API";
import {
    VIDEO_API,
    NOVEL_API,
    GET_ALL_VIDEOS,
    GET_ALL_NOVELS,
    GET_CATEGORY,
    CATEGORY_API,
    USER_API,
    GET_USER
} from '../action/types'

function* videoSaga() {
    return yield takeLeading(VIDEO_API, videoFunc);
}

function* novelSaga() {
    return yield takeLeading(NOVEL_API, novelFunc);
}

function* categorySaga() {
    return yield takeLeading(CATEGORY_API, categoryFunc)
}

function* userSaga() {
    return yield takeLeading(USER_API, userFunc);
}

export default function* rootSaga() {
    yield all ([
        videoSaga(),
        novelSaga(),
        categorySaga(),
        userSaga()
    ])
}

function* videoFunc() {
    try{
        const response = yield call(api.fetchVideos);

        const vidList = response.list;

        yield put({
            type: GET_ALL_VIDEOS,
            vidList
        })
    } catch (e) {
        throw alert("连接不稳定!");
    }
}

function* novelFunc() {
    try{
        const response = yield call(api.fetchNovels);

        const novelList = response.list;

        yield put({
            type: GET_ALL_NOVELS,
            novelList
        })
    } catch(e) {
        throw alert("连接不稳定!");
    }
}

function* categoryFunc() {
    try{
        const response = yield call(api.fetchCategory);

        const catList = response.class;

        yield put({
            type: GET_CATEGORY,
            catList
        })
    } catch(e) {
        throw alert("连接不稳定!");
    }
}

function* userFunc(resp) {
    try{
        const response = yield call(api.fetchUsers);
        
        const userList = response.list;

        const screen = resp.screen;

        yield put({
            type: GET_USER,
            userList,
            screen
        })
    } catch(e) {
        throw alert("连接不稳定!")
    }
}