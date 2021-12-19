import React, { FC } from "react";
import { Checkbox } from "pretty-checkbox-react";
import { History } from "history";

import CustomButton from "components/ui/CustomButton";
import InputWithLabel from "components/ui/InputWithLabel";
import { Container, Form, UserAgent } from "./style";
import { ErrorLabel } from "../common/style";
import AuthButton from "components/ui/AuthButton";

type Props = {
  handleSubmit: (e?: React.FormEvent<HTMLFormElement> | undefined) => void;
  values: any;
  errors: any;
  handleChange: (e: React.ChangeEvent<HTMLInputElement> | undefined) => void;
  touched: any;
  handleBlur: (e: React.ChangeEvent<HTMLInputElement> | undefined) => void;
  isSubmitting: boolean;
  history: History;
  googleSignIn: () => Promise<void>;
};

const SignUpComponent: FC<Props> = ({
  values,
  errors,
  touched,
  isSubmitting,
  history,
  handleBlur,
  handleChange,
  handleSubmit,
  googleSignIn,
}) => {
  return (
    <Container>
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <h1>Sign Up</h1>
        <ErrorLabel textAlign="center">
          {typeof errors === "string" ? errors : null}
        </ErrorLabel>
        <InputWithLabel
          placeholder="Enter Email"
          label="Email address"
          name="email"
          type="email"
          error={touched && errors.email}
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.email}
          style={{
            marginBottom: 30,
          }}
        />
        <InputWithLabel
          placeholder="Enter Password"
          label="Password"
          name="password"
          type="password"
          error={touched && errors.password}
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.password}
          style={{
            marginBottom: 30,
          }}
        />
        <InputWithLabel
          placeholder="Enter Confirm Password"
          label="Confirm Password"
          name="password_confirmation"
          type="password"
          error={touched && errors.password_confirmation}
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.password_confirmation}
          style={{
            marginBottom: 30,
          }}
        />
        <UserAgent>
          <Checkbox
            name="role_id"
            onChange={handleChange}
            value={3}
            style={{ display: "flex", alignItems: "center", fontSize: 12 }}
          >
            <span style={{ marginLeft: 5 }}>User</span>
          </Checkbox>
          <Checkbox
            name="role_id"
            onChange={handleChange}
            value={2}
            style={{ display: "flex", alignItems: "center", fontSize: 12 }}
          >
            <span style={{ marginLeft: 5 }}>Agent</span>
          </Checkbox>
        </UserAgent>
        <CustomButton
          testId="signup"
          label={"Submit"}
          type={"submit"}
          disabled={isSubmitting}
          background={isSubmitting ? "#f1f1f7" : "#177BFF"}
          loading={isSubmitting}
        />
        <div className="flex">
          <p></p>
          <p className="forgot-password">
            Do you have an account?{" "}
            <span onClick={() => history.push("/auth/signin")}>Signin</span>
          </p>
        </div>
        <AuthButton
          label="Continue With Google"
          onClick={googleSignIn}
          style={{ marginTop: 20 }}
        />
      </Form>
    </Container>
  );
};

export default SignUpComponent;
