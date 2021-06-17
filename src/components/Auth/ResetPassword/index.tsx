import React from "react";
import { useHistory, useLocation } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import queryString from "query-string";

import CustomButton from "components/ui/CustomButton";
import InputWithLabel from "components/ui/InputWithLabel";
import { Container, Form } from "./style";
import { ErrorLabel } from "../common/style";
import { onSubmitType } from "../SignIn";

export type ResetType = {
  password: string;
  password_confirmation: string;
  email: string;
  token: string;
};

type Props = {
  onSubmit: onSubmitType<ResetType>;
};

const ResetPassword: React.FC<Props> = ({ onSubmit }) => {
  const history = useHistory();
  const location = useLocation();

  const queryParams: any = queryString.parse(location.search);

  const validate = (values: Partial<ResetType>) => {
    const errors: Partial<ResetType> = {};

    if (values.password !== values.password_confirmation) {
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
  } = useFormik<ResetType>({
    initialValues: {
      password: "",
      password_confirmation: "",
      email: queryParams?.email,
      token: queryParams?.token,
    },
    onSubmit,
    validationSchema: Yup.object({
      email: Yup.string().email().required(),
      password: Yup.string().min(4).required(),
      password_confirmation: Yup.string().min(4).required(),
      token: Yup.string().required(),
    }),
    validate
  });

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <h1>Reset Password</h1>
        <ErrorLabel textAlign="center">
          {typeof errors === "string" ? errors : null}
        </ErrorLabel>
        <InputWithLabel
          placeholder="Password"
          label="Password"
          type="password"
          onChange={handleChange}
          onBlur={handleBlur}
          name="password"
          error={touched && errors.password}
          value={values.password}
          style={{
            marginBottom: 30,
          }}
        />
        <InputWithLabel
          placeholder="Confirm Password"
          label="Confirm Password"
          type="password"
          onChange={handleChange}
          onBlur={handleBlur}
          name="password_confirmation"
          error={touched && errors.password_confirmation}
          value={values.password_confirmation}
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

export default ResetPassword;
