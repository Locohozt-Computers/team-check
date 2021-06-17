import React, { Dispatch, SetStateAction, useContext } from "react";
import HamBurger from "components/ui/HamBurger";
import { useHistory } from "react-router";
import { Container } from "./style";
import { AuthContext } from "context/auth/AuthProvider";

type Props = {
  isCollapse: boolean;
  setIsCollapse: Dispatch<SetStateAction<boolean>>;
};

const Navbar: React.FC<Props> = ({ isCollapse, setIsCollapse }) => {
  const history = useHistory();

  const { user } = useContext(AuthContext);

  return (
    <Container>
      <HamBurger isCollapse={isCollapse} setIsCollapse={setIsCollapse} />
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
