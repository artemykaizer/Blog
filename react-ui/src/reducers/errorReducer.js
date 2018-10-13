import { ERROR, CLEAR_ERRORS } from '../actions/constants'

export default (state = {}, action) => {
    switch(action.type) {
        case ERROR: 
            return action.errors
        case CLEAR_ERRORS: 
            return {}
        default: return state
    }
}