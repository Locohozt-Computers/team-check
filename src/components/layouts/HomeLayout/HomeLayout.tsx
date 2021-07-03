import { AuthContext } from "context/auth/AuthProvider";
import { LayoutContext } from "context/layout/LayoutProvider";
import { WalletContext } from "context/wallet/WalletProvider";
import React, { useContext, useEffect, useState } from "react";
import Navbar from "../Navbar";
import SideMenus from "../SidebarMenus";

import { Content, Dashboard, Sidebar, InnerContent } from "./style";

const HomeLayout: React.FC = ({ children }) => {
  const [isCollapse, setIsCollapse] = useState(false);
  const [col, setCol] = useState(0);

  const { user, getProfile, profile } = useContext(AuthContext);
  const { getWalletBalance } = useContext(WalletContext);
  const { isMobile } = useContext(LayoutContext);

  const isShowOrHideIconLabel = !!(isCollapse || isMobile);

  useEffect(() => {
    getProfile(user?.profile_id ?? "");
    getWalletBalance(profile?.walletBalance ?? 500);

    setCol(profile?.walletBalance ? profile?.walletBalance : 0);

    return () => {
      console.log(1500);
    };
    // eslint-disable-next-line
  }, [profile?.walletBalance]);

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
