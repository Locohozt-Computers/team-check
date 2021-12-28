import React from "react";
import { useHistory } from "react-router-dom";
import * as Yup from "yup";
import { useFormik } from "formik";

import SignUpComponent from "components/Auth/SignUp";
import { SIGNIN, useAuth } from "context/auth/AuthProvider";
import { SignupUserType } from "types/authTypes";
import { getRole } from "components/helpers/getRole";
import { onSubmitActionType } from "components/Auth/SignIn";
import { signInWithGoogle } from "firebase/firebase";
import { googleResponse } from "utils/googleResponse";
import { authErrorHandler } from "utils/CatchErrors";
import { useDispatch } from "react-redux";
import { AppDispatch } from "redux/store";
import { signUpUserAction } from "redux/slices/authSlice/action";

const SignUpPage = () => {
  const { dispatch: contextDispatch } = useAuth();
  const history = useHistory();

  const dispatch = useDispatch<AppDispatch>();

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
      await dispatch(signUpUserAction(finalValues));
      setSubmitting(false);
      history.push("/auth/emailverification");
    } catch (error) {
      setSubmitting(false);
      setErrors(error);
    }
  };

  const googleSignIn = async () => {
    try {
      const response = await signInWithGoogle();
      localStorage.setItem(
        "techCheckPoint",
        JSON.stringify({ ...googleResponse(response).user })
      );
      contextDispatch({ type: SIGNIN, payload: googleResponse(response) });
      window.location.href = "/home";
    } catch (error: any) {
      authErrorHandler(error);
    }
  };

  const validate = (values: Partial<SignupUserType>) => {
    const errors: Partial<SignupUserType> = {};

    if (!values.email) {
      errors.email = "Required";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
    ) {
      errors.email = "Invalid email address";
    } else if (values.password !== values.password_confirmation) {
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
  } = useFormik<SignupUserType>({
    initialValues: {
      email: "",
      password: "",
      password_confirmation: "",
      referral_id: "",
      ip_address: "",
      role_id: 3,
    },
    onSubmit,
    validate,
    validationSchema: Yup.object({
      email: Yup.string().email("Email should be valid").required(),
      password: Yup.string()
        .min(4, "Password must be more than 4 characters")
        .required(),
    }),
  });

  return (
    <div>
      <SignUpComponent
        values={values}
        errors={errors}
        touched={touched}
        history={history}
        isSubmitting={isSubmitting}
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        handleBlur={handleBlur}
        googleSignIn={googleSignIn}
      />
    </div>
  );
};

export default SignUpPage;
