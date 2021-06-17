import React from "react";
import { useHistory } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";

import AuthButton from "components/ui/AuthButton";
import CustomButton from "components/ui/CustomButton";
import InputWithLabel from "components/ui/InputWithLabel";
import { Container, Form } from "./style";
// import { AuthContext } from "context/auth/AuthProvider";
import { SigninUserType } from "types/authTypes";
import { ErrorLabel } from "../common/style";

export type onSubmitActionType = {
  setSubmitting: (status: boolean) => void;
  setErrors: (message: any) => void;
}

export type onSubmitType<T> = (
  values: T,
  actions: onSubmitActionType
) => void;

const SignInComponent: React.FC<{
  onSubmit: onSubmitType<SigninUserType>
}> = ({ onSubmit }) => {
  // const { signInUserContext } = useContext(AuthContext);
  const history = useHistory();

  const {
    handleSubmit,
    values,
    errors,
    handleChange,
    touched,
    handleBlur,
    isSubmitting,
    getFieldProps,
  } = useFormik<SigninUserType>({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit,
    validationSchema: Yup.object({
      email: Yup.string().email().required(),
      password: Yup.string()
        .min(4, "Password must be more than 4 characters")
        .required(),
    }),
  });

  return (
    <Container>
      <Form onSubmit={handleSubmit} data-testid="sign-in-form">
        <h1>Sign In</h1>
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
        <div className="flex">
          <p className="forgot-password">
            Are you new?{" "}
            <span onClick={() => history.push("/auth/signup")}>Signup</span>
          </p>
          <p className="forgot-password">
            Forgot{" "}
            <span onClick={() => history.push("/auth/resetpassword")}>
              Password
            </span>
            ?
          </p>
        </div>
        <AuthButton
          label="Continue With Google"
          onClick={() => {}}
          style={{ marginTop: 20 }}
        />
      </Form>
    </Container>
  );
};

export default SignInComponent;
