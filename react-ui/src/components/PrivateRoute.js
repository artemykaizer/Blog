import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'

const PrivateRoute = ({ component: Component, profile, ...rest }) => (
    <Route {...rest} render={(props) => (
        profile.token
        ? <Component {...props} />
        : <Redirect to='/login' />
    )} />
  )

const mapStateToProps = (state) => ({
  profile: state.profile
})

export default connect(mapStateToProps)(PrivateRoute)
