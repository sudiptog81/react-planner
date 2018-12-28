import React, { Component } from "react";
import Notifications from "./Notifications";
import ProjectList from "../project/ProjectList";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { Redirect } from "react-router-dom";
import ReactGA from "react-ga";

class Dashboard extends Component {
  state = {};
  componentDidMount() {
    ReactGA.pageview("/dashboard");
  }
  render() {
    const { projects, auth, notifications } = this.props;
    if (!auth.uid) return <Redirect to="/" />;
    return (
      <div className="dashboard section container">
        <div className="row">
          <div className="col s12 m8">
            <ProjectList projects={projects} />
          </div>
          <div className="col s12 m4">
            <Notifications notifications={notifications} />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    projects: state.firestore.ordered.projects,
    auth: state.firebase.auth,
    notifications: state.firestore.ordered.notifications
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect([
    {
      collection: "projects",
      orderBy: ["timestamp", "desc"]
    },
    {
      collection: "notifications",
      limit: 5,
      orderBy: ["time", "desc"]
    }
  ])
)(Dashboard);
