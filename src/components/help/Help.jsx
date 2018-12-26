import React from "react";
import FAQ from "./FAQ";
import PrivacyPolicy from "./PrivacyPolicy";
import Terms from "./Terms";

const Help = () => {
  return (
    <div className="container">
      <FAQ />
      <PrivacyPolicy />
      <Terms />
    </div>
  );
};

export default Help;
