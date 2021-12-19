import React from "react";
import { useHistory } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";

import ForgotPassword, { ResetType } from "components/Auth/ForgotPassword";
import { onSubmitActionType } from "components/Auth/SignIn";
import { useAuth } from "context/auth/AuthProvider";
import { errorNotify } from "utils/errorMessage";

const ForgotPasswordPage: React.FC = () => {
  const { forgotPasswordContext } = useAuth();
  const history = useHistory();

  const onSubmit = async (
    values: { email: string },
    { setSubmitting, setErrors }: onSubmitActionType
  ) => {
    try {
      setSubmitting(true);
      await forgotPasswordContext(values.email);
      history.push("/auth/emailverification");
      setSubmitting(false);
    } catch (error) {
      errorNotify("something went wrong, try again");
      setSubmitting(false);
      setErrors(error);
    }
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
      email: "",
    },
    onSubmit,
    validationSchema: Yup.object({
      email: Yup.string().email().required(),
    }),
  });

  return (
    <div>
      <ForgotPassword
        values={values}
        errors={errors}
        touched={touched}
        history={history}
        isSubmitting={isSubmitting}
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        handleBlur={handleBlur}
      />
    </div>
  );
};

export default ForgotPasswordPage;
