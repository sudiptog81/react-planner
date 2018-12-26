import React, { Component } from "react";
import { connect } from "react-redux";
import signIn from "../../store/actions/authActions";
import { forgotPassword } from "../../store/actions/authActions";
import { Link, Redirect } from "react-router-dom";
import ReactGA from "react-ga";
import M from "materialize-css";

class SignIn extends Component {
  state = {
    email: "",
    password: ""
  };
  handleForgotPassword = () => {
    if (
      document.getElementById("email") &&
      document.getElementById("email").value &&
      document.getElementById("email").value.length > 0
    ) {
      const user = document.getElementById("email").value;
      this.props.forgotPassword(user);
      M.toast({ html: "Password Reset email sent" });
    } else {
      M.toast({ html: "Enter an email address" });
    }
  };
  handleSubmit = e => {
    e.preventDefault();
    this.props.signIn(this.state);
  };
  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  render() {
    ReactGA.pageview("/signin");
    const { authError, auth } = this.props;
    if (auth.uid) return <Redirect to="/" />;
    return (
      <div className="container section">
        <form onSubmit={this.handleSubmit} className="white">
          <h5 className="grey-text text-darken-3">Sign In</h5>
          <div className="input-field">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
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
              autoComplete="current-password"
              className="validate"
              onChange={this.handleChange}
            />
            <span>
              <Link
                to="/"
                className="grey-text text-darken-3"
                onClick={this.handleForgotPassword}
              >
                Forgot Password?
              </Link>
            </span>
          </div>
          <div className="input-field valign-wrapper">
            <button className="btn grey darken-3 waves-effect waves-light">
              Login
            </button>
            <Link
              to="/signup"
              className="grey-text text-darken-3"
              style={{ marginLeft: "1rem", marginTop: "1px" }}
            >
              Not Registered?
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
    authError: state.auth.authError,
    auth: state.firebase.auth
  };
};

const mapDispatchToProps = dispatch => {
  return {
    signIn: credentials => dispatch(signIn(credentials)),
    forgotPassword: user => dispatch(forgotPassword(user))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignIn);
