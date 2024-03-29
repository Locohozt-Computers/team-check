import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

import CustomButton from "components/ui/CustomButton";
import InputWithLabel from "components/ui/InputWithLabel";
import { Container, Form } from "./style";
import { ErrorLabel } from "../common/style";
import { onSubmitType } from "../SignIn";
import { ChangePasswordType } from "types/authTypes";

export type ResetType = {
  password: string;
  password_confirmation: string;
  email: string;
  token: string;
};

type Props = {
  onSubmit: onSubmitType<ChangePasswordType>;
};

const ChangePassword: React.FC<Props> = ({ onSubmit }) => {
  const validate = (values: Partial<ChangePasswordType>) => {
    const errors: Partial<ChangePasswordType> = {};

    // if (values.new_password !== values.password_confirmation) {
    //   errors.password_confirmation = "Password does not match";
    // }

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
  } = useFormik<ChangePasswordType>({
    initialValues: {
      new_password: "",
      current_password: "",
    },
    onSubmit,
    validationSchema: Yup.object({
      current_password: Yup.string().min(4).required(),
      new_password: Yup.string().min(4).required(),
    }),
    validate,
  });

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <h1>Change Password</h1>
        <ErrorLabel textAlign="center">
          {typeof errors === "string"
            ? errors
              ? errors
              : "Something went wrong"
            : null}
        </ErrorLabel>
        <InputWithLabel
          placeholder="Current Password"
          label="Current Password"
          type="password"
          onChange={handleChange}
          onBlur={handleBlur}
          name="current_password"
          error={touched && errors.current_password}
          value={values.current_password}
          isShowPassword={true}
          style={{
            marginBottom: 30,
          }}
        />
        <InputWithLabel
          placeholder="New Password"
          label="New Password"
          type="password"
          onChange={handleChange}
          onBlur={handleBlur}
          name="new_password"
          error={touched && errors.new_password}
          value={values.new_password}
          isShowPassword={true}
          style={{
            marginBottom: 30,
          }}
        />
        <CustomButton
          testId="change-password-btn"
          label={"Change Password"}
          type={"submit"}
          disabled={isSubmitting}
          background={isSubmitting ? "#f1f1f7" : "#177BFF"}
          loading={isSubmitting}
        />
      </Form>
    </Container>
  );
};

export default ChangePassword;
