import { combineReducers } from 'redux'
import authReducer from './authReducer'
import errorReducer from './errorReducer'
import postReducer from './postsReducer'
import profileReducer from './profileReducer'

const reducer = combineReducers({
    profile: authReducer,
    errors: errorReducer,
    posts: postReducer,
    currentProfile: profileReducer
})

export default reducer