import db from "../database/models/index";
import bcrypt from "bcryptjs";
const salt = bcrypt.genSaltSync(10);
import { CustomError } from "../middlewares/errorHandler";
import UserAttributes from "../interfaces/user";
import createUserToken from "./createToken";
import { Op } from "sequelize";
import departmentServices from "./departmentServices";

const hashUserPasswork = async (password: string) => {
  return bcrypt.hashSync(password, salt);
};

const Login = async (data: UserAttributes) => {
  let user = await db.User.findOne({
    where: {
      email: data.email,
      status: 1,
    },
  });
  if (!user) {
    throw new CustomError(404, "Not found this account");
  }

  if (!(await bcrypt.compare(data.password, user.password))) {
    throw new CustomError(401, "password is incorrect.");
  }
  const token = createUserToken.createToken(user);
  const refreshtoken = createUserToken.crateRefreshtoken(user);
  const { password, status, ...infoUser } = user.dataValues;
  return {
    jwtToken: { token: token, refreshtoken: refreshtoken },
    infoUser,
  };
};

const logout = () => {
  return "you are loging out !";
};

const getInfoUser = async (data: UserAttributes) => {
  return await db.User.findOne({
    where: { user_id: data.user_id, status: 1 },
    include: { model: db.Department },
    attributes: {
      exclude: ["password", "status"],
    },
  });
};

const getAdmin = async () => {
  return await db.User.findOne({
    where: { role_position: 2, status: 1 },
    attributes: {
      exclude: ["password", "status"],
    },
  });
};

const getLeadDepartment = async (data: number) => {
  return await db.User.findOne({
    where: { user_id: data, status: 1 },
    attributes: {
      exclude: ["password", "status"],
    },
  });
};

const SignUp = async (data: UserAttributes) => {
  const user = await db.User.findOne({
    where: { email: data.email, status: 1 },
  });
  if (user) {
    throw new CustomError(409, "this account exist");
  }
  const department = await departmentServices.getDepartmentById(
    data.department_id
  );
  if (!department) {
    throw new CustomError(404, "not found department");
  }
  const hashPassWordFromBcrypt = await hashUserPasswork(data.password);
  await db.User.create({
    email: data.email,
    firstname: data.firstname,
    lastname: data.lastname,
    avatar: data.avatar || "",
    gender: data.gender || true,
    birthday: data.birthday,
    phone_number: data.phone_number,
    address: data.address,
    password: hashPassWordFromBcrypt,
    becoming_offcial_employee: data.becoming_offcial_employee || null,
    join_company: data.join_company,
    holidays: data.holidays || 0,
    department_id: data.department_id,
    role_position: data.role_position || 0,
  });
  return await db.User.findOne({
    where: { email: data.email },
    attributes: {
      exclude: ["password", "status"],
    },
  });
};

const updateInfoUser = async (data: UserAttributes, user_id: bigint) => {
  const user = await db.User.findOne({
    where: { user_id: user_id, status: 1 },
  });
  if (!user) {
    throw new CustomError(404, "not found this account");
  }
  // uploadService.deleteImage(user.avatar);
  await db.User.update(
    {
      firstname: data.firstname,
      lastname: data.lastname,
      avatar: data.avatar,
      gender: data.gender,
      birthday: data.birthday,
      phone_number: data.phone_number,
      address: data.address,
    },
    {
      where: { user_id: user_id },
    }
  );
  return await db.User.findOne({
    where: { user_id: user_id, status: 1 },
    include: { model: db.Department },
    attributes: {
      exclude: ["password", "status"],
    },
  });
};

const deleteUser = async (userId: bigint) => {
  const user = await db.User.findOne({
    where: { user_id: userId, status: 1 },
  });
  if (!user) {
    throw new CustomError(404, "not found this account");
  }
  if (user.role_position > 0) {
    throw new CustomError(
      403,
      " this employee is lead or admin, you can not delete lead or admin."
    );
  }
  await db.User.update(
    {
      status: 0,
    },
    {
      where: { user_id: userId },
    }
  );
};

const getAllUsers = async () => {
  return await db.User.findAll({
    where: { status: 1 },
    include: { model: db.Department },
    attributes: {
      exclude: ["password", "status"],
    },
  });
};

const getAllUsersInDepartment = async (department_id: bigint) => {
  return await db.User.findAll({
    where: { status: 1, department_id: department_id },
    attributes: {
      exclude: ["password", "status"],
    },
  });
};

const getMemberIndepartment = async (
  user_id: bigint,
  department_id: bigint
) => {
  return await db.User.findOne({
    where: { status: 1, department_id: department_id, user_id: user_id },
    attributes: {
      exclude: ["password", "status"],
    },
  });
};

const updateInfoMember = async (data: UserAttributes, member_id: bigint) => {
  const user = await db.User.findOne({
    where: { user_id: member_id, status: 1 },
  });
  if (!user) {
    throw new CustomError(404, "not found this account");
  }
  //neu nguoi do la leader ma bi chuyen sang phong khac thi ben department phai xoa di id cua nguoi do o truong lead tai department cu va thay bang id cua admin
  const deparment = await departmentServices.getDepartmentById(
    data.department_id
  );
  if (!deparment) {
    throw new CustomError(404, "not found department");
  }
  if (user.department_id != data.department_id && user.role_position === 1) {
    departmentServices.deleteLeaderInDerpartment(user.department_id);
  }
  await db.User.update(
    {
      firstname: data.firstname,
      lastname: data.lastname,
      avatar: data.avatar,
      gender: data.gender,
      birthday: data.birthday,
      phone_number: data.phone_number,
      address: data.address,
      becoming_offcial_employee: data.becoming_offcial_employee || null,
      join_company: data.join_company,
      department_id: data.department_id,
      holidays: data.holidays,
      role_position: data.role_position || 0,
    },
    {
      where: { user_id: member_id },
    }
  );
  return await db.User.findOne({
    where: { user_id: member_id, status: 1 },
    include: { model: db.Department },
    attributes: {
      exclude: ["password", "status"],
    },
  });
};

const updateLeader = async (user_id: bigint, department_id: bigint) => {
  await db.User.update(
    {
      status: 1,
      role_position: 0,
    },

    {
      where: {
        department_id: department_id,
        user_id: {
          [Op.ne]: user_id,
        },
        status: 1,
        role_position: {
          [Op.ne]: 2,
        },
      },
    }
  );
  const user = await db.User.findOne({
    where: {
      user_id: user_id,
      status: 1,
      department_id: department_id,
    },
  });

  if (!user && Number(user_id) > 0) {
    throw new CustomError(404, "not found this user");
  }

  await db.User.update(
    {
      role_position: 1,
    },
    {
      where: {
        user_id: user_id,
        status: 1,
        department_id: department_id,
        role_position: 0,
      },
    }
  );
};

const getInfoMember = async (user_id: bigint) => {
  return db.User.findOne({
    where: { user_id: user_id, status: 1 },
    include: { model: db.Department },
    attributes: {
      exclude: ["password", "status"],
    },
  });
};

const userServices = {
  Login,
  SignUp,
  getInfoUser,
  updateInfoUser,
  deleteUser,
  getAllUsers,
  getAllUsersInDepartment,
  getMemberIndepartment,
  getAdmin,
  getLeadDepartment,
  logout,
  updateInfoMember,
  updateLeader,
  getInfoMember,
};

export default userServices;
