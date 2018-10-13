import React from 'react'
import { Link } from 'react-router-dom'

export default () => {
  return (
    <div className="container">
      <h1>Welcome to the blog.</h1>
      <p>Do you want to see <Link to="/posts/all">all posts</Link>?</p>
      <p>Or <Link to="/login">login</Link>/<Link to="/registration">register?</Link></p>
    </div>
  )
}
