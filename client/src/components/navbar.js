// We import bootstrap to make our application look better.
import 'bootstrap/dist/css/bootstrap.css';
import React, { Component } from 'react';
// We import NavLink to utilize the react router.
import { NavLink } from 'react-router-dom';
import { logoutUser } from '../actions/authActions';
import { connect } from 'react-redux';

// Here, we display our Navbar
class Navbar extends Component {
  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };
  render() {
    return (
      <div>
        <nav className='navbar navbar-expand-lg navbar-dark bg-dark'>
          <NavLink className='navbar-brand' to='/'>
            MongoDB
          </NavLink>
          <button
            className='navbar-toggler'
            type='button'
            data-toggle='collapse'
            data-target='#navbarSupportedContent'
            aria-controls='navbarSupportedContent'
            aria-expanded='false'
            aria-label='Toggle navigation'
          >
            <span className='navbar-toggler-icon'></span>
          </button>

          <div className='collapse navbar-collapse' id='navbarSupportedContent'>
            <ul className='navbar-nav ml-auto'>
              <li className='nav-item'>
                <NavLink className='nav-link' to='/create'>
                  Create Record
                </NavLink>
              </li>
              <li className='nav-item'>
                <button
                  style={{
                    width: '150px',
                    borderRadius: '3px',
                    letterSpacing: '1.5px',
                    marginTop: '1rem',
                    color: 'white',
                  }}
                  onClick={this.onLogoutClick}
                  className='btn btn-large waves-effect waves-light hoverable blue accent-3'
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  auth: state.auth,
});
export default connect(mapStateToProps, { logoutUser })(Navbar);
