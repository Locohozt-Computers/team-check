import React, { useState } from "react";
import Navbar from "../Navbar";
import SideMenus from "../SidebarMenus";

import { Content, Dashboard, Sidebar } from "./style";

const HomeLayout: React.FC = ({ children }) => {
  const [isCollapse, setIsCollapse] = useState(false);

  return (
    <Dashboard isCollapse={isCollapse}>
      <Sidebar>
        <SideMenus isCollapse={isCollapse} />
      </Sidebar>
      <Content>
        <Navbar isCollapse={isCollapse} setIsCollapse={setIsCollapse} />
        {children}
      </Content>
    </Dashboard>
  );
};

export default HomeLayout;
