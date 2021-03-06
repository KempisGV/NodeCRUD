// We import bootstrap to make our application look better.
import "bootstrap/dist/css/bootstrap.css";
import React from "react";
// We import NavLink to utilize the react router.
import { NavLink } from "react-router-dom";
import { logoutUser } from "../actions/authActions";
import { connect } from "react-redux";

// Here, we display our Navbar
function Navbar(props) {
  const onLogoutClick = (e) => {
    e.preventDefault();
    props.logoutUser();
  };

  // If logged in and user navigates to Login page,
  if (props.auth.isAuthenticated) {
    return(
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <NavLink className="navbar-brand" to="/">
          NODE CRUD
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <NavLink className="nav-link" to="/create">
                Create Task
              </NavLink>
            </li>
            <li className="nav-item">
              <button
                style={{
                  width: "150px",
                  borderRadius: "3px",
                  letterSpacing: "1.5px",
                  marginTop: "1rem",
                  color: "white",
                }}
                onClick={onLogoutClick}
                className="btn btn-large waves-effect waves-light hoverable blue accent-3"
              >            <NavLink to="/logout"></NavLink>

                Logout
              </button>
            </li>
          </ul>
        </div>
      </nav>
    </div>
    )
  } else {
    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <NavLink className="navbar-brand" to="/">
            NODE CRUD
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <NavLink className="nav-link" to="/login">
                  Login
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/register">
                  Register
                </NavLink>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, { logoutUser })(Navbar);
