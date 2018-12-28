import React, { Component } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { Link, Redirect } from "react-router-dom";
import moment from "moment";
import ReactGA from "react-ga";
import { deleteProject } from "./../../store/actions/projectActions";
class ProjectDetails extends Component {
  state = {};
  componentDidMount() {
    ReactGA.pageview(`/view/${this.props.match.params.id}`);
  }
  render(props) {
    const { project, auth } = this.props;
    if (!auth.uid) return <Redirect to="/signin" />;
    if (project) {
      const deletePost = () => {
        const docId = this.props.match.params.id;
        props.deleteProject(docId);
        return <Redirect to="/dashboard" />;
      };
      const editPost = () => {
        if (auth.uid === project.authorId) {
          return (
            <div
              className=""
              style={{ marginTop: "1rem", position: "relative" }}
            >
              <Link
                to={`/edit/${this.props.match.params.id}`}
                className="btn waves-effect waves-light btn-floating blue darken-1 left-align"
                style={{
                  position: "relative",
                  left: "0",
                  margin: "auto 0"
                }}
              >
                <i
                  className="fas fa-pencil-alt fa-xs"
                  style={{ fontSize: "1rem" }}
                />{" "}
              </Link>
              <span
                className="red-text text-darken-1"
                style={{
                  margin: "auto 0",
                  marginRight: "1rem",
                  position: "absolute",
                  right: "2.3em",
                  top: ".75rem"
                }}
              >
                DANGER
              </span>
              <button
                className="btn waves-effect waves-light btn-floating red darken-1"
                style={{
                  margin: "auto 0",
                  marginLeft: "1rem",
                  position: "absolute",
                  right: "0",
                  top: ".07rem"
                }}
                onClick={() => {
                  deletePost();
                }}
              >
                <i
                  className="fas fa-trash fa-xs"
                  style={{ fontSize: "1rem" }}
                />
              </button>
            </div>
          );
        } else {
          return null;
        }
      };
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
  }
}

// const ProjectDetails = props => {
//   const { project, auth } = props;
//   if (!auth.uid) return <Redirect to="/signin" />;
//   if (project) {
//     const deletePost = () => {
//       const docId = props.match.params.id;
//       props.deleteProject(docId);
//       return <Redirect to="/dashboard" />;
//     };
//     const editPost = () => {
//       if (auth.uid === project.authorId) {
//         return (
//           <div className="" style={{ marginTop: "1rem", position: "relative" }}>
//             <Link
//               to={`/edit/${props.match.params.id}`}
//               className="btn waves-effect waves-light btn-floating blue darken-1 left-align"
//               style={{
//                 position: "relative",
//                 left: "0",
//                 margin: "auto 0"
//               }}
//             >
//               <i
//                 className="fas fa-pencil-alt fa-xs"
//                 style={{ fontSize: "1rem" }}
//               />{" "}
//             </Link>
//             <span
//               className="red-text text-darken-1"
//               style={{
//                 margin: "auto 0",
//                 marginRight: "1rem",
//                 position: "absolute",
//                 right: "2.3em",
//                 top: ".75rem"
//               }}
//             >
//               DANGER
//             </span>
//             <button
//               className="btn waves-effect waves-light btn-floating red darken-1"
//               style={{
//                 margin: "auto 0",
//                 marginLeft: "1rem",
//                 position: "absolute",
//                 right: "0",
//                 top: ".07rem"
//               }}
//               onClick={() => {
//                 deletePost();
//               }}
//             >
//               <i className="fas fa-trash fa-xs" style={{ fontSize: "1rem" }} />
//             </button>
//           </div>
//         );
//       } else {
//         console.log(auth.uid, project.authorId);
//         return null;
//       }
//     };
//     ReactGA.pageview(`/project/${props.match.params.id}`);
//     return (
//       <div className="container section project-details">
//         <div className="card z-depth-0">
//           <div className="card-content">
//             <span className="card-title">{project.title}</span>
//             <p style={{ textAlign: "justify", whiteSpace: "pre-wrap" }}>
//               {project.content}
//             </p>
//             {editPost()}
//           </div>
//           <div className="card-action grey-text lighten-4">
//             <div>
//               Posted by {project.authorFirstName} {project.authorLastName}
//             </div>
//             <div>{moment(project.timestamp.toDate()).calendar()}</div>
//           </div>
//         </div>
//       </div>
//     );
//   } else {
//     return (
//       <div className="container section center">
//         <div className="preloader-wrapper small active">
//           <div className="spinner-layer spinner-blue">
//             <div className="circle-clipper left">
//               <div className="circle" />
//             </div>
//             <div className="gap-patch">
//               <div className="circle" />
//             </div>
//             <div className="circle-clipper right">
//               <div className="circle" />
//             </div>
//           </div>

//           <div className="spinner-layer spinner-red">
//             <div className="circle-clipper left">
//               <div className="circle" />
//             </div>
//             <div className="gap-patch">
//               <div className="circle" />
//             </div>
//             <div className="circle-clipper right">
//               <div className="circle" />
//             </div>
//           </div>

//           <div className="spinner-layer spinner-yellow">
//             <div className="circle-clipper left">
//               <div className="circle" />
//             </div>
//             <div className="gap-patch">
//               <div className="circle" />
//             </div>
//             <div className="circle-clipper right">
//               <div className="circle" />
//             </div>
//           </div>

//           <div className="spinner-layer spinner-green">
//             <div className="circle-clipper left">
//               <div className="circle" />
//             </div>
//             <div className="gap-patch">
//               <div className="circle" />
//             </div>
//             <div className="circle-clipper right">
//               <div className="circle" />
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }
// };

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
