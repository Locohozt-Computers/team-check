import React, { FC } from "react";
import { useHistory } from "react-router-dom";

import { Menus, MenuName, MenuLists, MenuList } from "./style";

type Props = {
  isCollapse?: boolean;
};

const SideMenus: FC<Props> = ({ isCollapse }) => {
  const history = useHistory();

  return (
    <Menus>
      <MenuName>
        <span className="blue" onClick={() => history.push("/")}>
          Tech
        </span>
        <span className="red" onClick={() => history.push("/")}>
          Check
        </span>
        <span className="yellow" onClick={() => history.push("/")}>
          Point
        </span>
      </MenuName>
      <MenuLists>
        <MenuList isCollapse={isCollapse} to="/home" activeClassName="selected">
          <i className="fas fa-home"></i> {!isCollapse && <span>Home</span>}
        </MenuList>
        <MenuList isCollapse={isCollapse} to="/phones" activeClassName="selected">
          <i className="fas fa-phone"></i>{" "}
          {!isCollapse && <span>Register Phones</span>}
        </MenuList>
        <MenuList isCollapse={isCollapse} to="/services" activeClassName="selected">
          <i className="fas fa-wallet"></i> {!isCollapse && <span>Wallet</span>}
        </MenuList>
        <MenuList isCollapse={isCollapse} to="/user" activeClassName="selected">
          <i className="fas fa-user"></i> {!isCollapse && <span>Profile</span>}
        </MenuList>
      </MenuLists>
    </Menus>
  );
};

export default SideMenus;
