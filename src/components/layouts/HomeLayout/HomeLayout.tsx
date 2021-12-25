import React, { useEffect, useState } from "react";
import {
  logoutUserWhenTokenHasExpired,
  useAuth,
} from "context/auth/AuthProvider";
import { useLayout } from "context/layout/LayoutProvider";
import { useWallet } from "context/wallet/WalletProvider";
import Navbar from "../Navbar";
import SideMenus from "../SidebarMenus";

import { Content, Dashboard, Sidebar, InnerContent } from "./style";

const HomeLayout: React.FC = ({ children }) => {
  const [isCollapse, setIsCollapse] = useState(false);
  const { isMobile } = useLayout();

  const { user, getProfile, profile } = useAuth();
  const { getWalletBalance } = useWallet();

  // const isShowOrHideIconLabel = !!(isCollapse || isMobile);

  useEffect(() => {
    getProfile(user?.profile_id ?? "");
    getWalletBalance(profile?.walletBalance ?? 0);

    logoutUserWhenTokenHasExpired();

    // eslint-disable-next-line
  }, [profile?.walletBalance]);

  return (
    <Dashboard>
      <Navbar
        isCollapse={isCollapse}
        setIsCollapse={setIsCollapse}
        isMobile={isMobile}
        user={user}
      />
      <Content isCollapse={isCollapse} isMobile={isMobile}>
        {!isCollapse ? (
          <Sidebar>
            <SideMenus isCollapse={isCollapse} isMobile={isMobile} />
          </Sidebar>
        ) : (
          <Sidebar>
            <SideMenus isCollapse={isCollapse} isMobile={isMobile} />
          </Sidebar>
        )}
        <InnerContent>{children}</InnerContent>
      </Content>
    </Dashboard>
  );
};

export default HomeLayout;
