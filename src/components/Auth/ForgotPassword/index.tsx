import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";

import CustomButton from "components/ui/CustomButton";
import InputWithLabel from "components/ui/InputWithLabel";
import { Container, Form } from "./style";
import { ErrorLabel } from "../common/style";
import { AuthContext } from "context/auth/AuthProvider";

type ResetType = {
  email: string;
};

const ForgotPassword = () => {
  const history = useHistory();

  const { forgotPasswordContext } = useContext(AuthContext);

  const [error, setError] = useState("");

  const { handleSubmit, values, errors, handleChange, touched, handleBlur } =
    useFormik<ResetType>({
      initialValues: {
        email: "",
      },
      onSubmit: async (values: ResetType) => {
        try {
          await forgotPasswordContext(values.email);
        } catch (error) {
          setError(error);
        }
      },
      onReset: (values: ResetType) => {
        console.log(values);
      },
      validationSchema: Yup.object({
        email: Yup.string().email().required(),
      }),
    });

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <h1>Reset Password</h1>
        <ErrorLabel textAlign="center">{error}</ErrorLabel>
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
          label="Submit Email"
          type="submit"
          background={"#177BFF"}
        />
        <div className="flex">
          <p className="forgot-password">
            Go back to ?{" "}
            <span onClick={() => history.push("/auth/signin")}>Signin</span>
          </p>
        </div>
      </Form>
    </Container>
  );
};

export default ForgotPassword;
