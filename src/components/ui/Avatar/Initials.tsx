import React from "react";

import { InitialCharacter } from "components/layouts/AuthNavbar/style";
import { getInitialCharacter } from "utils/getInitialCharacter";

const Initials = ({ user }: any) => {
  const getInitials = getInitialCharacter(user);
  return (
    <InitialCharacter>
      <span>{getInitials}</span>
    </InitialCharacter>
  );
};

export default Initials;
