import { toast } from "react-toastify";

export const successNotify = (msg: string) => {
  toast.success(msg);
};

export const errorNotify = (msg: string) => {
  toast.error(msg);
};
