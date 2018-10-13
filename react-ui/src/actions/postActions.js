import axios from 'axios'
import { REQUEST_END, SET_POSTS, REQUEST_START, ERROR, CLEAR_POST, SET_CURRENT_POST } from './constants'
export const editPost = (header, text, id, history) => (dispatch) => {
    const postData = {
        header,
        text
    }
    axios.put(`/api/posts/${id}`, postData)
        .then(post => {
            history.push(`/posts/post/${id}`)
        })
        .catch(err => {
            return dispatch({
                type: ERROR,
                errors: err.response.data
            })
        })
}


export const createPost = (header, text, history) => (dispatch) => {
    const postData = {
        header,
        text
    }
    dispatch({
        type: REQUEST_START
    })
    axios.post(`/api/posts/create`, postData)
        .then(post => {
            history.push(`/posts/post/${post.data._id}`)
        })
        .catch(err => {
            return dispatch({
                type: ERROR,
                errors: err.response.data
            })
        })
}


export const deletePost = (id, history) => (dispatch) => {
    dispatch({
        type: REQUEST_START
    })
    axios.delete(`/api/posts/${id}`)
    .then(posts => {
        history.push('/posts/all')
        return dispatch({
            type: SET_POSTS,
            posts: posts.data
        })
    })
    .catch(err => {
        return dispatch({
            type: ERROR,
            errors: err.response.data
        })
    })
}

export const getPosts = () => (dispatch) => {
    dispatch({
        type: REQUEST_START
    })
    axios.get('/api/posts')
    .then(posts => {
        return dispatch({
            type: SET_POSTS,
            posts: posts.data
        })
    })
    .catch(err => {
        return dispatch({
            type: ERROR,
            errors: err.response.data
        })
    })
}

export const getSinglePost = (id) => (dispatch) => {
    dispatch({
        type: REQUEST_START
    })
    axios.get(`/api/posts/${id}`)
    .then(post => {
        return dispatch({
            type: SET_CURRENT_POST,
            post: post.data
        })
    })
}

export const clearPost = () => {
    return {
        type: CLEAR_POST
    }
}

export const addComment = (text, id) => (dispatch) => {
    dispatch({
        type: REQUEST_START
    })
    axios.post(`/api/posts/${id}/comments`, {text: text})
    .then(post => {
        return dispatch({
            type: SET_CURRENT_POST,
            post: post.data
        })
    })
    .catch(err => {
        dispatch({
            type: REQUEST_END
        })
        return dispatch({
            type: ERROR,
            errors: err.response.data
        })
    })
}

export const deleteComment = (postId, id) => (dispatch) => {
    dispatch({
        type: REQUEST_START
    })
    axios.delete(`/api/posts/${postId}/comments/${id}`)
    .then(post => {
        return dispatch({
            type: SET_CURRENT_POST,
            post: post.data
        })
    })
    .catch(err => {
        return dispatch({
            type: ERROR,
            errors: err.response.data
        })
    })
}