import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
// This will require to npm install axios
//import axios from 'axios';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { registerUser } from '../actions/authActions';
//import classnames from 'classnames';
import '../styles.css';

class Register extends Component {
  // This is the constructor that stores the data.
  constructor(props) {
    super(props);

    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeMail = this.onChangeMail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      name: '',
      mail: '',
      password: '',
    };
  }
  componentDidMount() {
    // If logged in and user navigates to Register page, should redirect them to dashboard
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/dashboard');
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors,
      });
    }
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

    this.props.registerUser(newuser, this.props.history);

    /* axios
      .post('http://localhost:4000/api/users/register', newuser)
      .then(res => console.log(res.data));*/

    // We will empty the state after posting the data to the database
    this.setState({
      name: '',
      mail: '',
      password: '',
    });
  }

  // This following section will display the form that takes the input from the user.
  render() {
    return (
      <div className='RegisterForm'>
        <h3 style={{ textAlign: 'center' }}>Register</h3>
        <form onSubmit={this.onSubmit}>
          <div className='form-group'>
            <label>Name: </label>
            <input
              type='text'
              className='form-control'
              value={this.state.name}
              onChange={this.onChangeName}
            />
          </div>
          <div className='form-group'>
            <label>Mail: </label>
            <input
              type='text'
              className='form-control'
              value={this.state.mail}
              onChange={this.onChangeMail}
            />
          </div>
          <div className='form-group'>
            <label>Password: </label>
            <input
              type='password'
              className='form-control'
              value={this.state.password}
              onChange={this.onChangePassword}
            />
          </div>
          <div
            className='form-group d-flex justify-content-center'
            style={{ marginTop: '10px' }}
          >
            <input type='submit' value='Register' className='btn btn-primary' />
          </div>
        </form>
      </div>
    );
  }
}
Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};
const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
});
export default connect(mapStateToProps, { registerUser })(withRouter(Register));
