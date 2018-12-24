import React from "react";
import { NavLink } from "react-router-dom";

const SignedOutLinks = () => {
  return (
    <React.Fragment>
      <ul className="left hide-on-large-only">
        <li>
          <NavLink
            to="/create"
            className="left hide-on-large-only btn btn-floating btn-small white grey-text text-darken-3"
            style={{ margin: "auto 0", marginTop: ".8rem" }}
          >
            <i className="fas fa-plus grey-text text-darken-3" />
          </NavLink>
        </li>
      </ul>
      <ul className="right hide-on-med-and-down">
        <li>
          <NavLink
            to="/create"
            className="btn btn-floating white grey-text text-darken-3"
          >
            <i className="fas fa-plus grey-text text-darken-3" />
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/signin"
            className="btn btn-floating white grey-text text-darken-3"
          >
            <i className="fas fa-sign-in-alt grey-text text-darken-3" />
          </NavLink>
        </li>
      </ul>
      <ul className="right hide-on-large-only">
        <li>
          <NavLink
            to="/signin"
            className="right hide-on-large-only btn btn-floating btn-small white grey-text text-darken-3"
            style={{ margin: "auto 0", marginTop: ".8rem" }}
          >
            <i className="fas fa-sign-in-alt grey-text text-darken-3" />
          </NavLink>
        </li>
      </ul>
    </React.Fragment>
  );
};

export default SignedOutLinks;
