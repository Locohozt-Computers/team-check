import React from "react";
import { LandingStyle } from "./style";

const LandingComponent: React.FC = ({ children }) => {
  return (
    <LandingStyle>
      <h2>
        <span className="blue">Tech</span>
        <span className="red">Check</span>
        <span className="yellow">Point</span>
      </h2>
      {children}
    </LandingStyle>
  );
};

export default LandingComponent;
