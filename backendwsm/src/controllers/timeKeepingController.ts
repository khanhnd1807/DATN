import timeKeepingServices from "../services/timeKeepingServices";
import { CustomError } from "../middlewares/errorHandler";
import { Response, Request } from "express";

const checkIn = async (req: Request, res: Response, next: Function) => {
  const timeKeeping = await timeKeepingServices.checkIn(req.user.user_id);
  if (!timeKeeping) {
    throw new CustomError(409, "not found this time keeping");
  }
  res.status(200).send("checkin successfully");
};

const check_out = async (req: Request, res: Response, next: Function) => {
  const timeKeeping = await timeKeepingServices.checkOut(req.user.user_id);
  if (!timeKeeping) {
    throw new CustomError(404, "not found this time keeping");
  }
  res.status(200).send("checkout successfully");
};

const getAllTimeKeeping = async (
  req: Request,
  res: Response,
  next: Function
) => {
  const timeKeepings = await timeKeepingServices.getAllTimeKeeping(
    req.user.user_id
  );
  if (!timeKeepings) {
    throw new CustomError(404, "not found this time keeping");
  }
  res.status(200).send(timeKeepings);
};

const getTimeKeeping = async (req: Request, res: Response, next: Function) => {
  const timeKeeping = await timeKeepingServices.getTimeKeeping(
    req.user.user_id
  );

  if (!timeKeeping) {
    res.status(200).send("0");
  } else {
    if (timeKeeping.check_out === null) {
      res.status(200).send("1");
    } else if (
      timeKeeping.check_out !== null &&
      timeKeeping.check_in !== null
    ) {
      res.status(200).send("2");
    }
  }
};

const timeKeepingController = {
  checkIn,
  check_out,
  getAllTimeKeeping,
  getTimeKeeping,
};

export default timeKeepingController;
