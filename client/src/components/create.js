import React, { Component } from "react";
// This will require to npm install axios
import axios from 'axios';

export default class Create extends Component {
  // This is the constructor that stores the data.
  constructor(props) {
    super(props);

    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeMail = this.onChangeMail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      name: "",
      mail: "",
      password: "",
    };
  }

  // These methods will update the state properties.
  onChangeName(e) {
    this.setState({
      name: e.target.value,
    });
  }

  onChangeMail(e) {
    this.setState({
      mail: e.target.value,
    });
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value,
    });
  }

// This function will handle the submission.
  onSubmit(e) {
    e.preventDefault();

    // When post request is sent to the create url, axios will add a new record(newperson) to the database.
    const newuser = {
      name: this.state.name,
      mail: this.state.mail,
      password: this.state.password,
    };

    axios
      .post("http://localhost:4000/api/users/register", newuser)
      .then((res) => console.log(res.data));

    // We will empty the state after posting the data to the database
    this.setState({
      name: "",
      mail: "",
      password: "",
    });
  }

  // This following section will display the form that takes the input from the user.
  render() {
    return (
      <div style={{ marginTop: 20 }}>
        <h3>Create New Record</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Name of the user: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.name}
              onChange={this.onChangeName}
            />
          </div>
          <div className="form-group">
            <label>User's mail: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.mail}
              onChange={this.onChangeMail}
            />
          </div>
          <div className="form-group">
            <label>User's password: </label>
            <input
              type="password"
              className="form-control"
              value={this.state.password}
              onChange={this.onChangePassword}
            />
          </div>
          <div className="form-group">
            <input
              type="submit"
              value="Create person"
              className="btn btn-primary"
            />
          </div>
        </form>
      </div>
    );
  }
}