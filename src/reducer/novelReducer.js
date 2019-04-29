import { GET_ALL_NOVELS } from "../action/types";

const initialState={
    novels: ""
}

const novelReducer = (state= initialState, action) => {
    switch (action.type){
        case GET_ALL_NOVELS:
            return{
                ...state,
                novels: action.novelList
            }
        default:
            return state
    }
}

export default novelReducer;