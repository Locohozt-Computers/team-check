import { SUCCESS } from "redux/slices/authSlice/action";
import { authErrorHandler } from "./CatchErrors";

export const callbackHandler = (data: any, rest: any) => {
  const { status, error } = data;
  const { path, history, reload } = rest;
  if (status === SUCCESS) {
    if (path) {
      history.push(path);
    }
    if (reload) {
      window.location.href = reload;
    }
    return;
  }
  authErrorHandler(error);
};
