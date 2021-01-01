import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import * as Yup from "yup";
import { useFormik } from "formik";

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
      />
    </div>
  );
};

export default SignUpPage;
