import ResetPassword, { ResetType } from "components/Auth/ResetPassword";
import { onSubmitActionType } from "components/Auth/SignIn";
import { AuthContext } from "context/auth/AuthProvider";
import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { errorNotify } from "utils/errorMessage";

const ResetPasswordPage = () => {
  const { resetPasswordContext } = useContext(AuthContext);
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
