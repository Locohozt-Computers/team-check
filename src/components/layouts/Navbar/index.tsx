import React, { Dispatch, SetStateAction, useState } from "react";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";

import HamBurger from "components/ui/HamBurger";
import { Container } from "./style";
import { SignupUserType } from "types/authTypes";
import Avatar from "components/ui/Avatar";
import { menus } from "utils/data/menus";
import { useHistory } from "react-router-dom";

type Props = {
  isCollapse: boolean;
  setIsCollapse: Dispatch<SetStateAction<boolean>>;
  isMobile: boolean;
  user: Partial<SignupUserType>;
};

const Navbar: React.FC<Props> = ({
  isCollapse,
  setIsCollapse,
  isMobile,
  user,
}) => {
  const history = useHistory();

  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggle = () => setDropdownOpen((prevState) => !prevState);

  return (
    <Container>
      {!isMobile ? (
        <HamBurger isCollapse={isCollapse} setIsCollapse={setIsCollapse} />
      ) : (
        <div></div>
      )}
      <div className="menu">
        <Dropdown isOpen={dropdownOpen} toggle={toggle}>
          <DropdownToggle>
            <Avatar user={user} />
          </DropdownToggle>

          <DropdownMenu right>
            {menus?.map((menu: { id: number; name: string; route: string }) => (
              <DropdownItem
                onClick={() => {
                  if (menu.name === "Logout") {
                    localStorage.removeItem("techCheckPoint");
                    history.push(menu.route);
                    return;
                  }
                  history.push(menu.route);
                }}
              >
                {menu.name}
              </DropdownItem>
            ))}
          </DropdownMenu>
        </Dropdown>
      </div>
    </Container>
  );
};

export default Navbar;
