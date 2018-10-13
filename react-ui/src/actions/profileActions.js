import axios from 'axios'
import { PROFILE_REQUEST_START, SET_PROFILE, ERROR, CLEAR_PROFILE } from './constants'

export const getProfile = (id) => (dispatch) => {
    dispatch({
        type: PROFILE_REQUEST_START
    })
    axios.get(`/api/profiles/${id}`)
    .then(profile => {
        return dispatch({
            type: SET_PROFILE,
            profile: profile.data
        })
    })
    .catch(err => {
        return dispatch({
            type: ERROR,
            errors: err.response.data
        })
    })
}

export const changeProfile = (name, middlename, surname, interests, bio, history) => (dispatch) => {
    const profileData = {
        name, 
        middlename, 
        surname, 
        interests, 
        bio
    }
    axios.post('/api/profiles/', profileData)
    .then(profile => {
        history.push(`/profiles/${profile.data.userId}`)
    })
    .catch(err => {
        return dispatch({
            type: ERROR,
            errors: err.response.data
        })
    })
}

export const clearProfile = () => {
    return {
        type: CLEAR_PROFILE
    }
}

export const deleteProfile = (history) => (dispatch) => {
    axios.delete(`/api/profiles/`)
    .then(() => {
        history.push('/posts/all')
    })
    .catch(err => {
        return dispatch({
            type: ERROR,
            errors: err.response.data
        })
    })
}
