import db from "../database/models/index";
import { CustomError } from "../middlewares/errorHandler";
import TimekeepingAttributes from "../interfaces/timeKeeping";
import UserAttributes from "../interfaces/user";
import "express-async-errors";
import moment from "moment";
import { Op } from "sequelize";

const checkIn = async (user_id: bigint) => {
  const checkIn = new Date();
  if (new Date().getDay() == 0 || new Date().getDay() == 6) {
    throw new CustomError(401, "can not check in on weekend");
  }
  const createAt = moment(new Date()).format("YYYY-MM-DD");
  const timeKeeping = await db.Timekeeping.findOne({
    where: { create_at: createAt, user_id: user_id },
  });
  if (timeKeeping) {
    throw new CustomError(304, "you are checked in");
  }
  await db.Timekeeping.create({
    user_id: user_id,
    create_at: createAt,
    check_in: checkIn,
    check_out: null,
  });
  return await db.Timekeeping.findOne({
    where: { create_at: createAt, user_id: user_id },
  });
};

const checkOut = async (user_id: bigint) => {
  const checkout = new Date();
  const createAt = moment(new Date()).format("YYYY-MM-DD");
  const timeKeeping = await db.Timekeeping.findOne({
    where: {
      create_at: createAt,
      user_id: user_id,
      check_out: null,
    },
  });

  if (!timeKeeping) {
    throw new CustomError(404, "not found this time keeping.");
  }

  await db.Timekeeping.update(
    {
      check_out: checkout,
    },
    { where: { create_at: createAt, user_id: user_id } }
  );

  return await db.Timekeeping.findOne({
    where: { create_at: createAt, user_id: user_id },
  });
};

const getAllTimeKeeping = async (user_id: bigint) => {
  return await db.Timekeeping.findAll({
    where: { user_id: user_id },
  });
};

const getTimeKeeping = async (user_id: bigint) => {
  return await db.Timekeeping.findOne({
    where: {
      user_id: user_id,
      create_at: moment(new Date()).format("YYYY-MM-DD"),
    },
  });
};
const timeKeepingServices = {
  checkIn,
  checkOut,
  getAllTimeKeeping,
  getTimeKeeping,
};
export default timeKeepingServices;
