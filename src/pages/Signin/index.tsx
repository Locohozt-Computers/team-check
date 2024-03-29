import React from "react";
import { useHistory } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";

import SignInComponent, { onSubmitActionType } from "components/Auth/SignIn";
import { SIGNIN, useAuth } from "context/auth/AuthProvider";
import { SigninUserType } from "types/authTypes";
import { errorNotify } from "utils/errorMessage";
import { signInWithGoogle } from "firebase/firebase";
import { googleResponse } from "utils/googleResponse";
import { useDispatch } from "react-redux";
import { AppDispatch } from "redux/store";
import { signInUserAction } from "redux/slices/authSlice/action";
import { callbackHandler } from "utils/callback";

const SignInPage = () => {
  const { dispatch: contextDispatch } = useAuth();
  const history = useHistory();

  const dispatch = useDispatch<AppDispatch>();

  const callback = (response: any) =>
    callbackHandler(response, { reload: "/home" });

  const onSubmit = async (
    values: SigninUserType,
    { setSubmitting, setErrors }: onSubmitActionType
  ) => {
    try {
      setSubmitting(true);
      await dispatch(signInUserAction({ user: values, cb: callback }));
      setSubmitting(false);
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
      console.log(error);
      errorNotify("Something went wrong, try again");
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
    getFieldProps,
  } = useFormik<SigninUserType>({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit,
    validationSchema: Yup.object({
      email: Yup.string().email().required(),
      password: Yup.string()
        .min(4, "Password must be more than 4 characters")
        .required(),
    }),
  });

  return (
    <div>
      <SignInComponent
        values={values}
        errors={errors}
        touched={touched}
        history={history}
        isSubmitting={isSubmitting}
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        handleBlur={handleBlur}
        getFieldProps={getFieldProps}
        googleSignIn={googleSignIn}
      />
    </div>
  );
};

export default SignInPage;
