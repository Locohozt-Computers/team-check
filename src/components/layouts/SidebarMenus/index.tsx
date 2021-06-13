import React from "react";

import { Menus, MenuName, MenuLists, MenuList } from "./style";

const SideMenus = () => {
  return (
    <Menus>
      <MenuName>Team Check</MenuName>
      <MenuLists>
        <MenuList to="/home" activeClassName="selected">Home</MenuList>
        <MenuList to="/phones" activeClassName="selected">Register Phones</MenuList>
        <MenuList to="/services" activeClassName="selected">Wallet</MenuList>
        <MenuList to="/user" activeClassName="selected">Profile</MenuList>
      </MenuLists>
    </Menus>
  );
};

export default SideMenus;
