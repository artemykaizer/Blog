import React, { Component } from 'react'
import { connect } from 'react-redux'
import ProfileForm from './ProfileForm'
import { clearErrors } from '../actions/errorsActions'
import { withRouter } from 'react-router'
import { changeProfile, getProfile } from '../actions/profileActions'
import Loader from './Loader'


export class CreateProfileForm extends Component {
  constructor(props) {
    super(props)
    this.onSubmit = this.onSubmit.bind(this)
  }
  componentWillUnmount() {
        this.props.clearErrors()
  }

  componentDidMount() {
      this.props.getProfile(this.props.profile.id)
  }

  onSubmit(name, middlename, surname, bio, interests, history) {
      this.props.changeProfile(name, middlename, surname, bio, interests, this.props.history)
  }

  
  render() {
    if(this.props.currentProfile.isFetching) {
        return <Loader/>
    }

    return (
      <div className="container">
        <h1>Edit your profile</h1>
        <ProfileForm
          onSubmit={this.onSubmit}
          errors={this.props.errors}
          defaultName={this.props.currentProfile.profile.name}
          defaultSurname={this.props.currentProfile.profile.surname}
          defaultMiddlename={this.props.currentProfile.profile.middlename}
          defaultBio={this.props.currentProfile.profile.bio}
          defaultInterests={this.props.currentProfile.profile.interests}
        />
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  errors: state.errors,
  profile: state.profile,
  currentProfile: state.currentProfile
})

const mapDispatchToProps = (dispatch) => {
    return {
        clearErrors: () => dispatch(clearErrors()),
        getProfile: (id) => dispatch(getProfile(id)),
        changeProfile: (name, middlename, surname, bio, interests, history) => dispatch(changeProfile(name, middlename, surname, bio, interests, history))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CreateProfileForm))