import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import PostForm from './PostForm'
import { editPost, getSinglePost } from '../actions/postActions'
import { clearErrors } from '../actions/errorsActions'

export class CreatePost extends Component {
  constructor(props) {
      super(props)
      this.onSubmit = this.onSubmit.bind(this)
  }

  onSubmit(header, text) {
    this.props.editPost(header, text, this.props.post.currentPost._id, this.props.history)
  }

  componentDidMount() {
    this.props.getSinglePost(this.props.match.params.id)
  }

  componentWillUnmount() {
    this.props.clearErrors()
  }

  render() {
    if(this.props.post.isFetching) {
        return <p>Loading</p>
    }

    return (
      <div>
        <PostForm
          onSubmit={(header, text) => this.onSubmit(header, text)}
          errors={this.props.errors}
          defaultHeader={this.props.post.currentPost.header}
          defaultText={this.props.post.currentPost.text}
        />
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  errors: state.errors,
  post: state.posts
})

const mapDispatchToProps = (dispatch) => {
    return {
        editPost: (header, text, id, history) => dispatch(editPost(header, text, id, history)),
        getSinglePost: (id) => dispatch(getSinglePost(id)),
        clearErrors: () => dispatch(clearErrors())
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CreatePost))
