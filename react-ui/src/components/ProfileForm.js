import React, { Component } from 'react'

class ProfileForm extends Component {
  constructor(props) {
      super(props)
      this.state = {
          name: "",
          middlename: "",
          surname: "",
          bio: "",
          interests: ""
      }
      this.onSubmit = this.onSubmit.bind(this)
  }

  onSubmit(e) {
    e.preventDefault()
    this.props.onSubmit(this.state.name, 
                        this.state.middlename, 
                        this.state.surname, 
                        this.state.bio, 
                        this.state.interests)
  }

  componentDidMount() {
    if(this.props.defaultName) {
      this.setState({
          name: this.props.defaultName || "",
          middlename: this.props.defaultMiddlename || "",
          surname: this.props.defaultSurname || "",
          bio: this.props.defaultBio || "",
          interests: this.props.defaultInterests || ""
      })
    }
  }

  render() {
    return (
        <div>
          {this.props.errors.profile ? 
            <p className="alert alert-danger">{this.props.errors.profile}</p>
            :
            null
          }
          <form onSubmit={this.onSubmit}>
              <label for="name">Name</label>
              <input
                className="form-control message-form"
                onChange={(e) => this.setState({name: e.currentTarget.value})}
                defaultValue={this.props.defaultName ? this.props.defaultName : null }
                id="name"
              />
              <label for="middlename">Middlename</label>
              <input
                className="form-control message-form"
                onChange={(e) => this.setState({middlename: e.currentTarget.value})}
                defaultValue={this.props.defaultMiddlename ? this.props.defaultMiddlename : null }
                id="middlename"
                />
              <label for="surname">Surname</label>
              <input
                className="form-control message-form"
                onChange={(e) => this.setState({surname: e.currentTarget.value})}
                defaultValue={this.props.defaultSurname ? this.props.defaultSurname : null }
                id="surname"
                />
              <label for="bio">Bio</label>
              <textarea
                className="form-control message-form"
                onChange={(e) => this.setState({bio: e.currentTarget.value})}
                defaultValue={this.props.defaultBio ? this.props.defaultBio : null }
                id="bio"
              />
              <label for="interests">Interests</label>
              <textarea
                className="form-control message-form"
                onChange={(e) => this.setState({interests: e.currentTarget.value})}
                defaultValue={this.props.defaultInterests ? this.props.defaultInterests : null }
                id="interests"
                />
              <button className="submit_btn btn btn-primary" type="submit">Submit</button>
          </form>
        </div>
    )
  }
}

export default ProfileForm