import React from "react";
import { Link } from "react-router-dom";
import SignedInLinks from "./SignedInLinks";
import SignedOutLinks from "./SignedOutLinks";
import { connect } from "react-redux";

const NavBar = props => {
  const { auth, profile } = props;
  const links = auth.uid ? (
    <SignedInLinks profile={profile} />
  ) : (
    <SignedOutLinks />
  );
  return (
    <nav className="nav-wrapper grey darken-3">
      <div style={{ margin: "0 1rem" }}>
        {auth.uid ? (
          <Link
            to="/dashboard"
            className="brand-logo"
            style={{ fontFamily: "Pacifico, cursive", fontSize: "1.5rem" }}
          >
            {" "}
            React Planner
          </Link>
        ) : (
          <Link
            to="/"
            className="brand-logo"
            style={{ fontFamily: "Pacifico, cursive", fontSize: "1.5rem" }}
          >
            React Planner{" "}
          </Link>
        )}
        {links}
      </div>
    </nav>
  );
};

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile
  };
};

export default connect(mapStateToProps)(NavBar);
