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
              iconType={menu.iconType}
            />
          </MenuList>
        ))}
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
