import { error } from "console";
import React, { Dispatch, SetStateAction } from "react";
import { SigninUserType } from "types/authTypes";

type SetStateType<T> = Dispatch<SetStateAction<T>>;

const emailValidation = (
  email: string,
  error: SigninUserType,
  values: SigninUserType,
  setValues: SetStateType<SigninUserType>,
  setError: SetStateType<SigninUserType>
) => {
  if (!email) {
    setError({
      ...error,
      email: "Email field is required"
    });
  } else if (email.includes("@")) {
    setError({
      ...error,
      email: ""
    });
  } else if (email !== "@") {
    setError({
      ...error,
      email: "Email is not valid"
    });
  }
  setValues({
    ...values,
    email,
  });
};

export default emailValidation;
