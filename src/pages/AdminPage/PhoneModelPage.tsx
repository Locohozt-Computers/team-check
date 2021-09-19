import React from "react";
import HomeLayout from "components/layouts/HomeLayout/HomeLayout";
import AddPhoneModel from "components/Admin/AddPhoneModel";
import styled from "styled-components";

const PhoneModelPage = () => {
  return (
    <HomeLayout>
      <Container>
        <AddPhoneModel />
      </Container>
    </HomeLayout>
  );
};

const Container = styled.div`
  /* height: 90vh;
  overflow-y: auto; */
`;

export default PhoneModelPage;
