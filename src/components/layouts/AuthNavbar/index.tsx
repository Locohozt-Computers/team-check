import React, { useState } from "react";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";

import Avatar from "components/ui/Avatar";
import { menus } from "utils/data/menus";
import { MenuName, Menus, NavbarLink, NavbarMenu } from "./style";
import { useHistory } from "react-router-dom";
import Logo from "components/ui/Logo";

const AuthNavbar = () => {
  let user: any = localStorage.getItem("techCheckPoint");
  user = JSON.parse(user);

  let token = user?.token;

  const history = useHistory();

  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggle = () => setDropdownOpen((prevState) => !prevState);

  return (
    <NavbarMenu>
      <MenuName>
        {/* <span className="blue">Tech</span>
        <span className="red">Check</span>
        <span className="yellow">Point</span> */}
        <Logo />
      </MenuName>
      <div>
        {token ? (
          <Dropdown isOpen={dropdownOpen} toggle={toggle}>
            <DropdownToggle>
              <Avatar user={user} />
            </DropdownToggle>

            <DropdownMenu right>
              {menus?.map(
                (menu: { id: number; name: string; route: string }) => (
                  <DropdownItem
                    onClick={() => {
                      if (menu.name === "Logout") {
                        localStorage.removeItem("techCheckPoint");
                        history.push(menu.route);
                        return;
                      }
                      history.push(menu.route);
                    }}
                  >
                    {menu.name}
                  </DropdownItem>
                )
              )}
            </DropdownMenu>
          </Dropdown>
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
