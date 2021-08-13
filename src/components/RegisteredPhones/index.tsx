import React, { useContext } from "react";
import { useHistory } from "react-router-dom";

import HomeLayout from "components/layouts/HomeLayout/HomeLayout";
import { Container, Header, Content } from "./style";
import Title from "components/ui/Title";
import { RegisterPhoneContext } from "context/registerPhone/RegisterPhoneProvider";
import PhoneList from "./PhoneList";
import { AuthContext } from "context/auth/AuthProvider";
import Loader from "components/ui/Loader";

const RegisteredPhones = () => {
  const history = useHistory();
  const { user } = useContext(AuthContext);
  const { all_register_phones, loading } = useContext(RegisterPhoneContext);
  return (
    <HomeLayout>
      <Container>
        <Header>
          <Title title="Register Phone" />
          {user?.user_type === "AGENT" && (
            <button onClick={() => history.push("/phones/registerphoneform")}>
              <i className="fas fa-plus"></i>
              <span>Add Phone</span>
            </button>
          )}
        </Header>

        <Content>
          {!loading && all_register_phones?.length <= 0 && <h2>No Phone Register Yet</h2>}
          {!all_register_phones?.length && loading && (
            <div>
              <Loader width={30} />
            </div>
          )}
          {all_register_phones?.map((phone: any) => (
            <PhoneList phone={phone} />
          ))}
        </Content>
      </Container>
    </HomeLayout>
  );
};

export default RegisteredPhones;
