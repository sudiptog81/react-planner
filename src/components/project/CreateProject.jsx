import React, { Component } from "react";
import { connect } from "react-redux";
import createProject from "../../store/actions/projectActions";
import { Redirect } from "react-router-dom";
import ReactGA from "react-ga";
import M from "materialize-css";

class CreateProject extends Component {
  state = {
    title: "",
    content: ""
  };
  handleSubmit = e => {
    e.preventDefault();
    this.props.createProject(this.state);
    this.props.history.push("/");
    M.toast({ html: "Post added" });
  };
  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  render(props) {
    ReactGA.pageview("/create");
    const { auth } = this.props;
    if (!auth.uid) return <Redirect to="/signin" />;
    return (
      <div className="container section">
        <form onSubmit={this.handleSubmit} className="white">
          <h5 className="grey-text text-darken-3">New Post</h5>
          <div className="input-field">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              name="title"
              id="title"
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
              className="materialize-textarea"
              style={{ height: "15rem", overflowY: "scroll" }}
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
  }
}

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth
  };
};

const mapDispatchToProps = dispatch => {
  return {
    createProject: project => {
      dispatch(createProject(project));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateProject);
