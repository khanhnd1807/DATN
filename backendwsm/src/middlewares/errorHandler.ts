import { logger } from "../logs/createLog";
import { Response, Request } from "express";
export class CustomError {
  statusCode: number;
  message: string;

  constructor(statusCode: number, message: string) {
    this.statusCode = statusCode;
    this.message = message;
  }
}

export const errorHandler = (
  err: CustomError,
  req: Request,
  res: Response,
  next: Function
) => {
  err.statusCode = err.statusCode || 400;
  err.message = err.message || "";
  logger.error(err.statusCode + " - " + err.message);
  res.status(err.statusCode).json({
    code: err.statusCode,
    status: "fail",
    message: err.message,
  });
};
