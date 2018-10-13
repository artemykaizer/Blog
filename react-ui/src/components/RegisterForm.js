import React, { Component } from 'react'
import { connect } from 'react-redux'
import { register } from '../actions/authActions'
import { clearErrors } from '../actions/errorsActions'
import { withRouter } from 'react-router'

class RegisterForm extends Component {
  constructor(props) {
      super(props)
      this.state = {
          name: "",
          email: "",
          password: "",
          errors: {}
      }
      this.onSubmit = this.onSubmit.bind(this)
      this.errorHandler = this.errorHandler.bind(this)
  }

  componentWillReceiveProps(nextprops) {
    if(Object.keys(nextprops.errors).length > 0) {
        this.setState({errors: nextprops.errors})
    }
  }

  componentWillUnmount() {
    this.props.clearErrors()
  }


  componentDidMount() {
    if(Object.keys(this.props.profile).length > 0) {
      this.props.history.push('/posts/all')
    }
  }

  errorHandler(err) {
      return <div className="alert alert-danger">{err}</div>
  }

  onSubmit(e) {
    e.preventDefault()
    this.props.register(this.state.email, this.state.password, this.state.name, this.props.history)
  }

  render() {
    const email = this.state.errors.email
    const password = this.state.errors.password
    const name = this.state.errors.name
    return (
      <div className="container">
      <h1>Registration</h1>
        <form onSubmit={this.onSubmit}>
            {name ? this.errorHandler(name) : null }
            <label for="username">Username</label>
            <input 
                className="form-control message-form"
                value = {this.state.name}
                onChange = {(e) => this.setState({name: e.currentTarget.value})}
                id="username"
            />
            {email ? this.errorHandler(email) : null }
            <label for="email">Email</label>
            <input 
                className="form-control message-form"
                value = {this.state.email}
                onChange = {(e) => this.setState({email: e.currentTarget.value})}
                id="email"
            />
            {password ? this.errorHandler(password) : null }
            <label for="password">Password</label>
            <input 
                className="form-control message-form"
                value = {this.state.password}
                onChange = {(e) => this.setState({password: e.currentTarget.value})}
                id="password"
                type="password"
            />
            <button className="submit_btn btn btn-primary" type="submit">Submit</button>
        </form>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
    return {
        errors: state.errors,
        profile: state.profile
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        register: (email, passwortd, name, history) => dispatch(register(email, passwortd, name, history)),
        clearErrors: () => dispatch(clearErrors())
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(RegisterForm))
