import React from "react";

import CustomButton from "components/ui/CustomButton";
import { useHistory } from "react-router-dom";
import { Card, Container } from "./style";

const EmailVerificationPage: React.FC = () => {
  const history = useHistory();

  return (
    <Container>
      <Card>
        <h1>Email Verification</h1>
        <p>
          You have successfully signed up to Tech Check Point, we have sent you
          an email verification, visit your mail an verify
        </p>
        <CustomButton
          testId="signin"
          label={"Go To Signin Page"}
          background={"#177BFF"}
          onClick={() => history.push("/auth/signin")}
        />
      </Card>
    </Container>
  );
};

export default EmailVerificationPage;
