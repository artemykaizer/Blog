import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { deletePost } from '../actions/postActions'
import dateFormating from '../helpers/dateFormating'
import { withRouter } from 'react-router'

class Post extends Component {
  constructor(props) {
      super(props)
      this.ownerBar = this.ownerBar.bind(this)
      this.checkPost = this.checkPost.bind(this)
  }

  checkPost(post) {
    if(post.length >= 500) {
      return (
        <div>
        <p>{post.substring(0, 500)}</p>
        <p>Text is too long. Click view more to see all post.</p>
        </div>
      )
    } else {
      return <p>{post}</p>
    }
  }

  ownerBar() {
    if(this.props.authorId == this.props.profile.id ) {
        return (
            <div className="icons-bar">
                <Link className="material-icons edit_icon" to={`/posts/edit/${this.props.id}`}>edit</Link>
                <i className="material-icons delete_icon"  onClick={() => this.props.deletePost(this.props.id, this.props.history)}>delete</i>
            </div>
        )
    }
  }

  render() {
    return (
      <div >
        {this.ownerBar()}
        <h3 className="post_header">{this.props.header}</h3>
        <span className="post_date">{dateFormating(this.props.date)}</span>
        <Link to={`/profiles/${this.props.authorId}`} className="post_author">{this.props.authorName}</Link>
        <div className="post_text">{this.props.text}</div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  profile: state.profile
})

const mapDispatchToProps = (dispatch) => {
    return {
      deletePost: (id, history) => dispatch(deletePost(id, history))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Post))
