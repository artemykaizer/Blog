import { REQUEST_END, SET_POSTS, REQUEST_START, SET_POST, CLEAR_POST, SET_CURRENT_POST } from '../actions/constants'

const defaultState = {
    isFetching: false,
    data: [],
    currentPost: {}
}
const postReducer = (state = defaultState, action) => {
    switch(action.type) {
        case REQUEST_START:
            return {...state, isFetching: true}
        case SET_POST: 
            return {...state, ...action.payload}
        case REQUEST_END: 
            return {...state, isFetching: false}
        case SET_POSTS: 
            return {...state, ...{data: action.posts}, isFetching: false}
        case CLEAR_POST: 
            return {...state, currentPost: {}}
        case SET_CURRENT_POST: 
            return {...state, currentPost: action.post, isFetching: false}
        default: 
            return state
    }
}

export default postReducer