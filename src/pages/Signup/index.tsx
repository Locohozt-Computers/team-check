import React, { useContext } from "react";
import { useHistory } from "react-router-dom";

import SignUpComponent from "components/Auth/SignUp";
import { AuthContext } from "context/auth/AuthProvider";
import { SignupUserType } from "types/authTypes";
import { getRole } from "components/helpers/getRole";
import { onSubmitActionType } from "components/Auth/SignIn";

const SignUpPage = () => {
  const { signUpUserContext } = useContext(AuthContext);
  const history = useHistory();

  const onSubmit = async (
    values: SignupUserType,
    { setSubmitting, setErrors }: onSubmitActionType
  ) => {
    const role = getRole(values.role_id);

    if (role === -1) {
      setErrors("Please choose just one user type");
      return;
    }

    const finalValues = {
      ...values,
      role_id: role,
    };

    try {
      setSubmitting(true);
      await signUpUserContext(finalValues);
      setSubmitting(false);
      history.push("/auth/emailverification");
    } catch (error) {
      setSubmitting(false);
      setErrors(error);
    }
  };
  return (
    <div>
      <SignUpComponent onSubmit={onSubmit} />
    </div>
  );
};

export default SignUpPage;
