import React from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { signOut } from "../../store/actions/authActions";

const SignedInLinks = props => {
  return <React.Fragment>
      <ul className="left hide-on-large-only">
        <li>
          <NavLink to="/create"  className="left hide-on-large-only btn btn-floating btn-small white grey-text text-darken-3"
            style={{ margin: "auto 0", marginTop: ".8rem" }}
          >
            <i className="fas fa-plus grey-text text-darken-3" />
          </NavLink>
        </li>
      </ul>
      <ul className="right hide-on-med-and-down">
        <li>
          <NavLink to="/create" className="btn btn-floating white grey-text text-darken-3">
            <i className="fas fa-plus grey-text text-darken-3" />
          </NavLink>
        </li>
        <li>
          <NavLink to="/#" className="btn btn-floating white grey-text text-darken-3">
            <i className="fas fa-sign-out-alt grey-text text-darken-3" onClick={props.signOut} />
          </NavLink>
        </li>
        <li>
          <NavLink to="/" className="btn btn-floating white grey-text text-darken-3 hoverable" style={{ fontWeight: "600", fontSize: "1.3rem", fontFamily: "cursive" }}>
            {props.profile.initials}
          </NavLink>
        </li>
      </ul>
      <ul className="right hide-on-large-only">
        <li>
        <a href="/#" className="right hide-on-large-only btn btn-floating btn-small white grey-text text-darken-3"  style={{ margin: "auto 0", marginTop: ".8rem" }} onClick={props.signOut}>
          <i className="fas fa-sign-out-alt grey-text text-darken-3" />
          </a>
        </li>
      </ul>
    </React.Fragment>;
};

const mapDispatchToProps = dispatch => {
  return {
    signOut: () => dispatch(signOut())
  };
};

export default connect(
  null,
  mapDispatchToProps
)(SignedInLinks);
