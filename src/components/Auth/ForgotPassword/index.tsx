import React from "react";
import { useHistory } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";

import CustomButton from "components/ui/CustomButton";
import InputWithLabel from "components/ui/InputWithLabel";
import { Container, Form } from "./style";
import { ErrorLabel } from "../common/style";
import { onSubmitType } from "../SignIn";

type ResetType = {
  email: string;
};

type Props = {
  onSubmit: onSubmitType<{ email: string }>;
};

const ForgotPassword: React.FC<Props> = ({ onSubmit }) => {
  const history = useHistory();

  const { handleSubmit, values, errors, handleChange, touched, handleBlur, isSubmitting } =
    useFormik<ResetType>({
      initialValues: {
        email: "",
      },
      onSubmit,
      validationSchema: Yup.object({
        email: Yup.string().email().required(),
      }),
    });

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <h1>Reset Password</h1>
        <ErrorLabel textAlign="center">{typeof errors === "string" ? errors : null}</ErrorLabel>
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
            Go back to ?{" "}
            <span onClick={() => history.push("/auth/signin")}>Signin</span>
          </p>
        </div>
      </Form>
    </Container>
  );
};

export default ForgotPassword;
