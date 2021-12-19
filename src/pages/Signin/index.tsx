import { useContext } from "react";
import { useHistory } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";

import SignInComponent, { onSubmitActionType } from "components/Auth/SignIn";
import { AuthContext } from "context/auth/AuthProvider";
import { SigninUserType } from "types/authTypes";
import { errorNotify } from "utils/errorMessage";

const SignInPage = () => {
  const { signInUserContext, signInUserGoogleContext } =
    useContext(AuthContext);
  const history = useHistory();

  const onSubmit = async (
    values: SigninUserType,
    { setSubmitting, setErrors }: onSubmitActionType
  ) => {
    try {
      setSubmitting(true);
      await signInUserContext(values);
      window.location.href = "/home";
      setSubmitting(false);
    } catch (error) {
      setSubmitting(false);
      setErrors(error);
    }
  };

  const googleSignIn = async () => {
    try {
      await signInUserGoogleContext();
      // window.location.href = "/home";
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
