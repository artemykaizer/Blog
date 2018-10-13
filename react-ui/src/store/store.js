import {createStore, applyMiddleware, compose} from 'redux'
import thunkMiddleware from 'redux-thunk'
import reducer from '../reducers/index'
import { composeWithDevTools } from "redux-devtools-extension";

const initialStore = {}

const store = createStore(reducer, initialStore, composeWithDevTools(applyMiddleware(thunkMiddleware)))

export default store 
