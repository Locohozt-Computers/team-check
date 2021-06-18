import React from "react";

import Avatar from "components/ui/Avatar";
import { menus } from "utils/data/menus";
import {
  MenuName,
  Menus,
  NavbarLink,
  NavbarMenu,
} from "./style";

const AuthNavbar = () => {

  let user: any = localStorage.getItem("techCheckPoint");
  user = JSON.parse(user);

  let token = user?.token;

  return (
    <NavbarMenu>
      <MenuName>
        <span className="blue">Tech</span>
        <span className="red">Check</span>
        <span className="yellow">Point</span>
      </MenuName>
      <div>
        {token ? (
          <Avatar
            user={user}
            menus={menus}
          />
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
