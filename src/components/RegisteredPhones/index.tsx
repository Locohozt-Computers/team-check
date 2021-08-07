import React from "react";
import { useHistory } from "react-router-dom";

import HomeLayout from "components/layouts/HomeLayout/HomeLayout";
import { Container, Header, Content, PhoneListStyle } from "./style";
import Title from "components/ui/Title";
import { useContext } from "react";
import { RegisterPhoneContext } from "context/registerPhone/RegisterPhoneProvider";
import PhoneList from "./PhoneList";
import { AuthContext } from "context/auth/AuthProvider";

const RegisteredPhones = () => {
  const history = useHistory();
  const { user } = useContext(AuthContext);
  const { all_register_phones } = useContext(RegisterPhoneContext);
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
          {all_register_phones?.length <= 0 && <h2>No Phone Register Yet</h2>}
          {/* {all_register_phones?.length > 0 && (
            <PhoneListStyle status={false}>
              <div>Image</div>
              <div>Phone Name</div>
              <div>Amount</div>
              <div>User</div>
              <div>Date</div>
            </PhoneListStyle>
          )} */}
          {all_register_phones?.map((phone: any) => (
            <PhoneList phone={phone} />
          ))}
        </Content>
      </Container>
    </HomeLayout>
  );
};

export default RegisteredPhones;
