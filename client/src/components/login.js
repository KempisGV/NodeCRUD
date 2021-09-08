import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loginUser } from '../actions/authActions';

// This will require to npm install axios
import axios from 'axios';
import '../styles.css';

class Login extends Component {
  // This is the constructor that stores the data.
  constructor(props) {
    super(props);

    this.onChangeMail = this.onChangeMail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      mail: '',
      password: '',
    };
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push('/dashboard'); // push user to dashboard when they login
    }
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors,
      });
    }
  }

  // These methods will update the state properties.
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
    const loginuser = {
      mail: this.state.mail,
      password: this.state.password,
    };

    //this.props.loginUser(loginuser); // since we handle the redirect within our component, we don't need to pass in this.props.history as a parameter

    axios
      .post('http://localhost:4000/api/users/login', loginuser)
      .then(res => console.log(res.data));

    // We will empty the state after posting the data to the database
    this.setState({
      mail: '',
      password: '',
    });
  }

  // This following section will display the form that takes the input from the user.
  render() {
    return (
      <div className='RegisterForm'>
        <h3 style={{ textAlign: 'center' }}>Log In</h3>
        <form onSubmit={this.onSubmit}>
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
            <input type='submit' value='Log In' className='btn btn-primary' />
          </div>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};
const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
});
export default connect(mapStateToProps, { loginUser })(Login);
