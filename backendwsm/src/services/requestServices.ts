import db from "../database/models/index";
import { CustomError } from "../middlewares/errorHandler";
import RequestAttributes from "../interfaces/request";
import { Model, Op, where } from "sequelize";
import UserAttributes from "../interfaces/user";

const addRequest = async (
  data: RequestAttributes,
  user_id: bigint,
  email: string
) => {
  await db.Request.create({
    user_id: user_id,
    created_at: new Date(),
    detail: data.detail,
    phone_number: data.phone_number,
    email_user: email,
    time_start: data.time_start,
    time_end: data.time_end,
    description: data.description,
  });
};

const editRequest = async (
  data: RequestAttributes,
  request_id: bigint,
  user_id: bigint,
  email: string
) => {
  const request = await db.Request.findOne({
    where: { status: 0, user_id: user_id, email_user: email, status_exist: 1 },
  });
  if (!request) {
    throw new CustomError(404, "not found request");
  }
  await db.Request.update(
    {
      detail: data.detail,
      time_start: data.time_start,
      time_end: data.time_end,
      email_user: email,
      description: data.description,
      phone_number: data.phone_number,
    },
    {
      where: {
        request_id: request_id,
        user_id: user_id,
      },
    }
  );
  return db.Request.findOne({
    where: { request_id: request_id, user_id: user_id },
  });
};

const getAllRequestOneUser = async (user_id: bigint) => {
  return await db.Request.findAll({
    where: { user_id: user_id, status_exist: 1 },
  });
};

const getAllRequest = async () => {
  return await db.Request.findAll({
    where: { status_exist: 1, status: 0 },
  });
};

const getRequest = async (request_id: bigint) => {
  return await db.Request.findOne({
    where: { status_exist: 1, request_id: request_id },
  });
};

const getAllRequestinDepartment = async (user: UserAttributes) => {
  return await db.Request.findAll({
    include: [
      {
        model: db.User,
        where: {
          department_id: BigInt(user.department_id),
          role_position: { [Op.lt]: user.role_position },
        },
      },
    ],
    where: { status: 0, status_exist: 1 },
  });
};

const getRequestsProcessed = async (
  status: number,
  email: string,
  role_position: number
) => {
  if (role_position === 1) {
    return db.Request.findAll({
      where: { status: status, status_exist: 1, email_leader: email },
    });
  } else {
    return db.Request.findAll({
      where: { status: status, status_exist: 1 },
    });
  }
};

const acceptRequest = async (request_id: bigint, email: string) => {
  {
    const request = await db.Request.findOne({
      where: { request_id: request_id, status: 0 },
    });
    if (!request) {
      throw new CustomError(
        404,
        "not found this request or this request has been processed"
      );
    }

    await db.Request.update(
      {
        status: 1,
        email_leader: email,
      },
      {
        where: { request_id: request_id },
      }
    );

    return await db.Request.findOne({
      where: {
        request_id: request_id,
      },
    });
  }
};

const rejectRequest = async (request_id: bigint, email: string) => {
  const request = await db.Request.findOne({
    where: { request_id: request_id, status: 0 },
  });

  if (!request) {
    throw new CustomError(
      404,
      "not found this request or this request has been processed"
    );
  }

  await db.Request.update(
    {
      status: 2,
      email_leader: email,
    },
    {
      where: { request_id: request_id },
    }
  );
  return await db.Request.findOne({
    where: { request_id: request_id },
  });
};

// xoa request
const deleteRequest = async (request_id: number) => {
  const request = await db.Request.findOne({
    where: { request_id: request_id },
  });

  if (!request) {
    throw new CustomError(404, "not found this request");
  }

  await db.Request.update(
    {
      status_exist: 0,
    },
    {
      where: { request_id: request_id },
    }
  );
};

const requestServices = {
  addRequest,
  editRequest,
  getAllRequestOneUser,
  getAllRequestinDepartment,
  getAllRequest,
  acceptRequest,
  rejectRequest,
  deleteRequest,
  getRequest,
  getRequestsProcessed,
};
export default requestServices;
