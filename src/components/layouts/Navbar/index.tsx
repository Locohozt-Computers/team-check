import React, { Dispatch, SetStateAction } from "react";
import HamBurger from "components/ui/HamBurger";
import { useHistory } from "react-router";
import { Container } from "./style";
import { SignupUserType } from "types/authTypes";

type Props = {
  isCollapse: boolean;
  setIsCollapse: Dispatch<SetStateAction<boolean>>;
  isMobile: boolean;
  user: Partial<SignupUserType>
};

const Navbar: React.FC<Props> = ({ isCollapse, setIsCollapse, isMobile, user }) => {
  const history = useHistory();

  return (
    <Container>
      {!isMobile ? <HamBurger isCollapse={isCollapse} setIsCollapse={setIsCollapse} /> : <div></div>}
      <div className="menu">
        <p>{user?.username}</p>
        <p
          onClick={() => {
            localStorage.removeItem("techCheckPoint");
            history.push("/auth/signin");
          }}
        >
          Logout
        </p>
      </div>
    </Container>
  );
};

export default Navbar;
