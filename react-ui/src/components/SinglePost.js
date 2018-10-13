import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getSinglePost, clearPost, addComment } from '../actions/postActions'
import { clearErrors } from '../actions/errorsActions'
import Post from './Post'
import SingleComment from './SingleComment'
import Loader from './Loader'

export class SinglePost extends Component {
  constructor(props) {
      super(props)
      this.state = {
        text: ""
      }
      this.onCommentSubmit = this.onCommentSubmit.bind(this)
  }

  onCommentSubmit(e) {
    e.preventDefault()
    this.props.addComment(this.state.text, this.props.match.params.id)
    this.setState({text: ""})
  }

  componentWillUnmount() {
      this.props.clearPost()
      this.props.clearErrors()
  }

  componentDidMount() {
    this.props.getSinglePost(this.props.match.params.id)
  }


  render() {
    if(this.props.errors.message) {
        setTimeout(() => this.props.clearErrors(), 3000)
    }
    const post = this.props.post
    if(post.isFetching) {
        return <Loader/>
    }

    return (
        <div className="container">
        <div className="post post-single">
        <Post
            id={post.currentPost._id}
            header={post.currentPost.header}
            text={post.currentPost.text}
            authorId={post.currentPost.authorId}
            authorName={post.currentPost.authorName}
            date={post.currentPost.date}
        />
        </div>
        <label for="text">Add a comment</label>
        <form onSubmit={this.onCommentSubmit}>
            <textarea
                id="text"
                className="form-control"
                onChange={(e) => this.setState({text: e.currentTarget.value})}
            />
            <button type='submit' className="submit_btn btn btn-primary">Submit</button>
        </form>
        {this.props.errors.message ? 
            <div className="alert alert-danger">{this.props.errors.message}</div>
            :
            null
        }
        {post.currentPost.comments ? 
         post.currentPost.comments.map(comment => {
            return (
                <SingleComment
                  comment={comment}
                  postId={this.props.match.params.id}
                />
            )
         })
        :
        <p>There is no comments yet. </p>
        }
        </div>
    )
  }
}

const mapStateToProps = (state) => ({
  post: state.posts,
  errors: state.errors
})

const mapDispatchToProps = (dispatch) => {
    return {
        getSinglePost: (id) => dispatch(getSinglePost(id)),
        clearPost: () => dispatch(clearPost()),
        addComment: (text, id) => dispatch(addComment(text, id)),
        clearErrors: () => dispatch(clearErrors())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SinglePost)
