import _ from "lodash";
import { errorNotify } from "./errorMessage";

export const ErrorHandler = <T>(err: T | any) => {
  errorNotify(
    err?.response?.data?.message || "Something went wrong, try again"
  );
};
export const ErrorHandlerGet = <T>(err: T | any) => {
  return err?.response?.data?.error;
};
export const CatchErrors = <T>(err: T | any) => {
  const error = err.toString().split(":")[1]?.trim();

  if (err?.response?.data?.errors) {
    _.forOwn(err?.response?.data?.errors, (value, key) => {
      errorNotify(value[0]);
    });
    return;
  } else {
    switch (error) {
      case "Network Error":
        return;

      default:
        errorNotify("Something went wrong");
        return;
    }
  }
};

export const authErrorHandler = <T>(error: T | any) => {
  const isErrorsEmpty = _.isEmpty(error?.response?.data?.errors);

  if (isErrorsEmpty) {
    errorNotify(error?.response?.data?.message);
  } else {
    const errorsName = Object.keys(error?.response?.data?.errors);

    if (errorsName.includes("name")) {
      errorNotify(error?.response?.data?.errors?.name[0]);
      return;
    }
    if (errorsName.includes("battery")) {
      errorNotify(error?.response?.data?.errors?.battery[0]);
      return;
    }
    if (errorsName.includes("brand_id")) {
      errorNotify(error?.response?.data?.errors?.brand_id[0]);
      return;
    }
    if (errorsName.includes("card_slot")) {
      errorNotify(error?.response?.data?.errors?.card_slot[0]);
      return;
    }
    if (errorsName.includes("sim")) {
      errorNotify(error?.response?.data?.errors?.sim[0]);
      return;
    }
    if (errorsName.includes("resolution")) {
      errorNotify(error?.response?.data?.errors?.resolution[0]);
      return;
    }
    if (errorsName.includes("selfie_camera")) {
      errorNotify(error?.response?.data?.errors?.selfie_camera[0]);
      return;
    }
    if (errorsName.includes("main_camera")) {
      errorNotify(error?.response?.data?.errors?.main_camera[0]);
      return;
    }
    if (errorsName.includes("storage")) {
      errorNotify(error?.response?.data?.errors?.storage[0]);
      return;
    }
    if (errorsName.includes("display_type")) {
      errorNotify(error?.response?.data?.errors?.display_type[0]);
      return;
    }
    if (errorsName.includes("warranty_fee")) {
      errorNotify(error?.response?.data?.errors?.warranty_fee[0]);
      return;
    }
    if (errorsName.includes("operating_system")) {
      errorNotify(error?.response?.data?.errors?.operating_system[0]);
      return;
    }
    if (errorsName.includes("username")) {
      errorNotify(error?.response?.data?.errors?.username[0]);
      return;
    }
    if (errorsName.includes("email")) {
      errorNotify(error?.response?.data?.errors?.email[0]);
      return;
    }
    if (errorsName.includes("current_password")) {
      errorNotify(error?.response?.data?.errors?.current_password[0]);
      return;
    }
    if (errorsName.includes("new_password")) {
      errorNotify(error?.response?.data?.errors?.new_password[0]);
      return;
    }
    if (errorsName.includes("date_of_birth")) {
      errorNotify(error?.response?.data?.errors?.date_of_birth[0]);
      return;
    }
    if (errorsName.includes("account_number")) {
      errorNotify(error?.response?.data?.errors?.account_number[0]);
      return;
    }
    if (errorsName.includes("bvn")) {
      errorNotify(error?.response?.data?.errors?.bvn[0]);
      return;
    }
    if (errorsName.includes("date_of_birth")) {
      errorNotify(error?.response?.data?.errors?.date_of_birth[0]);
      return;
    }
    if (errorsName.includes("identification_exp_date")) {
      errorNotify(error?.response?.data?.errors?.identification_exp_date[0]);
      return;
    }
    if (errorsName.includes("identification_image")) {
      errorNotify(error?.response?.data?.errors?.identification_image[0]);
      return;
    }
    if (errorsName.includes("prefix")) {
      errorNotify(error?.response?.data?.errors?.prefix[0]);
      return;
    }
    if (errorsName.includes("phone_no")) {
      errorNotify(error?.response?.data?.errors?.phone_no[0]);
      return;
    }
    if (errorsName.includes("description")) {
      errorNotify(error?.response?.data?.errors?.description[0]);
      return;
    }
    if (errorsName.includes("amount")) {
      errorNotify(error?.response?.data?.errors?.amount[0]);
      return;
    }
    if (errorsName.includes("token")) {
      errorNotify(error?.response?.data?.errors?.token[0]);
      return;
    }
    if (errorsName.includes("bank_code")) {
      errorNotify(error?.response?.data?.errors?.bank_code[0]);
      return;
    }
    if (errorsName.includes("bank_id")) {
      errorNotify(error?.response?.data?.errors?.bank_id[0]);
      return;
    }
    if (errorsName.includes("password")) {
      errorNotify(error?.response?.data?.errors?.password[0]);
      return;
    } else {
      errorNotify("Something went wrong, try again");
      return;
    }
  }
};

export const logoutUnauthorizeUser = (code: number) => {
  if (code === 401) {
    localStorage.removeItem("techCheckPoint");
  }
};
