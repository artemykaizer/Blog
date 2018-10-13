import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getPosts } from '../actions/postActions'
import Post from './Post'
import { Link } from 'react-router-dom'
import Loader from './Loader'

class PostsList extends Component {
  constructor(props) {
    super(props)
    this.postLink = this.postLink.bind(this)
    this.checkPost = this.checkPost.bind(this)
  }
  componentDidMount() {
    this.props.getPosts()
  }

  postLink() {
    if(this.props.profile) {
      return <Link to='/create' className="create_post">Create post</Link>
    } else {
      return <h4 className="login_alert">You are not logged in.{" "}
              Please,<Link to='/login'> Login</Link> or <Link to='/registration'>Register</Link>
             </h4>
    }
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
      return post
    }
  }

  render() {
    if(this.props.posts.isFetching) {
      return <Loader/>
    }

    if(!this.props.posts.isFetching && !this.props.posts.data) {
      return (
        <div>
          {this.postLink()}
          <p>There is no posts yet.</p>
        </div>
      )
    }
    return (
      <div className="container posts_list">
      {this.postLink()}
        {this.props.posts.data.map(post => {
          return (
            <div className="post">
              <Post
                id={post._id}
                header={post.header.length >= 100 ? 
                  post.header.substring(0, 100)+"..."
                  :
                  post.header
                }
                text={this.checkPost(post.text)}
                authorId={post.authorId}
                authorName={post.authorName}
                date={post.date}
              />
              <Link className="post_comments" to={`post/${post._id}`}>{post.comments.length} comments</Link>
              <Link className="post_view btn" to={`post/${post._id}`}>View more</Link>
            </div>
          )
        })}
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  posts: state.posts,
  profile: state.profile
})

const mapDispatchToProps = (dispatch) => {
  return {
    getPosts: () => dispatch(getPosts())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostsList)
