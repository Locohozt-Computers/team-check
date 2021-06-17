import React, { useContext } from "react";
import { useHistory } from "react-router-dom";

import ForgotPassword from "components/Auth/ForgotPassword";
import { onSubmitActionType } from "components/Auth/SignIn";
import { AuthContext } from "context/auth/AuthProvider";

const ForgotPasswordPage: React.FC = () => {
  const { forgotPasswordContext } = useContext(AuthContext);
  const history = useHistory();

  const onSubmit = async (
    values: {email: string},
    { setSubmitting, setErrors }: onSubmitActionType
  ) => {
    try {
      setSubmitting(true);
      await forgotPasswordContext(values.email);
      history.push("/auth//signin");
      setSubmitting(false);
    } catch (error) {
      setSubmitting(false);
      setErrors(error);
    }
  };

  return (
    <div>
      <ForgotPassword onSubmit={onSubmit} />
    </div>
  );
};

export default ForgotPasswordPage;
