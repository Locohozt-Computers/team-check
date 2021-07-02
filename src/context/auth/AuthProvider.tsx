import { ResetType } from "components/Auth/ResetPassword";
import React, { createContext, useEffect, useReducer } from "react";
import {
  ChangePasswordType,
  SigninUserType,
  SignupUserType,
  UserType,
} from "types/authTypes";
import { createHttp, getHttp } from "utils/api/createHttp";
import { authErrorHandler } from "utils/CatchErrors";
import { errorNotify } from "utils/errorMessage";
import authReducer from "./Authreducer";

let user: any = localStorage.getItem("techCheckPoint");
user = JSON.parse(user);

export type InitialStateTypes<T> = {
  user: T;
  profile: UserType;
};

const initialState = {
  user,
  profile: null,
};

export const SIGNIN = "SIGNIN";
export const SIGNUP = "SIGNUP";
export const FORGOT_PASSWORD = "FORGOT_PASSWORD";
export const CHANGE_PASSWORD = "CHANGE_PASSWORD";
export const RESET_PASSWORD = "RESET_PASSWORD";
export const GET_PROFILE = "GET_PROFILE";

type ContextType = {
  user: Partial<SignupUserType>;
  profile: UserType | null;
  signInUserContext: (user: SigninUserType) => void;
  signUpUserContext: (user: Partial<SignupUserType>) => void;
  forgotPasswordContext: (email: string) => void;
  changePasswordContext: (passwords: ChangePasswordType) => void;
  resetPasswordContext: (reset: ResetType) => void;
  getProfile: (profile_id: string) => void;
};

export const AuthContext = createContext<ContextType>({
  user,
  profile: null,
  signInUserContext: (user: SigninUserType) => {},
  signUpUserContext: (user: Partial<SignupUserType>) => {},
  forgotPasswordContext: (email: string) => {},
  changePasswordContext: (passwords: ChangePasswordType) => {},
  resetPasswordContext: (reset: ResetType) => {},
  getProfile: (profile_id: string) => {},
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
        errorNotify("Network went wrong!!!");
      }
      authErrorHandler(error);
    }
  };

  const signUpUserContext = async (user: Partial<SignupUserType>) => {
    try {
      const data = await createHttp("/register", user);
      dispatch({ type: SIGNUP, payload: data });
    } catch (error) {
      if (!error?.response) {
        errorNotify("Network went wrong!!!");

        // eslint-disable-next-line
        throw "";
      }
      authErrorHandler(error);

      // eslint-disable-next-line
      throw "";
    }
  };

  const resetPasswordContext = async (reset: ResetType) => {
    try {
      const data = await createHttp("/password/reset", reset);
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
      const data = await createHttp("/change-password", passwords);
      dispatch({ type: FORGOT_PASSWORD, payload: data });
    } catch (error) {
      if (!error?.response) {
        // eslint-disable-next-line
        throw "Network went wrong!!!";
      }
      throw error?.response?.data?.message;
    }
  };

  const getProfile = async (profile_id: string) => {
    try {
      const data = await getHttp(`/profile/${profile_id}`);
      dispatch({ type: GET_PROFILE, payload: data });
    } catch (error) {
      if (!error?.response) {
        // eslint-disable-next-line
        throw "Network went wrong!!!";
      }
      throw error?.response?.data?.message;
    }
  };

  useEffect(() => {
    getProfile(user?.profile_id);

    // eslint-disable-next-line
  }, []);

  const values = {
    user: state?.user,
    profile: state.profile,
    signInUserContext,
    signUpUserContext,
    forgotPasswordContext,
    changePasswordContext,
    resetPasswordContext,
    getProfile,
  };
  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
