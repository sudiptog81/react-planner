import React, { Component } from "react"; // import { Link } from "react-router-dom";
import M from "materialize-css";

class FAQ extends Component {
  state = {};
  componentDidMount() {
    const elems = document.querySelector(".collapsible");
    // eslint-disable-next-line no-unused-vars
    const instances = M.Collapsible.init(elems, {
      accordion: false
    });
  }
  accStyle = {
    fontSize: "1rem",
    margin: "auto 0",
    marginRight: "1rem"
  };
  justifyStyle = {
    textAlign: "justify"
  };
  render() {
    return <div className="section">
        <h2 className="center">FAQ</h2>
        <ul className="collapsible">
          <li>
            <div className="collapsible-header">
              <i className="fas fa-user" style={this.accStyle} />
              How do I create an account?
            </div>
            <div className="collapsible-body">
              <p style={{ textAlign: "justify" }}>
                If you do not have an account on this platform, you can create an account to access the platform. To do so, click on the <em>
                  Not Registered?
                </em> link on the <em>Sign In</em> page. You shall be taken to the <em>
                  Sign Up
                </em> page where you will be prompted to provide the details neccessary to create an account. Once you provide the details correctly, click on the <em>
                  Register
                </em> button. That's it!
              </p>
              <em>
                A verification link will be sent to the provided email to
                verify your credentials.
              </em>
            </div>
          </li>
          <li>
            <div className="collapsible-header">
              <i className="fas fa-plus" style={this.accStyle} />
              How do I add a post to the feed?
            </div>
            <div className="collapsible-body">
              <p style={this.justifyStyle}>
                Tap on <i className="fas fa-plus" /> to go to the <em>
                  Add Post
                </em> page. Enter the title of your post and its content in the respective fields. No markup or media is allowed in the post. If you have to post a link in the post, you can do so by simply pasting it in the field. Tap on the <em>
                  Submit
                </em> button to add the post to the feed. Refresh the page if you are not able to view the post. A notificiation will be added to the Notifications section that you have added a post.
              </p>
            </div>
          </li>
          <li>
            <div className="collapsible-header">
              <i className="fas fa-pencil-alt" style={this.accStyle} />
              How do I edit a post that I added?
            </div>
            <div className="collapsible-body">
              <p style={this.justifyStyle}>
                Tap on a post to view the post. Tap on <i className="fas fa-pencil-alt" /> to go the <em>
                  Edit Post
                </em> page. The editor shall be prefilled with the content of the post. Edit the post and once done, tap the <em>
                  Submit
                </em> button and the post will be updated. A notification will be added that you edited a post.
              </p>
              <em>
                You can edit a post only if you had originally created the
                post.
              </em>
            </div>
          </li>
          <li>
            <div className="collapsible-header">
              <i className="fas fa-trash" style={this.accStyle} />
              How do I delete a post that I added?
            </div>
            <div className="collapsible-body">
              <p style={{ textAlign: "justify" }}>
                Tap on a post to view the post. Tap on <i className="fas fa-trash" /> to delete the post. A notification will be added that you deleted a post.
              </p>
              <em>
                You can delete a post only if you had originally created the
                post.
              </em>
            </div>
          </li>
          <li>
            <div className="collapsible-header">
              <i className="fas fa-eye" style={this.accStyle} />
              How do I change my password?
            </div>
            <div className="collapsible-body">
              <p style={{ textAlign: "justify" }}>
                Tap on <i className="fas fa-user" /> to go to the <em>
                  User Profile
                </em>{" "}
                page. Tap on the <em>Reset Password</em> button on that page. You shall receive an e-mail containing a link to change your password. Do check the spam folder if you are not able to find the e-mail in your inbox. Do note, it can take a couple of minutes for the e-mail to arrive.
              </p>
              <em>
                If you need any assistance, feel free to reach out on <a href="mailto:admin@ghosh.pro">
                  admin@ghosh.pro
                </a>
              </em>
            </div>
          </li>
          <li>
            <div className="collapsible-header">
              <i className="fas fa-user" style={this.accStyle} />
              How do I delete my account?
            </div>
            <div className="collapsible-body">
              <p style={{ textAlign: "justify" }}>
                Tap on <i className="fas fa-user" /> to go to the <em>
                  User Profile
                </em>{" "}
                page. Tap on the <em>Delete Account</em> button on that page. You will be presented with a popup with instructions to delete the account.
              </p>
              <em>
                You will not be able to restore the account once it has been deleted. The posts that you add here will not be deleted. If you need any assistance, feel free to reach out on <a href="mailto:admin@ghosh.pro">
                  admin@ghosh.pro
                </a>
              </em>
            </div>
          </li>
        </ul>
      </div>;
  }
}

export default FAQ;
