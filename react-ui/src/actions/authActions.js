import axios from 'axios'
import { LOGIN_USER, ERROR, LOGOUT_USER } from './constants'

export const register = (email, password, name, history) => (dispatch) => {
    const userData = {
        email,
        password,
        name
    }
    axios.post('/api/users/register', userData)
    .then(res => history.push('/login'))
    .catch(err => {
        return dispatch({
            type: ERROR,
            errors: err.response.data
        })
    })
}

export const login = (email, password) => (dispatch) => {
    const userData = {
        email,
        password
    }
    axios.post('/api/users/login', userData)
        .then(user => {
            localStorage.setItem('auth', user.data.token)
            localStorage.setItem('id', user.data.id)
            axios.defaults.headers.common['Authorization'] = user.data.token
            return dispatch({
                type: LOGIN_USER,
                payload: user.data
            })
        })
        .catch(err => {
            return dispatch({
                type: ERROR,
                errors: err.response.data
            })
        })
}

export const logoutUser = () => {
    localStorage.removeItem('auth')
    localStorage.removeItem('id')
    delete axios.defaults.headers.common['Authorization']
    return {
        type: LOGOUT_USER
    }
}
