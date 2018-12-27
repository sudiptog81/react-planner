import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import ReactGA from "react-ga";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
import { editProject } from "../../store/actions/projectActions";
import M from "materialize-css";

class EditProject extends Component {
  state = {};
  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  handleSubmit = e => {
    e.preventDefault();
    this.props.editProject(this.props.docId, this.state);
    ReactGA.event({
      category: "User",
      action: "Edited Project"
    });
    this.props.history.push("/dashboard");
    M.toast({ html: "Post edited" });
  };
  componentDidMount() {
    M.updateTextFields();
  }
  render(props) {
    const { project, auth } = this.props;
    ReactGA.pageview(`/edit/${this.props.match.params.id}`);
    if (!auth.uid) return <Redirect to="/signin" />;
    if (project) {
      if (!(auth.uid === project.authorId)) return <Redirect to="/dashboard" />;
      return (
        <div className="container section">
          <form onSubmit={this.handleSubmit} className="white">
            <h5 className="grey-text text-darken-3">Edit Post</h5>
            <div className="input-field">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                name="title"
                id="title"
                defaultValue={project.title}
                className="validate"
                onClick={this.handleChange}
                onChange={this.handleChange}
              />
            </div>
            <div className="input-field">
              <label htmlFor="content">Content</label>
              <textarea
                name="content"
                id="content"
                cols="30"
                rows="10"
                className="materialize-textarea validate"
                style={{ height: "15rem", overflowY: "scroll" }}
                defaultValue={project.content}
                onClick={this.handleChange}
                onChange={this.handleChange}
              />
            </div>
            <div className="input-field">
              <button className="btn grey darken-3 waves-effect waves-light">
                Submit
              </button>
            </div>
          </form>
        </div>
      );
    } else
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
const mapStateToProps = (state, ownProps) => {
  const docId = ownProps.match.params.id;
  const projects = state.firestore.data.projects;
  const project = projects ? projects[docId] : null;
  //   const title = project ? project.title : null;
  //   const content = project ? project.content : null;
  return { project, docId, auth: state.firebase.auth };
};

const mapDispatchToProps = dispatch => {
  return {
    editProject: (docId, project) => {
      dispatch(editProject(docId, project));
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
)(EditProject);
