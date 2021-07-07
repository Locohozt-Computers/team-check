import React from "react";
import { useHistory } from "react-router-dom";

import HomeLayout from "components/layouts/HomeLayout/HomeLayout";
import { Container, Header,Content } from "./style";
import Title from "components/ui/Title";

const RegisteredPhones = () => {
  const history = useHistory();
  return (
    <HomeLayout>
      <Container>
        <Header>
          <Title title="Register Phone" />
          <button onClick={() => history.push("/phones/registerphoneform")}>
            <i className="fas fa-plus"></i>
            <span>Add Phone</span>
          </button>
        </Header>

        <Content>
          <h2>No Phone Register Yet</h2>
        </Content>
      </Container>
    </HomeLayout>
  );
};

export default RegisteredPhones;
