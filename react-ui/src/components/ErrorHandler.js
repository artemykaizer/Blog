import React, { Component } from 'react'

export default class ErrorHandler extends Component {
  constructor() {
      super()
      this.state = {
          error: false
      }
  }

  componentDidCatch() {
      this.setState({error: true})
  }

  render() {
    if(this.state.error) {
        return (
            <div className="container">
              <h1>X_X</h1>
              <h2>An error has occured.</h2>
            </div>
          )
    } else {
        return this.props.children
    }
  }
}
