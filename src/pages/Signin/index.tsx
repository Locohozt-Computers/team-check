import { useContext } from "react";
import { useHistory } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";

import SignInComponent, { onSubmitActionType } from "components/Auth/SignIn";
import { AuthContext } from "context/auth/AuthProvider";
import { SigninUserType } from "types/authTypes";

const SignInPage = () => {
  const { signInUserContext } = useContext(AuthContext);
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
      />
    </div>
  );
};

export default SignInPage;
