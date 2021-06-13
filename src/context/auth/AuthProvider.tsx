import React, { createContext, useReducer } from "react";
import {
  ChangePasswordType,
  SigninUserType,
  SignupUserType,
} from "types/authTypes";
import { createHttp } from "utils/api/createHttp";
import authReducer from "./Authreducer";

export type InitialStateTypes<T> = {
  user: T;
};

const initialState = {
  user: null,
};

export const SIGNIN = "SIGNIN";
export const SIGNUP = "SIGNUP";
export const FORGOT_PASSWORD = "FORGOT_PASSWORD";

export const AuthContext = createContext({
  user: null,
  signInUserContext: (user: SigninUserType) => {},
  signUpUserContext: (user: Partial<SignupUserType>) => {},
  forgotPasswordContext: (email: string) => {},
  changePasswordContext: (passwords: ChangePasswordType) => {},
});

const AuthProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const signInUserContext = async (user: SigninUserType) => {
    console.log(user);
    try {
        // const data = await createHttp("login", user);
        dispatch({ type: SIGNIN, payload: user });
    } catch (error) {
      console.log(error?.response);
      if(!error?.response) {
        // eslint-disable-next-line
        throw "Network went wrong!!!";
      }
      throw error?.response?.data?.message;
    }
  };

  const signUpUserContext = async (user: Partial<SignupUserType>) => {
    console.log(user);
    try {
      // const data = await createHttp('/register', user)
    //   dispatch({ type: SIGNUP, payload: data });
    } catch (error) {
      throw error;
    }
  };

  const forgotPasswordContext = async (email: string) => {
    try {
    //   const data = await createHttp("/forgotpassword", email);
    //   dispatch({ type: FORGOT_PASSWORD, payload: data });
    } catch (error) {
      throw error;
    }
  };

  const changePasswordContext = async (passwords: ChangePasswordType) => {
    try {
      const data = await createHttp("/changepassword", passwords);
      dispatch({ type: FORGOT_PASSWORD, payload: data });
    } catch (error) {
      throw error;
    }
  };

  const values = {
    user: state?.user,
    signInUserContext,
    signUpUserContext,
    forgotPasswordContext,
    changePasswordContext,
  };
  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
