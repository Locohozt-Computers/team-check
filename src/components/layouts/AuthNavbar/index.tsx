import React from "react";
import { MenuName, Menus, NavbarLink, NavbarMenu } from "./style";

const AuthNavbar = () => {
  return (
    <NavbarMenu>
      <MenuName>
        <span className="blue">Tech</span>
        <span className="red">Check</span>
        <span className="yellow">Point</span>
      </MenuName>
      <Menus>
        <NavbarLink to="/auth/signin" activeClassName="selected">
          Login
        </NavbarLink>
        <NavbarLink to="/auth/signup" activeClassName="selected">
          Register
        </NavbarLink>
      </Menus>
    </NavbarMenu>
  );
};

export default AuthNavbar;
