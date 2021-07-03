import { AuthContext } from "context/auth/AuthProvider";
import { LayoutContext } from "context/layout/LayoutProvider";
import React, { useContext, useEffect, useState } from "react";
import Navbar from "../Navbar";
import SideMenus from "../SidebarMenus";

import { Content, Dashboard, Sidebar, InnerContent } from "./style";

const HomeLayout: React.FC = ({ children }) => {
  const [isCollapse, setIsCollapse] = useState(false);

  const { user, getProfile } = useContext(AuthContext);
  const { isMobile } = useContext(LayoutContext);

  const isShowOrHideIconLabel = !!(isCollapse || isMobile);

  useEffect(() => {
    getProfile(user?.profile_id ?? "");

    // eslint-disable-next-line
  }, []);

  return (
    <Dashboard isCollapse={isShowOrHideIconLabel}>
      <Sidebar>
        <SideMenus isCollapse={isCollapse} isMobile={isMobile} />
      </Sidebar>
      <Content>
        <Navbar
          isCollapse={isCollapse}
          setIsCollapse={setIsCollapse}
          isMobile={isMobile}
          user={user}
        />
        <InnerContent>{children}</InnerContent>
      </Content>
    </Dashboard>
  );
};

export default HomeLayout;
