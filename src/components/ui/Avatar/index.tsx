import { LayoutContext } from "context/layout/LayoutProvider";
import React, { useContext } from "react";
import { SignupUserType } from "types/authTypes";
import { getInitialCharacter } from "utils/getInitialCharacter";
import Dropdown from "../Dropdown";
import { InitialCharacter } from "./style";

type Props = {
  user: Partial<SignupUserType>;
  menus?: any;
};

const Avatar: React.FC<Props> = ({ user, menus }) => {
  const { avatarMenu, openAvatarMenu, closeAvatarMenu } =
    useContext(LayoutContext);

  const getInitials = getInitialCharacter(user);

  return (
    <InitialCharacter
      onMouseEnter={() => {
        if (menus?.length) {
          openAvatarMenu();
        }
      }}
      onMouseLeave={() => {
        if (menus?.length) {
          closeAvatarMenu();
        }
      }}
    >
      <span>{getInitials}</span>
      {avatarMenu && <Dropdown menus={menus} />}
    </InitialCharacter>
  );
};

export default Avatar;
