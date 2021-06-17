import React, { createContext, useReducer } from "react";
import {
  ChangePasswordType,
  SigninUserType,
  SignupUserType,
} from "types/authTypes";
import { createHttp } from "utils/api/createHttp";
import authReducer from "./Authreducer";

let user: any = localStorage.getItem("techCheckPoint");
user = JSON.parse(user);

export type InitialStateTypes<T> = {
  user: T;
};

const initialState = {
  user,
};

export const SIGNIN = "SIGNIN";
export const SIGNUP = "SIGNUP";
export const FORGOT_PASSWORD = "FORGOT_PASSWORD";
export const CHANGE_PASSWORD = "CHANGE_PASSWORD";
export const RESET_PASSWORD = "RESET_PASSWORD";

type ContextType = {
  user: Partial<SignupUserType>;
  signInUserContext: (user: SigninUserType) => void;
  signUpUserContext: (user: Partial<SignupUserType>) => void;
  forgotPasswordContext: (email: string) => void;
  changePasswordContext: (passwords: ChangePasswordType) => void;
  resetPasswordContext: (email: string) => void;
};

export const AuthContext = createContext<ContextType>({
  user,
  signInUserContext: (user: SigninUserType) => {},
  signUpUserContext: (user: Partial<SignupUserType>) => {},
  forgotPasswordContext: (email: string) => {},
  changePasswordContext: (passwords: ChangePasswordType) => {},
  resetPasswordContext: (email: string) => {},
});

const AuthProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const signInUserContext = async (user: SigninUserType) => {
    try {
      const data = await createHttp("/login", user);
      localStorage.setItem("techCheckPoint", JSON.stringify({ ...data }));
      dispatch({ type: SIGNIN, payload: data });
    } catch (error) {
      if (!error?.response) {
        // eslint-disable-next-line
        throw "Network went wrong!!!";
      }
      throw error?.response?.data?.message;
    }
  };

  const signUpUserContext = async (user: Partial<SignupUserType>) => {
    try {
      const data = await createHttp("/register", user);
      dispatch({ type: SIGNUP, payload: data });
    } catch (error) {
      if (!error?.response) {
        // eslint-disable-next-line
        throw "Network went wrong!!!";
      }
      throw error?.response?.data?.message;
    }
  };

  const resetPasswordContext = async (email: string) => {
    try {
      const data = await createHttp("/password/reset", email);
      dispatch({ type: RESET_PASSWORD, payload: data });
    } catch (error) {
      if (!error?.response) {
        // eslint-disable-next-line
        throw "Network went wrong!!!";
      }
      throw error?.response?.data?.message;
    }
  };

  const forgotPasswordContext = async (email: string) => {
    try {
      const data = await createHttp("/password/email", { email });
      dispatch({ type: FORGOT_PASSWORD, payload: data });
    } catch (error) {
      if (!error?.response) {
        // eslint-disable-next-line
        throw "Network went wrong!!!";
      }
      throw error?.response?.data?.message;
    }
  };

  const changePasswordContext = async (passwords: ChangePasswordType) => {
    try {
      const data = await createHttp("/password/changepassword", passwords);
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
    resetPasswordContext,
  };
  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
