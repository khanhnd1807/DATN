import { CustomError } from "./errorHandler";
import { Request, Response } from "express";
import db from "../database/models";
// verifyRole de duyet request va xem thanh vien

const Roles = {
  LEADER: 1,
  ADMIN: 2,
  MEMBER: 0,
};

export const verifyRole = async (
  req: Request,
  res: Response,
  next: Function
) => {
  const user = await db.User.findOne({
    where: { user_id: req.user.user_id },
  });
  if (!user) {
    throw new CustomError(404, "not found this employee");
  }
  if (user.role_position > Roles.MEMBER) {
    next();
  } else {
    throw new CustomError(403, "you dont have permission");
  }
};

export const verifyLeaderDepartment = async (
  req: Request,
  res: Response,
  next: Function
) => {
  const user = await db.User.findOne({
    where: { user_id: req.user.user_id },
  });
  if (!user) {
    throw new CustomError(404, "not found this employee");
  }
  if (user.role_position == Roles.LEADER) {
    next();
  } else {
    throw new CustomError(403, "you dont have permission");
  }
};

export const verifyRoleAdmin = async (
  req: Request,
  res: Response,
  next: Function
) => {
  const user = await db.User.findOne({
    where: { user_id: req.user.user_id },
  });
  if (!user) {
    throw new CustomError(404, "not found this employee");
  }
  if (user.role_position == Roles.ADMIN) {
    next();
  } else {
    throw new CustomError(403, "you dont have permission");
  }
};

export const verifyToAcceptRequest = async (
  req: Request,
  res: Response,
  next: Function
) => {
  const user = await db.User.findOne({
    where: { user_id: req.user.user_id },
  });
  if (!user) {
    throw new CustomError(404, "not found this employee");
  }
  if (user.role_position > Roles.MEMBER) {
    next();
  } else {
    throw new CustomError(403, "you dont have permission");
  }
};
