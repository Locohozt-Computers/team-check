import { AuthContext } from "context/auth/AuthProvider";
import React, { FC, useContext } from "react";
import { useHistory } from "react-router-dom";

import { Menus, MenuName, MenuLists, MenuList } from "./style";

type Props = {
  isCollapse?: boolean;
  isMobile: boolean;
};

const ShowMenu = ({
  isShowOrHideIconLabel,
  text,
  iconType,
}: {
  isShowOrHideIconLabel: boolean;
  text: string;
  iconType: string;
}) => (
  <>
    <i className={`fas fa-${iconType}`}></i>{" "}
    {!isShowOrHideIconLabel && <span>{text}</span>}
  </>
);

const SideMenus: FC<Props> = ({ isCollapse, isMobile }) => {
  const history = useHistory();

  const { user } = useContext(AuthContext);

  const desktopMenuName = () => (
    <div className="profile" onClick={() => history.push("/")}>
      <span className="blue" onClick={() => history.push("/")}>
        Tech
      </span>
      <span className="red" onClick={() => history.push("/")}>
        Check
      </span>
      <span className="yellow" onClick={() => history.push("/")}>
        Point
      </span>
    </div>
  );

  const mobileMenuName = () => (
    <div className="profile" onClick={() => history.push("/")}>
      <span className="blue" onClick={() => history.push("/")}>
        T
      </span>
      <span className="red" onClick={() => history.push("/")}>
        C
      </span>
      <span className="yellow" onClick={() => history.push("/")}>
        P
      </span>
    </div>
  );

  const isShowOrHideIconLabel = !!(isCollapse || isMobile);

  return (
    <Menus>
      <MenuName>
        {isShowOrHideIconLabel ? mobileMenuName() : desktopMenuName()}
      </MenuName>
      <MenuLists isCollapse={isCollapse}>
        <MenuList isCollapse={isCollapse} to="/home" activeClassName="selected">
          <ShowMenu
            isShowOrHideIconLabel={isShowOrHideIconLabel}
            text="Home"
            iconType="home"
          />
        </MenuList>
        <MenuList
          isCollapse={isCollapse}
          to="/phones"
          activeClassName="selected"
        >
          <ShowMenu
            isShowOrHideIconLabel={isShowOrHideIconLabel}
            text="Register Phones"
            iconType="phone"
          />
        </MenuList>
        <MenuList isCollapse={isCollapse} to="/bank" activeClassName="selected">
          <ShowMenu
            isShowOrHideIconLabel={isShowOrHideIconLabel}
            text="Bank"
            iconType="university"
          />
        </MenuList>
        <MenuList
          isCollapse={isCollapse}
          to="/wallet"
          activeClassName="selected"
        >
          <ShowMenu
            isShowOrHideIconLabel={isShowOrHideIconLabel}
            text="Wallet"
            iconType="wallet"
          />
        </MenuList>
        {/* <MenuList
          isCollapse={isCollapse}
          to="/subscription-plans"
          activeClassName="selected"
        >
          <ShowMenu
            isShowOrHideIconLabel={isShowOrHideIconLabel}
            text="Subscription Plans"
            iconType="money-bill"
          />
        </MenuList> */}
        <MenuList isCollapse={isCollapse} to="/user" activeClassName="selected">
          <ShowMenu
            isShowOrHideIconLabel={isShowOrHideIconLabel}
            text="Profile"
            iconType="user"
          />
        </MenuList>
        {user.user_type?.toLocaleUpperCase() === "ADMIN" && (
          <MenuList
            isCollapse={isCollapse}
            to="/admin/setup"
            activeClassName="selected"
          >
            <ShowMenu
              isShowOrHideIconLabel={isShowOrHideIconLabel}
              text="Admin Settings"
              iconType="user"
            />
          </MenuList>
        )}
      </MenuLists>
    </Menus>
  );
};

export default SideMenus;
