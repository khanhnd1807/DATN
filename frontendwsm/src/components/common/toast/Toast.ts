import { toast } from "react-toastify";

export const ToastError = (message: string) => {
  return toast.error(message);
};
export const ToastSuccess = (message: string) => {
  return toast.success(message);
};
