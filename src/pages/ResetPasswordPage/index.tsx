import React from "react";
import { useHistory } from "react-router-dom";
import ResetPassword, { ResetType } from "components/Auth/ResetPassword";
import { onSubmitActionType } from "components/Auth/SignIn";
import { useAuth } from "context/auth/AuthProvider";
import { errorNotify } from "utils/errorMessage";

const ResetPasswordPage = () => {
  const { resetPasswordContext } = useAuth();
  const history = useHistory();

  const onSubmit = async (
    values: ResetType,
    { setSubmitting, setErrors }: onSubmitActionType
  ) => {
    try {
      setSubmitting(true);
      await resetPasswordContext(values);
      history.push("/auth/signin");
      setSubmitting(false);
    } catch (error) {
      errorNotify("something went wrong, try again");
      setSubmitting(false);
      setErrors(error);
    }
  };

  return (
    <div>
      <ResetPassword onSubmit={onSubmit} />
    </div>
  );
};

export default ResetPasswordPage;
