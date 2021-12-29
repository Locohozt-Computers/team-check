import { createAsyncThunk } from "@reduxjs/toolkit";
import { ResetType } from "components/Auth/ResetPassword";
import {
  ChangePasswordType,
  SigninUserType,
  SignupUserType,
} from "types/authTypes";
import { createHttp, getHttp, updateHttp } from "utils/api/createHttp";
import { authErrorHandler, logoutUnauthorizeUser } from "utils/CatchErrors";
import { errorNotify, successNotify } from "utils/errorMessage";

export const NETWORK_ERROR_MESSAGE = "Network went wrong!!!";
export const SUCCESS = "SUCCESS";
export const ERROR = "ERROR";

export const signInUserAction = createAsyncThunk(
  "signin",
  async (payload: { user: SigninUserType; cb: <T>(arg: T) => void }) => {
    const { user, cb } = payload;
    try {
      const data = await createHttp("/login", user);
      localStorage.setItem("techCheckPoint", JSON.stringify({ ...data }));
      cb({ status: SUCCESS, data });
      return data;
    } catch (error: any) {
      if (!error?.response) {
        cb({ status: "error", error: "Network went wrong!!!" });
        return NETWORK_ERROR_MESSAGE;
      }
      cb({ status: "error", error });
      return error;
    }
  }
);

export const signUpUserAction = createAsyncThunk(
  "signup",
  async (payload: {
    user: Partial<SignupUserType>;
    cb: <T>(arg: T) => void;
  }) => {
    const { user, cb } = payload;
    try {
      const data = await createHttp("/register", user);
      return data;
    } catch (error: any) {
      if (!error?.response) {
        cb({ status: "error", error: "Network went wrong!!!" });
        return NETWORK_ERROR_MESSAGE;
      }
      cb({ status: "error", error });
      return error;
    }
  }
);

export const resetPasswordAction = createAsyncThunk(
  "resetPassword",
  async (reset: ResetType) => {
    try {
      const data = await createHttp("/password/reset", reset);
      return data;
    } catch (error: any) {
      if (!error?.response) {
        // eslint-disable-next-line
        return "Network went wrong!!!";
      }
      return error?.response?.data?.message;
    }
  }
);

export const forgotPasswordAction = createAsyncThunk(
  "forgotPassword",
  async (payload: { email: string; cb: (arg: any) => void }) => {
    const { email, cb } = payload;
    try {
      const data = await createHttp("/password/email", { email });
      cb({ status: SUCCESS, data });
      return data;
    } catch (error: any) {
      if (!error?.response) {
        // eslint-disable-next-line
        cb({ status: "error", error: "Network went wrong!!!" });
        return "Network went wrong!!!";
      }
      cb({ status: "error", error });
      return error?.response?.data?.message;
    }
  }
);

export const changePasswordAction = createAsyncThunk(
  "changePassword",
  async (passwords: ChangePasswordType) => {
    try {
      const data = await createHttp("/change-password", passwords);
      successNotify("Password changed");
      return data;
    } catch (error: any) {
      if (!error?.response) {
        // eslint-disable-next-line
        errorNotify("Network went wrong!!!");
        return "Network went wrong!!!";
      }
      authErrorHandler(error);
      return error?.response?.data?.message;
    }
  }
);

export const getProfileAction = createAsyncThunk(
  "getProfile",
  async (profile_id: string) => {
    try {
      const data = await getHttp(`/profile/${profile_id}`);
      return data;
    } catch (error: any) {
      logoutUnauthorizeUser(error?.response?.data?.status_code);
    }
  }
);

export const updateProfileAction = createAsyncThunk(
  "updateProfile",
  async (profileObj: any) => {
    try {
      await updateHttp(
        `/profile/${profileObj?.profileId}`,
        profileObj?.profile
      );
    } catch (error: any) {
      if (!error?.response) {
        // eslint-disable-next-line
        errorNotify("Network went wrong!!!");
        return "Network went wrong!!!";
      }
      authErrorHandler(error);
      return error?.response?.data?.message;
    }
  }
);
