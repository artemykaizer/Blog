import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { logoutUser } from '../actions/authActions'

class NavBar extends React.Component {
  constructor(props) {
    super(props)
    this.logout = this.logout.bind(this)
  }
  unloggedLinks() {
    return (
      <div className="navbar">
        <div className="container menu">
        <Link className="navbar_link" to="/login">Login</Link>
        <Link className="navbar_link" to="/registration">Registration</Link>
        <Link className="navbar_link" to="/posts/all">All posts</Link>
      </div>
      </div>
    )
  }

  logout() {
    this.props.logoutUser()
  }

  loggedLinks() {
    return (
      <div className="navbar">
        <div className="container menu">
          <a className="navbar_link" onClick={this.logout}>Logout</a>
          <Link className="navbar_link" to={`/profiles/${this.props.profile.id}`}>Profile</Link>
          <Link className="navbar_link" to="/posts/all">All posts</Link>
        </div>
      </div>
    )
  }


  render() {
    if(this.props.profile) {
      return (
        <div>
          {this.loggedLinks()}
        </div>
      )
    } else {
      return (
        <div>
          {this.unloggedLinks()}
        </div>
      )
    }
  }
}

const mapStateToProps = (state) => ({
  profile: state.profile
})

const mapDispatchToProps = (dispatch) => {
  return {
    logoutUser: () => dispatch(logoutUser())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBar)