import React from "react";

import logo from "assets/icons/logo1.png";

type Props = {
  width?: number;
};

const Logo: React.FC<Props> = ({ width }) => {
  return (
    <div>
      <img
        src={logo}
        alt="logo"
        width={width ?? 60}
        height={40}
        style={{ borderRadius: 10 }}
      />
    </div>
  );
};

export default Logo;
