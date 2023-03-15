import db from "../database/models/index";
import dotenv from "dotenv";
import { CustomError } from "../middlewares/errorHandler";
import DepartmentAttributes from "../interfaces/department";
import userServices from "./userServices";
import { Op } from "sequelize";
dotenv.config({ path: ".env" });

const getListDepartment = async (data: DepartmentAttributes) => {
  return await db.Department.findAll({
    where: { status: 1 },
  });
};

const addDepartment = async (data: DepartmentAttributes) => {
  const department = await db.Department.findOne({
    where: {
      [Op.or]: [{ name: data.name }, { sign: data.sign }],
      status: 1,
    },
  });

  if (department) {
    throw new CustomError(405, "This name or sign is exist");
  }
  const admin = await userServices.getAdmin();
  if (!admin) {
    throw new CustomError(404, "can not set leader for this department");
  }
  await db.Department.create({
    lead: admin.user_id,
    name: data.name,
    sign: data.sign,
  });
  return await db.Department.findOne({
    where: { name: data.name },
  });
};

const updateDepartment = async (
  department_id: bigint,
  data: DepartmentAttributes
) => {
  const existDepartment = await db.Department.findOne({
    where: {
      status: 1,
      [Op.or]: [{ name: data.name }, { sign: data.sign }],
      department_id: { [Op.ne]: department_id },
    },
  });
  if (existDepartment) {
    throw new CustomError(405, "This name or sign is exist.");
  }

  //update department
  const department = await db.Department.findOne({
    where: { department_id: department_id },
  });
  if (!department) {
    throw new CustomError(404, "not found this department");
  }

  //update leader
  const admin = await userServices.getAdmin();
  if (admin.user_id != data.lead) {
    const user = await userServices.getMemberIndepartment(
      data.lead,
      department_id
    );
    if (!user) {
      throw new CustomError(404, "not found this member in department");
    }
    await userServices.updateLeader(data.lead, department_id);
  }

  await db.Department.update(
    {
      lead: data.lead,
      name: data.name,
      sign: data.sign,
    },
    {
      where: { department_id: department_id },
    }
  );
  return await db.Department.findOne({
    where: { department_id: department_id },
  });
};

const deleteDepartment = async (department_id: bigint) => {
  const users = await db.User.findAll({
    where: { department_id: department_id, status: 1 },
  });
  if (users.length > 0) {
    throw new CustomError(
      405,
      "this department have employees, you cannot delete department when it is not empty"
    );
  }
  const department = await db.Department.findOne({
    where: { department_id: department_id },
  });
  if (!department) {
    throw new CustomError(404, "not found this department");
  }
  await db.Department.update(
    {
      status: 0,
    },
    {
      where: { department_id: department_id },
    }
  );
};

const deleteLeaderInDerpartment = async (department_id: bigint) => {
  const department = await db.Department.findOne({
    where: { department_id: department_id },
  });
  const admin = await userServices.getAdmin();
  if (!department) {
    throw new CustomError(404, "not found this department");
  }
  await db.Department.update(
    {
      lead: admin.user_id,
    },
    {
      where: { department_id: department_id, status: 1 },
    }
  );
};

const getDepartmentById = async (department_id: bigint) => {
  return await db.Department.findOne({
    where: { department_id: department_id },
  });
};

const departmentServices = {
  getListDepartment,
  addDepartment,
  updateDepartment,
  deleteDepartment,
  deleteLeaderInDerpartment,
  getDepartmentById,
};

export default departmentServices;
