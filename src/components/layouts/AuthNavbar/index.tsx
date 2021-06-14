import Dropdown from "components/ui/Dropdown";
import React, { useState } from "react";
import { getInitialCharacter } from "utils/getInitialCharacter";
import {
  MenuName,
  Menus,
  NavbarLink,
  NavbarMenu,
  InitialCharacter,
} from "./style";

const menus = [
  {id: 1, name: 'Dashboard', route: '/home'},
  {id: 2, name: 'Logout', route: '/auth/signin'},
]

const AuthNavbar = () => {
  const [collapse, setCollapse] = useState(false);

  let user: any = localStorage.getItem("techCheckPoint");
  user = JSON.parse(user);

  let token = user?.token;

  const getInitials = getInitialCharacter(user);

  return (
    <NavbarMenu>
      <MenuName>
        <span className="blue">Tech</span>
        <span className="red">Check</span>
        <span className="yellow">Point</span>
      </MenuName>
      <div>
        {token ? (
          <InitialCharacter
            onMouseEnter={() => {
              setCollapse(true);
            }}
            onMouseLeave={() => {
              setCollapse(false);
            }}
          >
            <span>{getInitials}</span>
            {collapse && <Dropdown menus={menus} />}
          </InitialCharacter>
        ) : (
          <Menus>
            <NavbarLink to="/auth/signin" activeClassName="selected">
              Login
            </NavbarLink>
            <NavbarLink to="/auth/signup" activeClassName="selected">
              Register
            </NavbarLink>
          </Menus>
        )}
      </div>
    </NavbarMenu>
  );
};

export default AuthNavbar;
