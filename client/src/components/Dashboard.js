import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser, createTask } from '../actions/authActions';
import '../styles.css';
class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);

    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      name: '',
      description: '',
      _userId: '',
    };
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

  onChangeDescription(e) {
    this.setState({
      description: e.target.value,
    });
  }

  // This function will handle the submission.
  onSubmit(e) {
    e.preventDefault();
    const { user } = this.props.auth;
    // When post request is sent to the create url, axios will add a new task(newtask) to the database.
    const newTask = {
      name: this.state.name,
      description: this.state.description,
      _userId: user.id,
    };

    this.props.createTask(newTask, this.props.history);

    /* axios
      .post('http://localhost:4000/api/users/register', newuser)
      .then(res => console.log(res.data));*/

    // We will empty the state after posting the data to the database
    this.setState({
      name: '',
      description: '',
    });
  }

  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };
  render() {
    return (
      <div>
        <div className='RegisterForm'>
          <h3 style={{ textAlign: 'center' }}>Create task</h3>
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
              <label>Description: </label>
              <input
                type='text'
                className='form-control'
                value={this.state.description}
                onChange={this.onChangeDescription}
              />
            </div>

            <div
              className='form-group d-flex justify-content-center'
              style={{ marginTop: '10px' }}
            >
              <input type='submit' value='Create' className='btn btn-primary' />
            </div>
          </form>
        </div>
      </div>
    );
  }
}
Dashboard.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};
const mapStateToProps = state => ({
  auth: state.auth,
});
export default connect(mapStateToProps, { logoutUser, createTask })(Dashboard);
