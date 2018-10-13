import {createStore, applyMiddleware, compose} from 'redux'
import thunkMiddleware from 'redux-thunk'
import reducer from '../reducers/index'

const initialStore = {}

const store = createStore(reducer,
                         initialStore, 
                          compose(applyMiddleware(thunkMiddleware),
                          window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()))

export default store 