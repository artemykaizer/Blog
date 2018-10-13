import React, { Component } from 'react';
import store from './store/store'
import { Route, BrowserRouter, Switch } from 'react-router-dom'
import PrivateRoute from './components/PrivateRoute'
import { Provider } from 'react-redux'
import NavBar from './components/NavBar'
import RegisterForm from './components/RegisterForm'
import LoginForm from './components/LoginForm'
import PostsList from './components/PostsList'
import CreatePost from './components/CreatePost'
import SinglePost from './components/SinglePost'
import EditForm from './components/EditForm'
import Profile from './components/Profile' 
import CreateProfileForm from './components/CreateProfileForm'
import EditProfileForm from './components/EditProfileForm'
import MainPage from './components/MainPage'
import ErrorHandler from './components/ErrorHandler'
import axios from 'axios'
import { AUTO_LOGIN } from './actions/constants'

if(localStorage.getItem('auth')) {
  axios.defaults.headers.common['Authorization'] = localStorage.getItem('auth')
  store.dispatch({
    type: AUTO_LOGIN,
    payload: {
      token: localStorage.getItem('auth'),
      id: localStorage.getItem('id')
    }
  })
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
      
        <BrowserRouter>
        
        <div>
          <NavBar/>
          <ErrorHandler>
          <Switch>
            <Route path="/" exact component = {MainPage}/>
            <Route path="/registration" component = {RegisterForm}/>
            <Route path="/login" component = {LoginForm}/>
            <Route path="/posts/all" component={PostsList}/>
            <PrivateRoute path="/create" component={CreatePost} />
            <PrivateRoute path="/posts/post/:id" component={SinglePost} />
            <PrivateRoute path="/profiles/:id" component={Profile} />
            <PrivateRoute path="/profile/create" component={CreateProfileForm} />
            <PrivateRoute path="/profile/edit" component={EditProfileForm} />
            <PrivateRoute path="/posts/edit/:id" component={EditForm} />
            <Route path="*" component={ErrorHandler} />
          </Switch>
          </ErrorHandler>
        </div>
        
        </BrowserRouter>
        
      </Provider>
    )
  }
}

export default App;
