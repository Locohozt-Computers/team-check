import React from "react";

import HomeLayout from "components/layouts/HomeLayout/HomeLayout";
import { Container } from "./style";

type Props = {
  user: Record<string, string>;
};

const HomeComponent: React.FC<Props> = ({ user }) => {
  return (
    <HomeLayout>
      <Container>
        <h1>Hi, </h1>
        <h2>{user.username}</h2>
      </Container>
    </HomeLayout>
  );
};

export default HomeComponent;
