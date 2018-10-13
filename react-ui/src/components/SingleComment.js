import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { deleteComment } from '../actions/postActions'
import dateFormating from '../helpers/dateFormating'

export class SingleComment extends Component {
  constructor(props) {
      super(props)
    this.ownerBar = this.ownerBar.bind(this)
  }

  ownerBar() {
    if(this.props.profileId === this.props.comment.authorId) {
        return (
            <div>
                <i className="material-icons comment_delete" onClick={() => this.props.deleteComment(this.props.postId, this.props.comment._id)}>delete</i>
            </div>
        )
    }
  }

  render() {
    const comment = this.props.comment
    return (
        <div className="comment">
            <div key={comment._id}>
                <Link className="post_author comment_author" to={`/profiles/${comment.authorId}`}>{comment.authorName}</Link>
                {this.ownerBar()}
                <p>{dateFormating(comment.date)}</p>
                <div>{comment.text}</div>
            </div>
        </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
    return {
        deleteComment: (postId, id) => dispatch(deleteComment(postId, id))
    }
}

const mapStateToProps = (state) => ({
    profileId: state.profile.id 
})

export default connect(mapStateToProps, mapDispatchToProps)(SingleComment)
