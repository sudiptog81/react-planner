import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { signUp } from "../../store/actions/authActions";
import ReactGA from "react-ga";
// import M from "materialize-css";

class SignUp extends Component {
  state = {
    email: "",
    password: "",
    firstName: "",
    lastName: ""
  };
  handleSubmit = e => {
    e.preventDefault();
    this.props.signUp(this.state);
  };
  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  render() {
    ReactGA.pageview("/signup");
    const { auth, authError } = this.props;
    if (auth.uid) return <Redirect to="/" />;
    return (
      <div className="container section">
        <form onSubmit={this.handleSubmit} className="white">
          <h5 className="grey-text text-darken-3">Sign Up</h5>
          <div className="input-field">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              required
              autoComplete="username"
              className="validate"
              onChange={this.handleChange}
            />
          </div>
          <div className="input-field">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              required
              autoComplete="new-password"
              className="validate"
              onChange={this.handleChange}
            />
          </div>
          <div className="input-field">
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              name="firstName"
              id="firstName"
              required
              onChange={this.handleChange}
            />
          </div>
          <div className="input-field">
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              name="lastName"
              id="lastName"
              required
              onChange={this.handleChange}
            />
          </div>
          <div className="input-field valign-wrapper">
            <button className="btn grey darken-3 waves-effect waves-light">
              Register
            </button>
            <Link
              to="/signin"
              className="grey-text text-darken-3"
              style={{ marginLeft: "1rem", marginTop: "1px" }}
            >
              Already Registered?
            </Link>
            <div className="red-text center">
              {authError ? <p>&nbsp;&nbsp;{authError}</p> : null}
            </div>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth,
    authError: state.auth.authError
  };
};

const mapDispatchToProps = dispatch => {
  return {
    signUp: newUser => dispatch(signUp(newUser))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignUp);
