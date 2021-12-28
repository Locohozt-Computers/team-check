import React, { FC } from "react";

import { useAuth } from "context/auth/AuthProvider";
import { Menus, MenuLists, MenuList } from "./style";
import { menus } from "./data/menus";

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
  const { user } = useAuth();

  const isShowOrHideIconLabel = !!(isCollapse || isMobile);

  return (
    <Menus>
      <MenuLists isCollapse={isCollapse} isMobile={isMobile}>
        {menus.map((menu: any) => (
          <MenuList
            isCollapse={isCollapse}
            to={menu.route}
            activeClassName="selected"
          >
            <ShowMenu
              isShowOrHideIconLabel={isShowOrHideIconLabel}
              text={menu.text}
              iconType="home"
            />
          </MenuList>
        ))}
        {/* <MenuList isCollapse={isCollapse} to="/home" activeClassName="selected">
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
            text="Registered Phones"
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
        <MenuList isCollapse={isCollapse} to="/user" activeClassName="selected">
          <ShowMenu
            isShowOrHideIconLabel={isShowOrHideIconLabel}
            text="Profile"
            iconType="user"
          />
        </MenuList> */}
        {user.user_type?.toLocaleUpperCase() === "ADMIN" && (
          <MenuList
            isCollapse={isCollapse}
            to="/admin"
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
