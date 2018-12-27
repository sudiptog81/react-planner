import React from "react";
import { NavLink } from "react-router-dom";

const SignedOutLinks = () => {
  return (
    <React.Fragment>
      <ul className="right hide-on-large-only">
        <li>
          <NavLink
            to="/help"
            className="right hide-on-large-only btn btn-floating btn-small white grey-text text-darken-3"
            style={{ margin: "auto 0", marginTop: ".8rem" }}
          >
            <i className="fas fa-question grey-text text-darken-3" />
          </NavLink>
        </li>
      </ul>
      <ul className="right hide-on-med-and-down">
        <li>
          <NavLink
            to="/signin"
            className="btn btn-floating white grey-text text-darken-3"
          >
            <i
              className="fas fa-user grey-text text-darken-3"
              style={{ fontSize: "1.5rem" }}
            />
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/help"
            className="btn btn-floating white grey-text text-darken-3"
          >
            <i className="fas fa-question grey-text text-darken-3" />
          </NavLink>
        </li>
      </ul>
      <ul className="left hide-on-large-only">
        <li>
          <NavLink
            to="/signin"
            className="left hide-on-large-only btn btn-floating btn-small white grey-text text-darken-3"
            style={{ margin: "auto 0", marginTop: ".8rem" }}
          >
            <i
              className="fas fa-user grey-text text-darken-3"
              style={{ fontSize: "1.25rem" }}
            />
          </NavLink>
        </li>
      </ul>
    </React.Fragment>
  );
};

export default SignedOutLinks;
