import React from "react";
import { History } from "history";

import CustomButton from "components/ui/CustomButton";
import InputWithLabel from "components/ui/InputWithLabel";
import { Container, Form } from "./style";
import { ErrorLabel } from "../common/style";

export type ResetType = {
  email: string;
};

type Props = {
  handleSubmit: (e: React.FormEvent<HTMLFormElement> | undefined) => void;
  values: any;
  errors: any;
  handleChange: (e: React.ChangeEvent<HTMLInputElement> | undefined) => void;
  touched: any;
  handleBlur: (e: React.ChangeEvent<HTMLInputElement> | undefined) => void;
  isSubmitting: boolean;
  history: History;
};

const ForgotPassword: React.FC<Props> = ({
  values,
  errors,
  touched,
  isSubmitting,
  handleSubmit,
  handleChange,
  handleBlur,
  history,
}) => {
  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <h1>Reset Password</h1>
        <ErrorLabel textAlign="center">
          {typeof errors === "string" ? errors : null}
        </ErrorLabel>
        <InputWithLabel
          placeholder="Enter Email"
          label="Email address"
          onChange={handleChange}
          onBlur={handleBlur}
          name="email"
          error={touched && errors.email}
          value={values.email}
          style={{
            marginBottom: 30,
          }}
        />
        <CustomButton
          testId="signin"
          label={"Submit Email"}
          type={"submit"}
          disabled={isSubmitting}
          background={isSubmitting ? "#f1f1f7" : "#177BFF"}
          loading={isSubmitting}
        />
        <div className="flex">
          <p className="forgot-password">
            Go back to{" "}
            <span onClick={() => history.push("/auth/signin")}>Signin</span>
          </p>
        </div>
      </Form>
    </Container>
  );
};

export default ForgotPassword;
