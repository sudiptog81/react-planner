import React, { Component } from "react";
import PrivacyPolicy from "./PrivacyPolicy";
import Terms from "./Terms";
import FAQ from "./FAQ";
import ReactGA from "react-ga";

class Help extends Component {
  componentDidMount() {
    ReactGA.pageview("/help");
  }

  render() {
    return (
      <div className="container">
        <FAQ />
        <PrivacyPolicy />
        <Terms />
      </div>
    );
  }
}

export default Help;
