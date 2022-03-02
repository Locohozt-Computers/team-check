import React from "react";
import { History } from "history";
import { FieldInputProps } from "formik";

// import AuthButton from "components/ui/AuthButton";
import CustomButton from "components/ui/CustomButton";
import InputWithLabel from "components/ui/InputWithLabel";
import { Container, Form } from "./style";
import { ErrorLabel } from "../common/style";

export type onSubmitActionType = {
  setSubmitting: (status: boolean) => void;
  setErrors: (message: any) => void;
};

type Props = {
  handleSubmit: (e?: React.FormEvent<HTMLFormElement> | undefined) => void;
  values: any;
  errors: any;
  handleChange: (e: React.ChangeEvent<HTMLInputElement> | undefined) => void;
  touched: any;
  handleBlur: (e: React.ChangeEvent<HTMLInputElement> | undefined) => void;
  isSubmitting: boolean;
  getFieldProps: (nameOrOptions: any) => FieldInputProps<any>;
  googleSignIn: () => Promise<void>;
  history: History;
};

export type onSubmitType<T> = (values: T, actions: onSubmitActionType) => void;

const AdminSignInComponent: React.FC<Props> = ({
  values,
  errors,
  touched,
  isSubmitting,
  history,
  getFieldProps,
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
        data-testid="sign-in-form"
      >
        <h1>Admin Sign In</h1>
        <ErrorLabel textAlign="center">
          {typeof errors === "string" ? errors : null}
        </ErrorLabel>
        <InputWithLabel
          placeholder="Enter Email"
          label="Email address"
          error={touched && errors.email}
          {...getFieldProps("email")}
          style={{
            marginBottom: 30,
          }}
        />
        <InputWithLabel
          placeholder="Enter Password"
          type="password"
          label="Password"
          error={touched && errors.password}
          onChange={handleChange}
          onBlur={handleBlur}
          name="password"
          value={values.password}
          isShowPassword={true}
          style={{
            marginBottom: 30,
          }}
        />
        <CustomButton
          testId="signin"
          label={"Submit"}
          type={"submit"}
          disabled={isSubmitting}
          background={isSubmitting ? "#f1f1f7" : "#177BFF"}
          loading={isSubmitting}
        />
        {/* <div className="flex">
          <p className="forgot-password">
            Are you new?{" "}
            <span onClick={() => history.push("/auth/signup")}>Signup</span>
          </p>
          <p className="forgot-password">
            Forgot{" "}
            <span onClick={() => history.push("/auth/forgotpassword")}>
              Password
            </span>
            ?
          </p>
        </div> */}
      </Form>
    </Container>
  );
};

export default AdminSignInComponent;
