import React from "react";
import { useHistory } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";

import ForgotPassword, { ResetType } from "components/Auth/ForgotPassword";
import { onSubmitActionType } from "components/Auth/SignIn";
import { useAppDispatch } from "redux/store";
import { forgotPasswordAction } from "redux/slices/authSlice/action";
import { callbackHandler } from "utils/callback";

const ForgotPasswordPage: React.FC = () => {
  const history = useHistory();

  const dispatch = useAppDispatch();

  const callback = (data: any, ...rest: any) =>
    callbackHandler(data, { path: "/auth/emailverification", history });

  const onSubmit = async (
    values: { email: string },
    { setSubmitting, setErrors }: onSubmitActionType
  ) => {
    try {
      setSubmitting(true);
      await dispatch(
        forgotPasswordAction({ email: values.email, cb: callback })
      );
      setSubmitting(false);
    } catch (error) {
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
