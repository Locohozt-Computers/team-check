import { createAsyncThunk } from "@reduxjs/toolkit";
import { SigninUserType, SignupUserType } from "types/authTypes";
import { createHttp } from "utils/api/createHttp";

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
