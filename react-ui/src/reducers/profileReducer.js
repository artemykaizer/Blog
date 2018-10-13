import { SET_PROFILE, PROFILE_REQUEST_START, CLEAR_PROFILE } from '../actions/constants'

const defaultState = {
    profile: {},
    isFetching: false
}

export default (state = defaultState, action) => {
    switch(action.type) {
        case SET_PROFILE: 
            return {...state, profile: action.profile, isFetching: false }
        case PROFILE_REQUEST_START:
            return {...state, isFetching: true}
        case CLEAR_PROFILE:
            return defaultState
        default:
            return state
    }
}