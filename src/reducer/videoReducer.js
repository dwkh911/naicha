import { GET_ALL_VIDEOS, GET_CATEGORY } from '../action/types'

const initialState = {
    videos: "",
    category: ""
}

const videoReducer = (state = initialState, action) => {
    switch(action.type) {
        case GET_ALL_VIDEOS:
            return{
                ...state,
                videos: action.vidList
            }
        case GET_CATEGORY:
            return{
                ...state,
                category: action.catList
            }
        default:
            return state
    }
}

export default videoReducer;