import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "redux/store";
import { UserType } from "types/authTypes";
import { errorNotify } from "utils/errorMessage";
import {
  forgotPasswordAction,
  getProfileAction,
  NETWORK_ERROR_MESSAGE,
  signInUserAction,
} from "./action";

export type UserInitialState<T> = {
  user: T;
  profile: UserType | null;
  forgotPasswordError: null | string | unknown;
};

const initialState: UserInitialState<any> = {
  user: null,
  profile: null,
  forgotPasswordError: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(signInUserAction.fulfilled, (state, { payload }) => {
        state.user = payload;
      })
      .addCase(signInUserAction.rejected, (_state, { payload }: any) => {
        if (payload === NETWORK_ERROR_MESSAGE) {
          return errorNotify(NETWORK_ERROR_MESSAGE);
        }
        errorNotify(payload);
      })
      .addCase(getProfileAction.fulfilled, (state, { payload }) => {
        state.profile = payload;
      })
      .addCase(forgotPasswordAction.rejected, (state, { payload }) => {
        console.log(JSON.stringify(payload, null, 2));
        state.forgotPasswordError = payload;
      });
  },
});

export const authSelector = ({
  auth: { profile, user, forgotPasswordError },
}: RootState) => ({
  profile,
  user,
  forgotPasswordError,
});

export default authSlice.reducer;
