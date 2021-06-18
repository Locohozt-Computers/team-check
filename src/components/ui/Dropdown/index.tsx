import { LayoutContext } from "context/layout/LayoutProvider";
import React, { FC, useContext } from "react";
import { useHistory } from "react-router";
import { DropdownContainer } from "./style";

type Props = {
  menus: {
    id: number;
    name: string;
    route: string;
  }[];
};

const Dropdown: FC<Props> = ({ menus = [] }) => {
  const { closeAvatarMenu } =
    useContext(LayoutContext);

  const history = useHistory();

  return (
    <DropdownContainer>
      {menus?.map((menu: { id: number; name: string; route: string }) => (
        <p
          data-testid={`menu-${menu.id}`}
          key={menu.id}
          onClick={() => {
            if (menu.name === "Logout") {
              localStorage.removeItem("techCheckPoint");
              history.push(menu.route);
              closeAvatarMenu();
              return;
            }
            history.push(menu.route);
            closeAvatarMenu();
          }}
        >
          {menu.name}
        </p>
      ))}
    </DropdownContainer>
  );
};

export default Dropdown;
