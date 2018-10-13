import React, { Component } from 'react'

export class PostForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      text: "",
      header: ""
    }
    this.onSubmit = this.onSubmit.bind(this)
  }

  componentDidMount() {
    if(this.props.defaultHeader) {
      this.setState({
        text: this.props.defaultText,
        header: this.props.defaultHeader
      })
    }
  }
  
  onSubmit(e) {
    e.preventDefault()
    this.props.onSubmit(this.state.header, this.state.text)
  }

  render() {
    return (
      <div>
        <form onSubmit={(e) => this.onSubmit(e)}>
          <div class="container">
            {this.props.defaultHeader ?
              <h1>Edit post</h1>
              :
              <h1>New post</h1>
            }
            {this.props.errors.header ? <div className="alert alert-danger">{this.props.errors.header}</div> : null}
            <label for="title">Title</label>
            <input
              className="form-control message-form"
              onChange={(e) => this.setState({header: e.currentTarget.value})}
              defaultValue={this.props.defaultHeader ? this.props.defaultHeader : null }
              id="title"
            />
            {this.props.errors.text ? <div className="alert alert-danger">{this.props.errors.text}</div> : null}
            <label for="message">Message</label>
            <textarea
              className="form-control "
              onChange={(e) => this.setState({text: e.currentTarget.value})}
              defaultValue={this.props.defaultText ? this.props.defaultText : null }
              id="message"
              multiline
              rowsMax="10"
            />
            <button className="submit_btn btn btn-primary" type='submit'>Submit</button>
            </div>
        </form>
      </div>
    )
  }
}


export default PostForm
