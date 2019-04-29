import { combineReducers } from 'redux'
import videoReducer from './videoReducer'
import novelReducer from './novelReducer'
import userReducer from './userReducer'

export default combineReducers({
    videoReducer,
    novelReducer,
    userReducer
})