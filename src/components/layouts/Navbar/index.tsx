import React, { Dispatch, SetStateAction } from "react";
import HamBurger from "components/ui/HamBurger";
import { Container } from "./style";
import { SignupUserType } from "types/authTypes";
import Avatar from "components/ui/Avatar";
import { menus } from "utils/data/menus";

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

  return (
    <Container>
      {!isMobile ? (
        <HamBurger isCollapse={isCollapse} setIsCollapse={setIsCollapse} />
      ) : (
        <div></div>
      )}
      <div className="menu">
        <Avatar
          user={user}
          menus={menus}
        />
        {/* <p
          onClick={() => {
            localStorage.removeItem("techCheckPoint");
            history.push("/auth/signin");
          }}
        >
          Logout
        </p> */}
      </div>
    </Container>
  );
};

export default Navbar;
