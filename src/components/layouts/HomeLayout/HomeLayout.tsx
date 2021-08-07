import {
  AuthContext,
  logoutUserWhenTokenHasExpired,
} from "context/auth/AuthProvider";
import { LayoutContext } from "context/layout/LayoutProvider";
import { RegisterPhoneContext } from "context/registerPhone/RegisterPhoneProvider";
import { WalletContext } from "context/wallet/WalletProvider";
import React, { useContext, useEffect, useState } from "react";
import Navbar from "../Navbar";
import SideMenus from "../SidebarMenus";

import { Content, Dashboard, Sidebar, InnerContent } from "./style";

const HomeLayout: React.FC = ({ children }) => {
  const [isCollapse, setIsCollapse] = useState(false);

  const { user, getProfile, profile } = useContext(AuthContext);
  const { getWalletBalance } = useContext(WalletContext);
  const { isMobile } = useContext(LayoutContext);
  const { allRegisterPhonesUsers, allRegisterPhonesAgent } =
    useContext(RegisterPhoneContext);
  const {
    getBrands,
    getCategories,
    getStates,
    getColors,
    getRams,
    getRegFee,
    getCondition,
    getScreenSize,
  } = useContext(RegisterPhoneContext);

  const isShowOrHideIconLabel = !!(isCollapse || isMobile);

  useEffect(() => {
    getProfile(user?.profile_id ?? "");
    getWalletBalance(profile?.walletBalance ?? 0);
    getBrands();
    getCategories();
    getStates();
    getColors();
    getCondition();
    getScreenSize();
    getRams();
    getRegFee();
    allRegisterPhonesUsers();
    allRegisterPhonesAgent();

    logoutUserWhenTokenHasExpired();

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
