import React, { Component } from "react";
import M from "materialize-css";
import { NavLink } from "react-router-dom";
import ReactGA from "react-ga";
import { connect } from "react-redux";

class LandingPage extends Component {
  componentDidMount() {
    const elems = document.querySelectorAll(".parallax");
    M.Parallax.init(elems);
  }
  render() {
    ReactGA.pageview("/");
    const { auth, profile } = this.props;
    return (
      <React.Fragment>
        <div
          className="parallax-container valign-wrapper"
          style={{ margin: "auto", justifyContent: "center", height: "95vh" }}
        >
          <div className="parallax">
            <img
              src="/back.jpg"
              alt="background"
              style={{ filter: "grayscale(1) brightness(.1) contrast(.7)" }}
            />
          </div>
          <div className="section no-pad-bot no-pad-top" id="index-banner">
            <div className="container">
              <h1
                className="header center white-text"
                style={{
                  marginTop: "0",
                  marginBottom: "0",
                  fontFamily: "Pacifico"
                }}
              >
                React Planner
              </h1>
              <div className="row center">
                <h5 className="header col s12 white-text">
                  a modern open-source companion for planning the next big thing
                </h5>
              </div>
              {auth.uid ? (
                <div className="row center">
                  <NavLink
                    to="/user"
                    className="grey-text text-darken-3 btn btn-small white waves-effect"
                  >
                    Signed in as {profile.firstName} {profile.lastName}
                  </NavLink>
                </div>
              ) : (
                <div className="row center">
                  <NavLink
                    to="/signin"
                    id="download-button"
                    className="btn btn-large waves-effect white grey-text text-darken-3"
                    style={{ width: "8.75rem" }}
                  >
                    <strong style={{ fontWeight: "600" }}>Sign In</strong>
                  </NavLink>
                  <NavLink
                    to="/signup"
                    id="download-button"
                    className="btn btn-large waves-effect white grey-text text-darken-3"
                    style={{ marginLeft: "1rem", width: "8.75rem" }}
                  >
                    <strong style={{ fontWeight: "600" }}>Sign Up</strong>
                  </NavLink>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="container">
          <div className="section">
            <div className="row">
              <div className="col s12 m4">
                <div className="icon-block">
                  <h2 className="center grey-text text-darken-3">
                    <i className="material-icons">flash_on</i>
                  </h2>
                  <h5 className="center">Speedy Integration</h5>

                  <p className="light">
                    We did most of the heavy lifting for you to provide you a
                    refined interface to have a platform ready to cater to your
                    planning needs. Ping us on our social accounts to have an
                    instance for your team. You can also clone the GitHub
                    repository to customise the platform yourself. Link is given
                    in the footer.
                  </p>
                </div>
              </div>

              <div className="col s12 m4">
                <div className="icon-block">
                  <h2 className="center grey-text text-darken-3">
                    <i className="material-icons">group</i>
                  </h2>
                  <h5 className="center">Team Friendly</h5>

                  <p className="light">
                    The platform is friendly for any team. Users can add posts,
                    edit them and delete them. Everyone gets a notification
                    whenever an user joins, adds a new post, edits or deletes a
                    post, or an user leaves. Administrators can track and debug
                    technical problems, and moderate content easily.
                  </p>
                </div>
              </div>

              <div className="col s12 m4">
                <div className="icon-block">
                  <h2 className="center grey-text text-darken-3">
                    <i className="material-icons">settings</i>
                  </h2>
                  <h5 className="center">Flexible Stack</h5>

                  <p className="light">
                    We have used Materialize to style the components and
                    therefore, customization is blazingly fast. The platform is
                    built on top of React and uses Redux, Firebase and Moment
                    and is therefore has a solid groundwork. Cloud computing
                    adds dependability to React Planner.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <footer className="page-footer grey darken-2">
          <div className="container">
            <div className="row">
              <div className="col l8 mobile-hide">
                <h5 className="white-text">Developer Profile</h5>
                <p className="grey-text text-lighten-4">
                  Sudipto Ghosh is a high-school graduate who has experience in
                  full-stack development in various modern web technologies and
                  frameworks like NodeJS, PHP, React, Angular and NGINX. His
                  detailed portfolio is available on{" "}
                  <a
                    href="https://sudipto.ghosh.pro"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="white-text"
                  >
                    sudipto.ghosh.pro
                  </a>
                </p>
              </div>
              <div className="col l3 s12 offset-l1 social">
                <h5 className="white-text">Social</h5>
                <button className="btn btn-floating waves-effect white">
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://facebook.com/sudiptoghosh99"
                    className="social"
                  >
                    <i className="fab fa-facebook-f grey-text text-darken-3" />
                  </a>
                </button>
                <button className="btn btn-floating waves-effect white middle">
                  <a
                    href="https://twitter.com/ScientificGhosh"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social"
                  >
                    <i className="fab fa-twitter grey-text text-darken-3" />
                  </a>
                </button>
                <button className="btn btn-floating waves-effect white">
                  <a
                    href="https://github.com/sudiptog81"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social"
                  >
                    <i className="fab fa-github-alt grey-text text-darken-3" />
                  </a>
                </button>
              </div>
            </div>
          </div>
          <div className="footer-copyright grey darken-3">
            <div className="container center">
              Developed by{" "}
              <a
                className="grey-text text-lighten-3"
                href="https://sudipto.ghosh.pro"
              >
                Sudipto Ghosh
              </a>
            </div>
          </div>
        </footer>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile
  };
};

export default connect(mapStateToProps)(LandingPage);
