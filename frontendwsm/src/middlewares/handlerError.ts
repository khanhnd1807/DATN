import { ToastError } from "../components/common/toast/Toast";
export class CustomError {
  message: string;

  constructor(message: string) {
    this.message = message;
  }
}

export const errorHandler = (err: CustomError) => {
  err.message = err.message || "";
  return {
    status: "fail",
    message: err.message
  };
};

export const displayError = (error: string) => {
  ToastError(error);
  throw new CustomError(error);
};
