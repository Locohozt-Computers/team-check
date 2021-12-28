import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "redux/store";
import { UserType } from "types/authTypes";
import { errorNotify } from "utils/errorMessage";
import {
  getProfileAction,
  NETWORK_ERROR_MESSAGE,
  signInUserAction,
} from "./action";

export type UserInitialState<T> = {
  user: T;
  profile: UserType | null;
};

const initialState: UserInitialState<any> = {
  user: null,
  profile: null,
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
      });
  },
});

// Action creators are generated for each case reducer function
// export const {} = authSlice.actions;

export const authSelector = ({ auth }: RootState) => auth;

export default authSlice.reducer;
