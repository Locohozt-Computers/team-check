import React, { Dispatch, SetStateAction } from "react";
import { SigninUserType } from "types/authTypes";

type SetStateType<T> = Dispatch<SetStateAction<T>>;

const passwordLen = 4;

const passwordValidation = (
  password: string,
  error: SigninUserType,
  values: SigninUserType,
  setValues: SetStateType<SigninUserType>,
  setError: SetStateType<SigninUserType>
) => {
  if (!Boolean(password)) {
    setError({
      ...error,
      password: "Password field is required",
    });
  } else if (password.length < passwordLen) {
    setError({
      ...error,
      password: "Password must be more than 4 characters",
    });
  } else if (password.length > passwordLen) {
    setError({
      ...error,
      password: "",
    });
  }
  setValues({
    ...values,
    password,
  });
};

export default passwordValidation;
