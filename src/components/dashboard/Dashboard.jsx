import React, { Component } from "react";
import Notifications from "./Notifications";
import ProjectList from "../project/ProjectList";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { Redirect } from "react-router-dom";
// import { Link } from "react-router-dom";

class Dashboard extends Component {
  state = {};
  render() {
    const { projects, auth, notifications } = this.props;
    if (!auth.uid) return <Redirect to="/signin" />;
    return (
      <div className="dashboard section container">
        <div className="row">
          <div className="col s12 m8">
            <ProjectList projects={projects} />
          </div>
          <div className="col s12 m4">
            <Notifications notifications={notifications} />
            {/* <div class="fixed-action-btn">
              <Link to="/create" class="btn-floating btn-large blue darken-3">
                <i class="large material-icons">mode_edit</i>
              </Link>
            </div> */}
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
