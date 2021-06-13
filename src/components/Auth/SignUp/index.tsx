import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import * as Yup from "yup";
import { useFormik } from "formik";

import CustomButton from "components/ui/CustomButton";
import InputWithLabel from "components/ui/InputWithLabel";
import { Container, Form } from "./style";
import AuthButton from "components/ui/AuthButton";
import CustomSwitch from "components/ui/Switch";
import { AuthContext } from "context/auth/AuthProvider";
import { SignupUserType } from "types/authTypes";
import { ErrorLabel } from "../common/style";

const SignUpComponent = () => {
  const history = useHistory();
  const { signUpUserContext } = useContext(AuthContext);

  const [isAgent, setIsAgent] = useState(false);
  const [role, setRole] = useState(2);
  const [error, setError] = useState("");

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

  const { handleSubmit, values, errors, handleChange, touched, handleBlur } =
    useFormik<SignupUserType>({
      initialValues: {
        username: "",
        email: "",
        password: "",
        password_confirmation: "",
        referral_id: "",
        ip_address: "",
        role_id: 2,
      },
      onSubmit: async (values: SignupUserType) => {
        const finalValues = {
          ...values,
          role_id: role,
        };
        try {
          await signUpUserContext(finalValues);
          history.push("/home");
        } catch (error) {
          setError(error);
        }
      },
      onReset: (values: SignupUserType) => {
        console.log(values);
      },
      validate,
      validationSchema: Yup.object({
        username: Yup.string()
          .trim()
          .max(4, "Username should be more than 4 characters")
          .required(),
        email: Yup.string().email("Email should be valid").required(),
        password: Yup.string()
          .min(4, "Password must be more than 4 characters")
          .required(),
      }),
    });

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <h1>Sign Up</h1>
        <ErrorLabel textAlign="center">{error}</ErrorLabel>
        <InputWithLabel
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
        />
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
        <CustomSwitch
          checked={isAgent}
          onChange={(checked: boolean) => {
            setRole(checked ? 3 : 2);
            setIsAgent(checked);
          }}
          label={isAgent ? "Agent" : "User"}
          style={{ marginBottom: 30 }}
        />
        <CustomButton label="Submit" type="submit" background={"#177BFF"} />
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
