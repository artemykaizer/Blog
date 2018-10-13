import React, { Component } from 'react'
import { connect } from 'react-redux'
import { login } from '../actions/authActions'
import { clearErrors } from '../actions/errorsActions'
import { withRouter } from 'react-router'


export class LoginForm extends Component {
  constructor(props) {
      super(props)
      this.state = {
          email: "",
          password: "",
          errors: {}
      }
      this.errorHandler = this.errorHandler.bind(this)
      this.onSubmit = this.onSubmit.bind(this)
  }

  componentDidMount() {
      if(Object.keys(this.props.profile).length > 0) {
        this.props.history.push('/posts/all')
      }
  }

  componentWillReceiveProps(nextprops) {
    if(Object.keys(nextprops.errors).length > 0) {
        this.setState({errors: nextprops.errors})
    }
    if(Object.keys(nextprops.profile).length > 0) {
        this.props.history.push('/posts/all')
    }
  }

  componentWillUnmount() {
    this.props.clearErrors()
  }


  errorHandler(err) {
      return <div className="alert alert-danger">{err}</div>
  }

  onSubmit(e) {
    e.preventDefault()
    this.props.login(this.state.email, this.state.password)
  }

  render() {
    const email = this.state.errors.email
    const password = this.state.errors.password
    return (
      <div className="container">
      <h1>Login</h1>
        <form onSubmit={this.onSubmit}>
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
        login: (email, password) => dispatch(login(email, password)),
        clearErrors: () => dispatch(clearErrors())
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LoginForm))
