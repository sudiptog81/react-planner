import React from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { Link, Redirect } from "react-router-dom";
import moment from "moment";
import ReactGA from "react-ga";
import { deleteProject } from "./../../store/actions/projectActions";
const ProjectDetails = props => {
  const { project, auth } = props;
  if (!auth.uid) return <Redirect to="/signin" />;
  if (project) {
    const deletePost = () => {
      const docId = props.match.params.id;
      props.deleteProject(docId);
      return <Redirect to="/" />;
    };
    const editPost = () => {
      if (auth.uid === project.authorId) {
        return (
          <div className="" style={{ marginTop: "1rem" }}>
            <Link
              to={`/edit/${props.match.params.id}`}
              className="btn waves-effect waves-light btn-floating blue darken-1"
            >
              <i
                className="fas fa-pencil-alt fa-xs"
                style={{ fontSize: "1rem" }}
              />{" "}
            </Link>
            <button
              className="btn waves-effect waves-light btn-floating red darken-1"
              style={{ marginLeft: "1rem" }}
              onClick={() => {
                deletePost();
              }}
            >
              <i className="fas fa-trash fa-xs" style={{ fontSize: "1rem" }} />
            </button>
          </div>
        );
      } else {
        console.log(auth.id, project.authorId);
        return null;
      }
    };
    ReactGA.pageview(`/project/${props.match.params.id}`);
    return (
      <div className="container section project-details">
        <div className="card z-depth-0">
          <div className="card-content">
            <span className="card-title">{project.title}</span>
            <p style={{ textAlign: "justify", whiteSpace: "pre-wrap" }}>
              {project.content}
            </p>
            {editPost()}
          </div>
          <div className="card-action grey-text lighten-4">
            <div>
              Posted by {project.authorFirstName} {project.authorLastName}
            </div>
            <div>{moment(project.timestamp.toDate()).calendar()}</div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="container section center">
        <div className="preloader-wrapper small active">
          <div className="spinner-layer spinner-blue">
            <div className="circle-clipper left">
              <div className="circle" />
            </div>
            <div className="gap-patch">
              <div className="circle" />
            </div>
            <div className="circle-clipper right">
              <div className="circle" />
            </div>
          </div>

          <div className="spinner-layer spinner-red">
            <div className="circle-clipper left">
              <div className="circle" />
            </div>
            <div className="gap-patch">
              <div className="circle" />
            </div>
            <div className="circle-clipper right">
              <div className="circle" />
            </div>
          </div>

          <div className="spinner-layer spinner-yellow">
            <div className="circle-clipper left">
              <div className="circle" />
            </div>
            <div className="gap-patch">
              <div className="circle" />
            </div>
            <div className="circle-clipper right">
              <div className="circle" />
            </div>
          </div>

          <div className="spinner-layer spinner-green">
            <div className="circle-clipper left">
              <div className="circle" />
            </div>
            <div className="gap-patch">
              <div className="circle" />
            </div>
            <div className="circle-clipper right">
              <div className="circle" />
            </div>
          </div>
        </div>
      </div>
    );
  }
};

const mapStateToProps = (state, ownProps) => {
  const id = ownProps.match.params.id;
  const projects = state.firestore.data.projects;
  const project = projects ? projects[id] : null;
  return { project, auth: state.firebase.auth };
};

const mapDispatchToProps = dispatch => {
  return {
    deleteProject: docId => {
      dispatch(deleteProject(docId));
    }
  };
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  firestoreConnect([
    {
      collection: "projects"
    }
  ])
)(ProjectDetails);
