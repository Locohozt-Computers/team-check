import React, { FC } from "react";
import { useHistory } from "react-router-dom";
import * as Yup from "yup";
import { useFormik } from "formik";
import { Checkbox } from "pretty-checkbox-react";

import CustomButton from "components/ui/CustomButton";
import InputWithLabel from "components/ui/InputWithLabel";
import { Container, Form, UserAgent } from "./style";
import AuthButton from "components/ui/AuthButton";
import { SignupUserType } from "types/authTypes";
import { ErrorLabel } from "../common/style";
import { onSubmitType } from "../SignIn";

type Props = {
  onSubmit: onSubmitType<SignupUserType>;
};

const SignUpComponent: FC<Props> = ({ onSubmit }) => {
  const history = useHistory();

  const validate = (values: Partial<SignupUserType>) => {
    const errors: Partial<SignupUserType> = {};

    if (!values.email) {
      errors.email = "Required";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
    ) {
      errors.email = "Invalid email address";
    } else if (values.password !== values.password_confirmation) {
      errors.password_confirmation = "Password does not match";
    }

    return errors;
  };

  const {
    handleSubmit,
    values,
    errors,
    handleChange,
    touched,
    handleBlur,
    isSubmitting,
  } = useFormik<SignupUserType>({
    initialValues: {
      username: "",
      email: "",
      password: "",
      password_confirmation: "",
      referral_id: "",
      ip_address: "",
      role_id: 3,
    },
    onSubmit,
    validate,
    validationSchema: Yup.object({
      username: Yup.string()
        .trim()
        .min(4, "Username should be more than 4 characters")
        .required(),
      email: Yup.string().email("Email should be valid").required(),
      password: Yup.string()
        .min(4, "Password must be more than 4 characters")
        .required(),
    }),
  });

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
        {/* <InputWithLabel
          placeholder="Enter Username"
          label="Username"
          name="username"
          type="text"
          error={touched && errors.username}
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.username}
          style={{
            marginBottom: 30,
          }}
        /> */}
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
          onClick={() => {}}
          style={{ marginTop: 20 }}
        />
      </Form>
    </Container>
  );
};

export default SignUpComponent;
