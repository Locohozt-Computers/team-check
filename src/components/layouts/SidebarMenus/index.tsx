import React, { FC } from "react";
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

  const desktopMenuName = () => (
    <div>
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
    <div>
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
      <MenuName>{isShowOrHideIconLabel ? mobileMenuName() : desktopMenuName()}</MenuName>
      <MenuLists>
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
        </MenuList>
      </MenuLists>
    </Menus>
  );
};

export default SideMenus;
