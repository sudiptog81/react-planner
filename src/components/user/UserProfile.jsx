import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { forgotPassword, deleteAccount } from "../../store/actions/authActions";
import M from "materialize-css";

class UserProfile extends Component {
  state = {};
  componentDidMount() {
    var elems = document.querySelectorAll(".modal");
    // eslint-disable-next-line no-unused-vars
    var instances = M.Modal.init(elems, null);
  }
  handleResetPassword = () => {
    const user = this.props.auth.email;
    this.props.forgotPassword(user);
    M.toast({ html: "Password Reset email sent" });
  };
  handleDeleteAccount = () => {
    const user = this.props.auth;
    const validationText = document.getElementById("validation").value;
    if (validationText) {
      const creds = {
        email: user.email,
        password: validationText
      };
      this.props.deleteAccount(user, creds);
    } else {
      M.toast({ html: "Please follow the instructions" });
    }
  };
  render() {
    const { auth, profile, authError } = this.props;
    if (!auth.uid) return <Redirect to="/signin" />;
    return (
      <div className="container center section">
        <div className="row">
          <div className="col s12">
            <button
              className="btn btn-large btn-floating grey white-text darken-3"
              style={{
                width: "150px",
                height: "150px",
                margin: "auto",
                marginTop: "3em",
                position: "relative"
              }}
            >
              <span
                className="user-circle"
                style={{
                  fontFamily: "cursive",
                  fontSize: "5rem",
                  position: "absolute"
                }}
              >
                {profile.initials}
              </span>
            </button>
          </div>
        </div>
        <div className="row">
          <div className="col s12">
            <h3
              className="grey-text text-darken-3"
              style={{ margin: "1rem 0" }}
            >
              {profile.firstName} {profile.lastName}
            </h3>
            <h5 className="grey-text" style={{ wordWrap: "break-word" }}>
              {auth.email}
            </h5>
          </div>
        </div>
        <div className="row" style={{ marginTop: "3rem" }}>
          <div className="col s12 m6 center" style={{ marginTop: "1rem" }}>
            <button
              className="btn btn-large waves-effect waves-light indigo darken-2 "
              onClick={this.handleResetPassword}
            >
              Reset Password
            </button>
          </div>
          <div className="col s12 m6 center" style={{ marginTop: "1rem" }}>
            <button
              data-target="modal"
              className="btn btn-large waves-effect waves-light red darken-1 modal-trigger"
            >
              Delete Account
            </button>
            {authError ? (
              <p className="center red-text text-darken-1">{authError}</p>
            ) : null}
            <div id="modal" className="modal" style={{ marginTop: "5em" }}>
              <div className="modal-content">
                <h4>ARE YOU SURE?</h4>
                <p>
                  You will not be able to revert this action. All the data will
                  be lost. Your posts will remain on this platform regardless of
                  your account deletion. Please type your current password in
                  the space below and click on Delete to delete your account.
                  Click Go Back to cancel account deletion.
                </p>
                <form>
                  <div className="input-field">
                    <input
                      type="text"
                      id="email"
                      hidden
                      autoComplete="username"
                    />
                    <input
                      type="password"
                      id="validation"
                      className="center"
                      autoComplete="current-password"
                    />
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button
                  className="modal-close waves-effect waves-light btn grey darken-3 left"
                  style={{ marginLeft: "1rem", marginBottom: "1rem" }}
                >
                  Go Back
                </button>
                <button
                  className="modal-close waves-effect waves-light btn red darken-1 right"
                  style={{ marginRight: "1rem", marginBottom: "1rem" }}
                  onClick={this.handleDeleteAccount}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth,
    authError: state.auth.authError,
    profile: state.firebase.profile
  };
};
const mapDispatchToProps = dispatch => {
  return {
    forgotPassword: user => dispatch(forgotPassword(user)),
    deleteAccount: (user, creds) => dispatch(deleteAccount(user, creds))
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserProfile);
