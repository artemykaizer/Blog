import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import PostForm from './PostForm'
import { createPost } from '../actions/postActions'
import { clearErrors } from '../actions/errorsActions'

export class CreatePost extends Component {
  constructor(props) {
      super(props)
      this.onSubmit = this.onSubmit.bind(this)
  }

  onSubmit(header, text) {
    this.props.createPost(header, text, this.props.history)
  }

  componentWillUnmount() {
    this.props.clearErrors()
  }

  render() {
    return (
      <div>
        <PostForm
          onSubmit={(header, text) => this.onSubmit(header, text)}
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
        createPost: (header, text, history) => dispatch(createPost(header, text, history)),
        clearErrors: () => dispatch(clearErrors())
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CreatePost))
