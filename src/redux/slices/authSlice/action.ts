import { createAsyncThunk } from "@reduxjs/toolkit";
import { ResetType } from "components/Auth/ResetPassword";
import {
  ChangePasswordType,
  SigninUserType,
  SignupUserType,
} from "types/authTypes";
import { createHttp, getHttp, updateHttp } from "utils/api/createHttp";
import { logoutUnauthorizeUser } from "utils/CatchErrors";

export const NETWORK_ERROR_MESSAGE = "Network went wrong!!!";

export const signInUserAction = createAsyncThunk(
  "signin",
  async (user: SigninUserType) => {
    try {
      const data = await createHttp("/login", user);
      localStorage.setItem("techCheckPoint", JSON.stringify({ ...data }));
      return data;
    } catch (error: any) {
      if (!error?.response) {
        return NETWORK_ERROR_MESSAGE;
      }
      return error;
    }
  }
);

export const signUpUserAction = createAsyncThunk(
  "signup",
  async (user: Partial<SignupUserType>) => {
    try {
      const data = await createHttp("/register", user);
      return data;
    } catch (error: any) {
      if (!error?.response) {
        return NETWORK_ERROR_MESSAGE;
      }
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
  async (email: string) => {
    try {
      const data = await createHttp("/password/email", { email });
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

export const changePasswordAction = createAsyncThunk(
  "changePassword",
  async (passwords: ChangePasswordType) => {
    try {
      const data = await createHttp("/change-password", passwords);
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
        `/profile/${profileObj?.profile_id}`,
        profileObj?.profile
      );
    } catch (error: any) {
      if (!error?.response) {
        // eslint-disable-next-line
        return "Network went wrong!!!";
      }
      return error?.response?.data?.message;
    }
  }
);
