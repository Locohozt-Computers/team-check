import { SUCCESS } from "redux/slices/authSlice/action";
import { authErrorHandler } from "./CatchErrors";
import { successNotify } from "./errorMessage";

export const callbackHandler = (data: any, rest?: any) => {
  const { status, error } = data;
  const { path, history, reload, successMessage } = rest;
  if (status === SUCCESS) {
    if (successMessage) {
      successNotify(successMessage);
    }
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
