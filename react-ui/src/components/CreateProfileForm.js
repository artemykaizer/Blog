import React, { Component } from 'react'
import { connect } from 'react-redux'
import ProfileForm from './ProfileForm'
import { clearErrors } from '../actions/errorsActions'
import { withRouter } from 'react-router'
import { changeProfile } from '../actions/profileActions'

export class CreateProfileForm extends Component {
  constructor(props) {
    super(props)
    this.onSubmit = this.onSubmit.bind(this)
  }
  
  componentWillUnmount() {
        this.props.clearErrors()
  }

  onSubmit(name, middlename, surname, bio, interests, history) {
      this.props.changeProfile(name, middlename, surname, bio, interests, this.props.history)
  }

  
  render() {
    return (
      <div className="container">
      <h1>Create your profile</h1>
        <ProfileForm
          onSubmit={this.onSubmit}
          errors={this.props.errors}
        />
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  errors: state.errors
})

const mapDispatchToProps = (dispatch) => {
    return {
        clearErrors: () => dispatch(clearErrors()),
        changeProfile: (name, middlename, surname, bio, interests, history) => dispatch(changeProfile(name, middlename, surname, bio, interests, history))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CreateProfileForm))
