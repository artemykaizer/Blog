import { LOGIN_USER, AUTO_LOGIN, LOGOUT_USER } from "../actions/constants";

const authReducer = (state = "", action) => {
    switch(action.type) {
        case LOGIN_USER: 
            return {...action.payload}
        case AUTO_LOGIN:
            return {...action.payload}
        case LOGOUT_USER:
            return ""
        default: 
            return state
    }
}

export default authReducer