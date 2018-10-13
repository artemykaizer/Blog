import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getProfile, deleteProfile } from '../actions/profileActions'
import { Link } from 'react-router-dom'
import { clearErrors } from '../actions/errorsActions'
import { withRouter } from 'react-router'
import Loader from './Loader'

class Profile extends Component {
  componentWillUnmount() {
    this.props.clearErrors()
  }

  componentDidMount() {
    this.props.getProfile(this.props.match.params.id)
  }

  render() {
    const name = this.props.currentProfile.profile.name
    const surname = this.props.currentProfile.profile.surname
    const middlename = this.props.currentProfile.profile.middlename
    const bio = this.props.currentProfile.profile.bio
    const interests = this.props.currentProfile.profile.interests

    if(this.props.errors.profile || Object.keys(this.props.currentProfile).length <= 1) {
        return (
            <div className="container">
                <h3>There is no profile.</h3>
                {(this.props.match.params.id === this.props.profile.id ) ?
                <p>Do you want to <Link to="/profile/create">create</Link>?</p>
                :
                null
                }
            </div>
        )
    }

    if(this.props.currentProfile.isFetching) {
        return <Loader/>
    }

    return (
        <div className="container">
        <h3 className="profile-header">Profile</h3>
        {this.props.match.params.id === this.props.profile.id ?
          <div className="icons-bar-profile">
           <i className="material-icons" onClick={() => this.props.deleteProfile(this.props.history)}>delete</i>
           <Link className="material-icons edit_icon" to="/profile/edit">edit</Link>
           </div>
          :
          null
        }
        {(name || middlename || surname) ?
            <div className="profile-items">
                <h4 className="profile-items-headers">Fullname</h4>
                {name ? 
                    <p>Name: {name}</p> :
                    null
                }
                {middlename ? 
                    <p>Middlename: {middlename}</p> :
                    null
                }
                    {surname ? 
                    <p>Surname: {surname}</p> :
                    null
                }
            </div>
            :
            <p>User did not specify a name.</p>
        }
        <div className="profile-items">
        <h4 className="profile-items-headers">Bio</h4>
        {bio ? 
            <p>{bio}</p>
            :
            <p>User did not specify a bio.</p>
        }
        </div>
        <div className="profile-items">
        <h4 className="profile-items-headers">Interests</h4>
        {interests ? 
            <p>{interests}</p>
            :
            <p>User did not specify interests.</p>
        }
        </div>
        </div>
    )

    }
}

const mapStateToProps = (state) => ({
  profile: state.profile,
  currentProfile: state.currentProfile,
  errors: state.errors
})

const mapDispatchToProps = (dispatch) => ({
    getProfile: (id) => dispatch(getProfile(id)),
    clearErrors: () => dispatch(clearErrors()),
    deleteProfile: (history) => dispatch(deleteProfile(history))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Profile))
